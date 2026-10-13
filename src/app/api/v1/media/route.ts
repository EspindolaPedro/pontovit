import { NextResponse } from "next/server";
import { requireApiKey } from "@/server/auth/api-key";
import { errorResponse, AppError } from "@/server/http/errors";
import { saveMedia } from "@/server/modules/media/media.service";
import { sanitizePlainText } from "@/server/security/sanitize";

// Leave a small margin for multipart headers in addition to the 5 MB image.
const maxRequestBytes = 6 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const apiKey = await requireApiKey(request, "media:write");
    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
      throw new AppError("O envio deve ter no máximo 6 MB.", 413, "PAYLOAD_TOO_LARGE");
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      throw new AppError("Envie a imagem no campo file.", 422, "VALIDATION_ERROR");
    }

    const media = await saveMedia(
      file,
      sanitizePlainText(form.get("altText"), 180),
      apiKey.createdById,
    );
    const url = new URL(`/api/media/${media.id}`, request.url).toString();

    return NextResponse.json({ data: media, url }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
