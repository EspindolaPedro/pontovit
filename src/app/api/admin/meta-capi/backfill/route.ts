import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { previewMetaCapiBackfill, runMetaCapiBackfill } from "@/server/modules/meta-capi/meta-capi.service";

// GET: pré-visualização (contagem e campanhas), sem disparar nada.
export async function GET() {
  try {
    await requireRole("ADMIN");
    const preview = await previewMetaCapiBackfill();
    return NextResponse.json(preview);
  } catch (error) {
    return errorResponse(error);
  }
}

// POST: envia de fato os eventos "Lead" para a Meta. Exige confirm:true no corpo —
// isso afeta métricas reais da conta de anúncios e não há como desfazer o envio.
export async function POST(request: Request) {
  try {
    await requireRole("ADMIN");
    const body = await request.json().catch(() => ({}));
    if (body?.confirm !== true) {
      return NextResponse.json({ message: "Confirme o envio com { confirm: true } no corpo da requisição." }, { status: 400 });
    }
    const result = await runMetaCapiBackfill(typeof body?.testEventCode === "string" ? body.testEventCode : undefined);
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}
