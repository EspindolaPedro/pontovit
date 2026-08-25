import { NextResponse } from "next/server";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { errorResponse } from "@/server/http/errors";
import { assertPublicFormAllowed, registerPublicFormAttempt } from "@/server/security/rate-limit";
import { ContactSchema } from "@/server/validation/common";
import { getPublicSettings } from "@/server/modules/settings/settings.service";

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (request.headers.get("x-real-ip") || forwarded || "unknown").slice(0, 100);
}

export async function POST(request: Request) {
  try {
    const clientKey = `contact:${getClientKey(request)}`;
    await assertPublicFormAllowed(clientKey);
    await registerPublicFormAttempt(clientKey);
    const body = ContactSchema.parse(await request.json());

    if (body.website) return NextResponse.json({ ok: true });

    const message = [
      "*Novo contato pelo site PontoVit*",
      "",
      "*Dados do contato*",
      `*Nome:* ${body.name}`,
      `*Empresa:* ${body.company || "Não informado"}`,
      `*E-mail:* ${body.email}`,
      `*Telefone:* ${body.phone || "Não informado"}`,
      "",
      `*Interesse:* ${body.subject}`,
      `*Mensagem:* ${body.message || "Não informado"}`,
    ].join("\n");

    const settings = await getPublicSettings();
    const baseTarget = settings.cta?.target || getWhatsAppUrl().split("?")[0];
    const redirectUrl = `${baseTarget}${baseTarget.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;
    return NextResponse.json({ ok: true, redirectUrl });
  } catch (error) {
    return errorResponse(error);
  }
}
