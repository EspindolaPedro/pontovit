import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { getAdminPost, softDeletePost, updatePost } from "@/server/modules/posts/post.service";
import { PostUpsertSchema } from "@/server/validation/common";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    await requireRole("AUTHOR");
    const { id } = await context.params;
    const post = await getAdminPost(id);
    if (!post) return NextResponse.json({ error: "NOT_FOUND", message: "Post não encontrado." }, { status: 404 });
    return NextResponse.json({ data: post });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const user = await requireRole("AUTHOR");
    const { id } = await context.params;
    const input = PostUpsertSchema.parse(await request.json());
    const post = await updatePost(id, input, user.id);
    return NextResponse.json({ data: post });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireRole("EDITOR");
    const { id } = await context.params;
    await softDeletePost(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
