import "dotenv/config";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const mediaRoot = path.resolve(process.env.MEDIA_STORAGE_PATH ?? "./storage/media");

function publicSource(storageKey: string) {
  const brand = storageKey.match(/^brand-(client|partner)-(.+)$/);
  if (brand) {
    const folder = brand[1] === "partner" ? "parceiros-novos" : "clientes";
    return path.resolve(process.cwd(), "public", "assets", folder, path.basename(brand[2]));
  }

  const legacy = storageKey.match(/^legacy-(.+)$/);
  if (legacy) return path.resolve(process.cwd(), "public", "assets", "blog", path.basename(legacy[1]));
  return null;
}

async function main() {
  const media = await prisma.media.findMany({ select: { storageKey: true } });
  await mkdir(mediaRoot, { recursive: true });

  let restored = 0;
  for (const item of media) {
    const source = publicSource(item.storageKey);
    if (!source) continue;
    try {
      await copyFile(source, path.join(mediaRoot, item.storageKey));
      restored += 1;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }

  console.log(`${restored} arquivos de mÃ­dia pÃºblica restaurados.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
