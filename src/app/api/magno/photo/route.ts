import { NextResponse } from "next/server";
import { errorResponse } from "@/server/http/errors";
import { getMagnoPhoto } from "@/server/modules/magno/magno.service";

export async function GET() {
  try {
    const photo = await getMagnoPhoto();
    if (!photo) return NextResponse.json({ error: "NOT_FOUND", message: "Foto não encontrada." }, { status: 404 });
    return new NextResponse(photo.data, {
      headers: {
        "Content-Type": photo.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
