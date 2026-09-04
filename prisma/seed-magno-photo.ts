import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

// Só semeia se ainda não houver foto salva no banco — não deve sobrescrever um
// upload feito pelo admin via /admin/magno em um deploy anterior.
async function main() {
  const existing = await prisma.magnoCardSettings.findUnique({ where: { id: "main" } });
  if (existing?.photoData) {
    console.log("Foto do Magno já está salva no banco — nada a fazer.");
    return;
  }

  const sourcePath = path.resolve(process.cwd(), "public", "assets", "people", "magno-bais.jpg");
  let buffer: Buffer;
  try {
    buffer = await readFile(sourcePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("Nenhuma foto padrão encontrada em public/assets/people/magno-bais.jpg — nada a semear.");
      return;
    }
    throw error;
  }

  const photoData = Uint8Array.from(buffer);
  await prisma.magnoCardSettings.upsert({
    where: { id: "main" },
    create: { id: "main", photoData, photoMimeType: "image/jpeg", focalPointX: 50, focalPointY: 28 },
    update: { photoData, photoMimeType: "image/jpeg", focalPointX: 50, focalPointY: 28 },
  });
  console.log("Foto padrão do Magno semeada no banco.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
