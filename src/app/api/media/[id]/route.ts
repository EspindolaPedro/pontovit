import { NextResponse } from "next/server";
import { errorResponse } from "@/server/http/errors";
import { getMediaFile } from "@/server/modules/media/media.service";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const { media, contents } = await getMediaFile(id);
    return new NextResponse(contents, {
      headers: {
        "Content-Type": media.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
