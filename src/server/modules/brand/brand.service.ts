import { LogoGroup } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { BrandLogoSchema } from "../../validation/common";

export type BrandLogoInput = ReturnType<typeof BrandLogoSchema.parse>;

export function listBrandLogos(group?: LogoGroup) {
  return prisma.brandLogo.findMany({ where: { isVisible: true, ...(group ? { group } : {}) }, orderBy: { sortOrder: "asc" }, include: { media: true } });
}

export function listAdminBrandLogos() {
  return prisma.brandLogo.findMany({ orderBy: [{ group: "asc" }, { sortOrder: "asc" }], include: { media: true } });
}

export async function createBrandLogo(input: BrandLogoInput, userId: string) {
  const media = await prisma.media.findUnique({ where: { id: input.mediaId } });
  if (!media) throw new AppError("A mídia informada não existe.", 422, "MEDIA_NOT_FOUND");
  return prisma.brandLogo.create({ data: { ...input, createdById: userId } });
}

export async function updateBrandLogo(id: string, input: BrandLogoInput, userId: string) {
  const logo = await prisma.brandLogo.findUnique({ where: { id } });
  if (!logo) throw new AppError("Logo não encontrada.", 404, "NOT_FOUND");
  return prisma.brandLogo.update({ where: { id }, data: { ...input, updatedById: userId } });
}

export async function deleteBrandLogo(id: string) {
  const result = await prisma.brandLogo.deleteMany({ where: { id } });
  if (!result.count) throw new AppError("Logo não encontrada.", 404, "NOT_FOUND");
}
