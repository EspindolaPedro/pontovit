import { NextResponse } from "next/server";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { errorResponse } from "@/server/http/errors";
import { createWorkScheduleLead } from "@/server/modules/work-schedule-leads/work-schedule-lead.service";
import { getPublicSettings } from "@/server/modules/settings/settings.service";
import { assertPublicFormAllowed, registerPublicFormAttempt } from "@/server/security/rate-limit";
import { WorkScheduleLeadSchema } from "@/server/validation/common";

const WHATSAPP_MESSAGE = "Gostaria de automatizar a minha escala para a 5x2";

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (request.headers.get("x-real-ip") || forwarded || "unknown").slice(0, 100);
}

export async function POST(request: Request) {
  try {
    const clientKey = `work-schedule-lead:${getClientKey(request)}`;
    await assertPublicFormAllowed(clientKey);
    await registerPublicFormAttempt(clientKey);
    const body = WorkScheduleLeadSchema.parse(await request.json());
    const settings = await getPublicSettings();
    const baseTarget = (settings.cta?.target || getWhatsAppUrl()).split("?")[0];
    const redirectUrl = `${baseTarget}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    if (body.website) return NextResponse.json({ ok: true, redirectUrl });

    const lead = await createWorkScheduleLead(body, request.headers.get("user-agent") || undefined);
    return NextResponse.json({ ok: true, id: lead.id, redirectUrl }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
