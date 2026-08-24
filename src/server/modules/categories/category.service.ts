import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { CategorySchema } from "../../validation/common";

export type CategoryInput = ReturnType<typeof CategorySchema.parse>;

export function listCategories() {
  return prisma.category.findMany({ orderBy: [{ name: "asc" }] });
}

export async function createCategory(input: CategoryInput) {
  const exists = await prisma.category.findUnique({ where: { slug: input.slug } });
  if (exists) throw new AppError("Já existe uma categoria com este slug.", 409, "SLUG_ALREADY_EXISTS");
  return prisma.category.create({ data: input });
}

export async function updateCategory(id: string, input: CategoryInput) {
  const exists = await prisma.category.findFirst({ where: { id } });
  if (!exists) throw new AppError("Categoria não encontrada.", 404, "NOT_FOUND");
  const slugOwner = await prisma.category.findFirst({ where: { slug: input.slug, NOT: { id } } });
  if (slugOwner) throw new AppError("Já existe uma categoria com este slug.", 409, "SLUG_ALREADY_EXISTS");
  return prisma.category.update({ where: { id }, data: input });
}

export async function deleteCategory(id: string) {
  const posts = await prisma.postCategory.count({ where: { categoryId: id } });
  if (posts) throw new AppError("Remova a categoria dos posts antes de excluí-la.", 409, "CATEGORY_IN_USE");
  await prisma.category.delete({ where: { id } });
}
