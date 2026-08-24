import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { createPost, listAdminPosts } from "@/server/modules/posts/post.service";
import { PostUpsertSchema } from "@/server/validation/common";

function int(value: string | null, fallback: number, max: number) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? Math.min(number, max) : fallback;
}

export async function GET(request: Request) {
  try {
    await requireRole("AUTHOR");
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const result = await listAdminPosts({
      page: int(url.searchParams.get("page"), 1, 100000),
      pageSize: int(url.searchParams.get("pageSize"), 20, 100),
      query: url.searchParams.get("q")?.trim().slice(0, 120) || undefined,
      status: status === "DRAFT" || status === "PUBLISHED" || status === "ARCHIVED" ? status : undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole("AUTHOR");
    const input = PostUpsertSchema.parse(await request.json());
    const post = await createPost(input, user.id);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
