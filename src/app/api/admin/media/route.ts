import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { listMedia, saveMedia } from "@/server/modules/media/media.service";
import { sanitizePlainText } from "@/server/security/sanitize";

export async function GET() {
  try {
    await requireRole("AUTHOR");
    return NextResponse.json({ data: await listMedia(1, 100) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole("AUTHOR");
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "VALIDATION_ERROR", message: "Envie um arquivo." }, { status: 422 });
    const media = await saveMedia(file, sanitizePlainText(form.get("altText"), 180), user.id);
    return NextResponse.json({ data: media, url: `/api/media/${media.id}` }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
