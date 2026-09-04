import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { MagnoFocalPointSchema } from "../../validation/common";

const allowedTypes = new Map([
  ["image/jpeg", true],
  ["image/png", true],
  ["image/webp", true],
]);
const maxBytes = 8 * 1024 * 1024;

export async function getMagnoPhoto() {
  const settings = await prisma.magnoCardSettings.findUnique({ where: { id: "main" } });
  if (!settings?.photoData || !settings.photoMimeType) return null;
  return {
    data: settings.photoData,
    mimeType: settings.photoMimeType,
    focalPointX: settings.focalPointX,
    focalPointY: settings.focalPointY,
    updatedAt: settings.updatedAt,
  };
}

export async function saveMagnoPhoto(file: File, focalPointX: number, focalPointY: number) {
  if (!allowedTypes.has(file.type)) throw new AppError("Formato de imagem não permitido. Use JPG, PNG ou WebP.", 422, "UNSUPPORTED_MEDIA_TYPE");
  if (file.size <= 0 || file.size > maxBytes) throw new AppError("A imagem deve ter no máximo 8 MB.", 422, "MEDIA_TOO_LARGE");
  const { focalPointX: x, focalPointY: y } = MagnoFocalPointSchema.parse({ focalPointX, focalPointY });

  const buffer = Buffer.from(await file.arrayBuffer());
  const settings = await prisma.magnoCardSettings.upsert({
    where: { id: "main" },
    create: { id: "main", photoData: buffer, photoMimeType: file.type, focalPointX: x, focalPointY: y },
    update: { photoData: buffer, photoMimeType: file.type, focalPointX: x, focalPointY: y },
  });
  return { focalPointX: settings.focalPointX, focalPointY: settings.focalPointY, updatedAt: settings.updatedAt };
}

export async function updateMagnoFocalPoint(input: unknown) {
  const { focalPointX, focalPointY } = MagnoFocalPointSchema.parse(input);
  const existing = await prisma.magnoCardSettings.findUnique({ where: { id: "main" } });
  if (!existing?.photoData) throw new AppError("Envie uma foto antes de ajustar o enquadramento.", 422, "NO_PHOTO");
  const settings = await prisma.magnoCardSettings.update({ where: { id: "main" }, data: { focalPointX, focalPointY } });
  return { focalPointX: settings.focalPointX, focalPointY: settings.focalPointY, updatedAt: settings.updatedAt };
}
