import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "../../db/prisma";
import { AppError } from "../../http/errors";
import { sanitizePlainText } from "../../security/sanitize";
import { MediaUpdateSchema } from "../../validation/common";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);
const maxBytes = 5 * 1024 * 1024;

function mediaRoot() {
  return path.resolve(process.env.MEDIA_STORAGE_PATH ?? "./storage/media");
}

export async function saveMedia(file: File, altText: string, userId: string) {
  const extension = allowedTypes.get(file.type);
  if (!extension) throw new AppError("Formato de imagem não permitido. Use JPG, PNG ou WebP.", 422, "UNSUPPORTED_MEDIA_TYPE");
  if (file.size <= 0 || file.size > maxBytes) throw new AppError("A imagem deve ter no máximo 5 MB.", 422, "MEDIA_TOO_LARGE");

  const storageKey = `${randomUUID().replaceAll("-", "")}.${extension}`;
  const root = mediaRoot();
  await mkdir(root, { recursive: true });
  await writeFile(path.join(root, storageKey), Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  return prisma.media.create({
    data: {
      filename: sanitizePlainText(file.name, 180) || storageKey,
      storageKey,
      mimeType: file.type,
      byteSize: file.size,
      altText: sanitizePlainText(altText, 180) || "Imagem PontoVit",
      createdById: userId,
    },
  });
}

export function listMedia(page: number, pageSize: number) {
  return prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: { brandLogos: { select: { id: true, name: true, group: true } } },
  });
}

export async function getMediaFile(id: string) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new AppError("Imagem não encontrada.", 404, "NOT_FOUND");
  const root = mediaRoot();
  const filePath = path.resolve(root, media.storageKey);
  if (!filePath.startsWith(`${root}${path.sep}`)) throw new AppError("Arquivo inválido.", 400, "INVALID_MEDIA_PATH");
  return { media, contents: await readFile(filePath) };
}

export async function updateMedia(id: string, input: unknown) {
  const parsed = MediaUpdateSchema.parse(input);
  return prisma.media.update({ where: { id }, data: parsed });
}
