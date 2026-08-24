import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { updateMedia } from "@/server/modules/media/media.service";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    await requireRole("EDITOR");
    const { id } = await context.params;
    return NextResponse.json({ data: await updateMedia(id, await request.json()) });
  } catch (error) {
    return errorResponse(error);
  }
}
