import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
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

const clientLogoFallbacks: Record<string, string> = {
  "posto-vargem-linda": "Logo Vargem Linda.jpg.jpeg",
  "super-nicolini": "Logo Nicolini.jpeg",
  "master-supermercados": "Logomarca Master Sonda.png",
  "supermercados-pag-poko": "Logo Pag Poko.jpg.jpeg",
  "rede-dom-pedro": "Logo Dom Pedro.png",
  "veratti-supermercados": "Logo Veratti.png",
  "supermercado-gaucho": "Logo Super Gaúcho.png",
  "one-car-wash": "One Car Wash.png",
  "basica-adm-comdominios": "Logo Básica.jpg.jpeg",
  "basica-adm-condominios": "Logo Básica.jpg.jpeg",
};

function normalizedLabel(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function publicMediaFallback(media: { storageKey: string; filename: string; altText: string }) {
  const brand = media.storageKey.match(/^brand-(client|partner)-(.+)$/);
  if (brand) {
    const folder = brand[1] === "partner" ? "parceiros-novos" : "clientes";
    return path.resolve(process.cwd(), "public", "assets", folder, path.basename(brand[2]));
  }

  const legacy = media.storageKey.match(/^legacy-(.+)$/);
  if (legacy) return path.resolve(process.cwd(), "public", "assets", "blog", path.basename(legacy[1]));

  const clientLogo = clientLogoFallbacks[normalizedLabel(media.altText)]
    ?? clientLogoFallbacks[normalizedLabel(media.filename.replace(/\.[^.]+$/, ""))];
  if (clientLogo) return path.resolve(process.cwd(), "public", "assets", "clientes-novos", clientLogo);
  return null;
}

export async function saveMedia(file: File, altText: string, userId: string) {
  const extension = allowedTypes.get(file.type);
  if (!extension) throw new AppError("Formato de imagem não permitido. Use JPG, PNG ou WebP.", 422, "UNSUPPORTED_MEDIA_TYPE");
  if (file.size <= 0 || file.size > maxBytes) throw new AppError("A imagem deve ter no máximo 5 MB.", 422, "MEDIA_TOO_LARGE");

  const storageKey = `${randomUUID().replaceAll("-", "")}.${extension}`;
  const data = Buffer.from(await file.arrayBuffer());
  return prisma.media.create({
    data: {
      filename: sanitizePlainText(file.name, 180) || storageKey,
      storageKey,
      data,
      mimeType: file.type,
      byteSize: file.size,
      altText: sanitizePlainText(altText, 180) || "Imagem PontoVit",
      createdById: userId,
    },
    select: {
      id: true, filename: true, storageKey: true, mimeType: true, byteSize: true,
      width: true, height: true, altText: true, focalPointX: true, focalPointY: true,
      createdById: true, createdAt: true, updatedAt: true,
    },
  });
}

export function listMedia(page: number, pageSize: number) {
  return prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true, filename: true, storageKey: true, mimeType: true, byteSize: true,
      width: true, height: true, altText: true, focalPointX: true, focalPointY: true,
      createdById: true, createdAt: true, updatedAt: true,
      brandLogos: { select: { id: true, name: true, group: true } },
    },
  });
}

export async function getMediaFile(id: string) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (media?.data) return { media, contents: Buffer.from(media.data) };
  if (!media) throw new AppError("Imagem não encontrada.", 404, "NOT_FOUND");
  const root = mediaRoot();
  const filePath = path.resolve(root, media.storageKey);
  if (!filePath.startsWith(`${root}${path.sep}`)) throw new AppError("Arquivo inválido.", 400, "INVALID_MEDIA_PATH");
  try {
    return { media, contents: await readFile(filePath) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;

    const fallbackPath = publicMediaFallback(media);
    if (fallbackPath) {
      try {
        return { media, contents: await readFile(fallbackPath) };
      } catch (fallbackError) {
        if ((fallbackError as NodeJS.ErrnoException).code !== "ENOENT") throw fallbackError;
      }
    }

    throw new AppError("Arquivo de mídia não encontrado.", 404, "MEDIA_FILE_NOT_FOUND");
  }
}

export async function updateMedia(id: string, input: unknown) {
  const parsed = MediaUpdateSchema.parse(input);
  return prisma.media.update({
    where: { id },
    data: parsed,
    select: {
      id: true, filename: true, storageKey: true, mimeType: true, byteSize: true,
      width: true, height: true, altText: true, focalPointX: true, focalPointY: true,
      createdById: true, createdAt: true, updatedAt: true,
    },
  });
}
