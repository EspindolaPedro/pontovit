import { NextResponse } from "next/server";
import { calculateWorkScheduleImpact, getScaleLabel, getWorkScheduleSegment } from "@/lib/work-schedule-simulation";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { errorResponse } from "@/server/http/errors";
import { createWorkScheduleLead } from "@/server/modules/work-schedule-leads/work-schedule-lead.service";
import { getPublicSettings } from "@/server/modules/settings/settings.service";
import { assertPublicFormAllowed, registerPublicFormAttempt } from "@/server/security/rate-limit";
import { WorkScheduleLeadSchema } from "@/server/validation/common";

// Esse endpoint hoje recebe o lead de qualquer CTA "Falar no Whatsapp" do site, não só
// do simulador da 5x2 — por isso a mensagem padrão é genérica, e só menciona a 5x2
// quando o pedido realmente carrega uma simulação.
const DEFAULT_WHATSAPP_MESSAGE = "Olá! Gostaria de falar com a equipe da PontoVit.";
const SIMULATION_WHATSAPP_MESSAGE = "Gostaria de automatizar a minha escala para a 5x2";

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
    const simulationResult = body.simulation ? calculateWorkScheduleImpact(body.simulation) : null;
    const simulationContext = body.simulation && simulationResult
      ? `\n\nMinha simulação: ${getWorkScheduleSegment(body.simulation).label}, ${body.simulation.employees} colaboradores, ${body.simulation.operatingDays} dias por semana, ${getScaleLabel(body.simulation.currentScale)}, ${body.simulation.weeklyHours}h atuais. Impacto estimado: ${Math.abs(simulationResult.transition.differenceHours).toLocaleString("pt-BR")}h/semana na fase de 42h e ${Math.abs(simulationResult.final.differenceHours).toLocaleString("pt-BR")}h/semana na fase de 40h.`
      : "";
    const baseMessage = body.simulation ? SIMULATION_WHATSAPP_MESSAGE : DEFAULT_WHATSAPP_MESSAGE;
    const redirectUrl = `${baseTarget}?text=${encodeURIComponent(`${baseMessage}${simulationContext}`)}`;

    if (body.website) return NextResponse.json({ ok: true, redirectUrl });

    const lead = await createWorkScheduleLead(body, request.headers.get("user-agent") || undefined);
    return NextResponse.json({ ok: true, id: lead.id, redirectUrl }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
