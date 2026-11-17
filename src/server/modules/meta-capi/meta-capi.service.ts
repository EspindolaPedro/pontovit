import crypto from "crypto";
import { prisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";

const META_GRAPH_VERSION = "v21.0";
// A Conversions API rejeita event_time com mais de 7 dias de atraso em relação ao
// envio — por isso o backfill só alcança leads capturados dentro dessa janela.
const MAX_EVENT_AGE_DAYS = 7;
const META_SOURCE_PATTERNS = ["facebook", "instagram", "meta", "fb", "ig"];

function hashSha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string) {
  return hashSha256(email.trim().toLowerCase());
}

function hashPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  // Os telefones são capturados sem código do país (ex.: "(67) 99999-9999"); a Meta
  // exige o número completo com código do país antes de hashear.
  const withCountryCode = digits.length <= 11 ? `55${digits}` : digits;
  return hashSha256(withCountryCode);
}

function eligibleWhere() {
  const oldestAllowed = new Date(Date.now() - MAX_EVENT_AGE_DAYS * 24 * 60 * 60 * 1000);
  return {
    createdAt: { gte: oldestAllowed },
    OR: META_SOURCE_PATTERNS.map((pattern) => ({ utmSource: { contains: pattern, mode: "insensitive" as const } })),
  };
}

export async function previewMetaCapiBackfill() {
  const leads = await prisma.workScheduleLead.findMany({
    where: eligibleWhere(),
    select: { id: true, createdAt: true, utmSource: true, utmMedium: true, utmCampaign: true, utmContent: true },
    orderBy: { createdAt: "asc" },
  });

  const byCampaign = new Map<string, { utmCampaign: string | null; utmContent: string | null; count: number }>();
  for (const lead of leads) {
    const key = `${lead.utmCampaign ?? ""}::${lead.utmContent ?? ""}`;
    const entry = byCampaign.get(key) ?? { utmCampaign: lead.utmCampaign, utmContent: lead.utmContent, count: 0 };
    entry.count += 1;
    byCampaign.set(key, entry);
  }

  return {
    eligibleCount: leads.length,
    oldestCreatedAt: leads[0]?.createdAt ?? null,
    newestCreatedAt: leads[leads.length - 1]?.createdAt ?? null,
    maxEventAgeDays: MAX_EVENT_AGE_DAYS,
    byCampaign: [...byCampaign.values()],
  };
}

type MetaEvent = {
  event_name: string;
  event_time: number;
  event_id: string;
  action_source: string;
  event_source_url?: string;
  user_data: {
    em: string[];
    ph: string[];
    client_user_agent?: string;
  };
  custom_data: Record<string, string | undefined>;
};

function buildLeadEvent(lead: {
  id: string;
  email: string;
  phone: string;
  createdAt: Date;
  pageUrl: string | null;
  userAgent: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}): MetaEvent {
  return {
    event_name: "Lead",
    event_time: Math.floor(lead.createdAt.getTime() / 1000),
    event_id: `work_schedule_lead_${lead.id}`,
    action_source: "website",
    event_source_url: lead.pageUrl || undefined,
    user_data: {
      em: [hashEmail(lead.email)],
      ph: [hashPhone(lead.phone)],
      client_user_agent: lead.userAgent || undefined,
    },
    custom_data: {
      lead_source: "escala_5x2_simulador",
      utm_source: lead.utmSource || undefined,
      utm_medium: lead.utmMedium || undefined,
      utm_campaign: lead.utmCampaign || undefined,
      utm_content: lead.utmContent || undefined,
      utm_term: lead.utmTerm || undefined,
    },
  };
}

async function postEventsBatch(events: MetaEvent[], testEventCode?: string) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    throw new AppError("META_PIXEL_ID ou META_CAPI_ACCESS_TOKEN não configurados no servidor.", 500, "META_CAPI_NOT_CONFIGURED");
  }

  const body = new URLSearchParams();
  body.set("access_token", accessToken);
  body.set("data", JSON.stringify(events));
  if (testEventCode) body.set("test_event_code", testEventCode);

  const response = await fetch(`https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events`, {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { error?: { message?: string }; events_received?: number };
  if (!response.ok) {
    throw new AppError(result?.error?.message || "Falha ao enviar eventos para a Meta.", 502, "META_CAPI_SEND_FAILED");
  }
  return result;
}

const BATCH_SIZE = 100;

export async function runMetaCapiBackfill(testEventCode?: string) {
  const leads = await prisma.workScheduleLead.findMany({
    where: eligibleWhere(),
    select: {
      id: true, email: true, phone: true, createdAt: true, pageUrl: true, userAgent: true,
      utmSource: true, utmMedium: true, utmCampaign: true, utmContent: true, utmTerm: true,
    },
    orderBy: { createdAt: "asc" },
  });

  if (leads.length === 0) {
    return { sentCount: 0, batches: [] as { count: number; eventsReceived?: number }[] };
  }

  const events = leads.map(buildLeadEvent);
  const batches: { count: number; eventsReceived?: number }[] = [];
  for (let index = 0; index < events.length; index += BATCH_SIZE) {
    const chunk = events.slice(index, index + BATCH_SIZE);
    const result = await postEventsBatch(chunk, testEventCode);
    batches.push({ count: chunk.length, eventsReceived: result.events_received });
  }

  return { sentCount: leads.length, batches };
}
