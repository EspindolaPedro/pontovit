import { NextResponse } from "next/server";
import { requireApiKey } from "@/server/auth/api-key";
import { errorResponse } from "@/server/http/errors";
import { getPublishedPost } from "@/server/modules/posts/site.repository";
import { softDeletePost, updatePost } from "@/server/modules/posts/post.service";
import { PostUpsertSchema } from "@/server/validation/common";
type Context = { params: Promise<{ slug: string }> };
export async function GET(_request: Request, context: Context) { try { const { slug } = await context.params; const post = await getPublishedPost(slug); if (!post) return NextResponse.json({ error: "NOT_FOUND", message: "Post não encontrado." }, { status: 404 }); return NextResponse.json({ data: post }); } catch (error) { return errorResponse(error); } }
export async function PATCH(request: Request, context: Context) { try { const key = await requireApiKey(request, "posts:write"); const { slug } = await context.params; const current = await import("@/server/db/prisma").then(({ prisma }) => prisma.post.findFirst({ where: { slug, deletedAt: null }, select: { id: true } })); if (!current) return NextResponse.json({ error: "NOT_FOUND", message: "Post não encontrado." }, { status: 404 }); return NextResponse.json({ data: await updatePost(current.id, PostUpsertSchema.parse(await request.json()), key.createdById) }); } catch (error) { return errorResponse(error); } }
export async function DELETE(request: Request, context: Context) { try { await requireApiKey(request, "posts:delete"); const { slug } = await context.params; const { prisma } = await import("@/server/db/prisma"); const current = await prisma.post.findFirst({ where: { slug, deletedAt: null }, select: { id: true } }); if (!current) return NextResponse.json({ error: "NOT_FOUND", message: "Post não encontrado." }, { status: 404 }); await softDeletePost(current.id); return NextResponse.json({ ok: true }); } catch (error) { return errorResponse(error); } }
