import "dotenv/config";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const root = path.resolve(process.env.MEDIA_STORAGE_PATH ?? "./storage/media");
const partnerFiles = [
  ["Stelanto", "Logo Stelanto.png"], ["Metadados", "Logo Metadados.png"], ["AMAS MS", "Logo AMAS.png"], ["Abrasel", "Logo Abrasel.png"], ["Vitória Humana", "Logo Vitória Humana 2026.jpeg"],
] as const;
const clientFiles = ["basica-condominios.jpeg", "dom-pedro.jpeg", "laticinios-uniao-do-brasil.jpeg", "master-supermercados.jpeg", "pag-poko.jpeg", "patbo.jpeg", "posto-vargem-linda.jpeg", "santhiago.jpeg", "superdo.jpeg", "supermercado-gaucho.jpeg", "veratti-supermercados.jpeg", "vetcenter.jpeg"];

function mime(file: string) { return file.endsWith(".png") ? "image/png" : file.endsWith(".webp") ? "image/webp" : "image/jpeg"; }
async function importOne(userId: string, group: "CLIENT" | "PARTNER", name: string, source: string, order: number) {
  const sourcePath = path.join(process.cwd(), "public", "assets", group === "PARTNER" ? "parceiros-novos" : "clientes", source);
  const filename = path.basename(sourcePath); const storageKey = `brand-${group.toLowerCase()}-${filename}`;
  const contents = await readFile(sourcePath); await mkdir(root, { recursive: true });
  try { await copyFile(sourcePath, path.join(root, storageKey)); } catch { /* já importado */ }
  const media = await prisma.media.upsert({ where: { storageKey }, update: { altText: `Logo ${name}` }, create: { filename, storageKey, mimeType: mime(filename), byteSize: contents.byteLength, altText: `Logo ${name}`, createdById: userId } });
  await prisma.brandLogo.upsert({ where: { id: `${group.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` }, update: { mediaId: media.id, name, altText: `Logo ${name}`, sortOrder: order, isVisible: true }, create: { id: `${group.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, group, name, altText: `Logo ${name}`, mediaId: media.id, sortOrder: order, createdById: userId } });
}

async function main() {
  const user = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } }); if (!user) throw new Error("Execute pnpm db:seed antes.");
  for (const [index, [name, file]] of partnerFiles.entries()) await importOne(user.id, "PARTNER", name, file, index);
  for (const [index, file] of clientFiles.entries()) await importOne(user.id, "CLIENT", path.basename(file, path.extname(file)), file, index);
  console.log("Logos de parceiros e clientes importadas.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
