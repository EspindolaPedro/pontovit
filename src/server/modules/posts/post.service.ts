import { PostStatus, Prisma } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { sanitizeContentDocument } from "../../security/sanitize";
import { PostUpsertSchema } from "../../validation/common";

export type PostInput = ReturnType<typeof PostUpsertSchema.parse>;

function toPostData(input: PostInput, userId: string): Prisma.PostCreateInput {
  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: sanitizeContentDocument(input.content) as Prisma.InputJsonValue,
    coverMedia: input.coverMediaId ? { connect: { id: input.coverMediaId } } : undefined,
    status: input.status as PostStatus,
    publishedAt: input.status === "PUBLISHED" ? new Date() : null,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    seoCanonical: input.seoCanonical,
    seoNoIndex: input.seoNoIndex,
    author: { connect: { id: userId } },
    categories: {
      create: input.categoryIds.map((categoryId) => ({ category: { connect: { id: categoryId } } })),
    },
  };
}

export async function listPublishedPosts(params: {
  page: number;
  pageSize: number;
  query?: string;
  category?: string;
}) {
  const where: Prisma.PostWhereInput = {
    status: "PUBLISHED",
    deletedAt: null,
    ...(params.query ? {
      OR: [
        { title: { contains: params.query, mode: "insensitive" } },
        { excerpt: { contains: params.query, mode: "insensitive" } },
      ],
    } : {}),
    ...(params.category ? { categories: { some: { category: { slug: params.category } } } } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
      select: {
        id: true, slug: true, title: true, excerpt: true, content: true,
        seoTitle: true, seoDescription: true, publishedAt: true, updatedAt: true,
        coverMedia: { select: { storageKey: true, altText: true, width: true, height: true } },
        categories: { select: { category: { select: { name: true, slug: true } } } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.ceil(total / params.pageSize),
    },
  };
}

export async function createPost(input: PostInput, userId: string) {
  const existing = await prisma.post.findUnique({ where: { slug: input.slug }, select: { id: true } });
  if (existing) throw new AppError("Já existe um post com este slug.", 409, "SLUG_ALREADY_EXISTS");
  return prisma.post.create({ data: toPostData(input, userId) });
}

export async function listAdminPosts(params: { page: number; pageSize: number; query?: string; status?: PostStatus }) {
  const where: Prisma.PostWhereInput = {
    deletedAt: null,
    ...(params.status ? { status: params.status } : {}),
    ...(params.query ? {
      OR: [
        { title: { contains: params.query, mode: "insensitive" } },
        { slug: { contains: params.query, mode: "insensitive" } },
      ],
    } : {}),
  };
  const [items, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
      select: { id: true, slug: true, title: true, status: true, publishedAt: true, updatedAt: true, author: { select: { name: true } } },
    }),
    prisma.post.count({ where }),
  ]);
  return { items, pagination: { page: params.page, pageSize: params.pageSize, total, totalPages: Math.ceil(total / params.pageSize) } };
}

export async function getAdminPost(id: string) {
  return prisma.post.findFirst({
    where: { id, deletedAt: null },
    include: { categories: { select: { categoryId: true } } },
  });
}

export async function updatePost(id: string, input: PostInput, userId: string) {
  const existing = await prisma.post.findFirst({ where: { id, deletedAt: null }, select: { id: true, slug: true, status: true, publishedAt: true } });
  if (!existing) throw new AppError("Post não encontrado.", 404, "NOT_FOUND");
  const slugOwner = await prisma.post.findFirst({ where: { slug: input.slug, NOT: { id } }, select: { id: true } });
  if (slugOwner) throw new AppError("Já existe um post com este slug.", 409, "SLUG_ALREADY_EXISTS");

  const content = sanitizeContentDocument(input.content) as Prisma.InputJsonValue;
  return prisma.$transaction(async (tx) => {
    await tx.postCategory.deleteMany({ where: { postId: id } });
    return tx.post.update({
      where: { id },
      data: {
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content,
        coverMedia: input.coverMediaId ? { connect: { id: input.coverMediaId } } : { disconnect: true },
        status: input.status as PostStatus,
        publishedAt: input.status === "PUBLISHED" ? (existing.status === "PUBLISHED" ? existing.publishedAt : new Date()) : null,
        seoTitle: input.seoTitle,
        seoDescription: input.seoDescription,
        seoCanonical: input.seoCanonical,
        seoNoIndex: input.seoNoIndex,
        updatedBy: { connect: { id: userId } },
        categories: { create: input.categoryIds.map((categoryId) => ({ category: { connect: { id: categoryId } } })) },
      },
    });
  });
}

export async function softDeletePost(id: string) {
  const result = await prisma.post.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: new Date(), status: "ARCHIVED" } });
  if (!result.count) throw new AppError("Post não encontrado.", 404, "NOT_FOUND");
}
