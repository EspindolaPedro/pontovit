import { LogoGroup } from "@prisma/client";
import { prisma } from "../../db/prisma";

export async function getPublicBrandLogos(group: LogoGroup) {
  try {
    return await prisma.brandLogo.findMany({ where: { group, isVisible: true }, orderBy: { sortOrder: "asc" }, include: { media: { select: { id: true, altText: true, storageKey: true, focalPointX: true, focalPointY: true } } } });
  } catch {
    return [];
  }
}
