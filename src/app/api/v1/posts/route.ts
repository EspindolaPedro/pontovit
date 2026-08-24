import { NextResponse } from "next/server";
import { requireApiKey } from "@/server/auth/api-key";
import { errorResponse } from "@/server/http/errors";
import { createPost, listPublishedPosts } from "@/server/modules/posts/post.service";
import { PostUpsertSchema } from "@/server/validation/common";

function positiveInt(value: string | null, fallback: number, max: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const result = await listPublishedPosts({
      page: positiveInt(url.searchParams.get("page"), 1, 100000),
      pageSize: positiveInt(url.searchParams.get("pageSize"), 10, 50),
      query: url.searchParams.get("q")?.trim().slice(0, 120) || undefined,
      category: url.searchParams.get("category")?.trim().slice(0, 120) || undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = await requireApiKey(request, "posts:write");
    const body = await request.json();
    const input = PostUpsertSchema.parse(body);
    const post = await createPost(input, apiKey.createdById);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
