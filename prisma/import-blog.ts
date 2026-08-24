import "dotenv/config";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

type LegacyPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string | null;
  blocks: unknown[];
};

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

function mimeFor(file: string) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function mediaFor(image: string | null, userId: string) {
  if (!image) return null;
  const source = path.join(process.cwd(), "public", image.replace(/^\//, ""));
  const filename = path.basename(source);
  const storageKey = `legacy-${filename}`;
  const targetRoot = path.resolve(process.env.MEDIA_STORAGE_PATH ?? "./storage/media");
  try {
    await readFile(source);
  } catch {
    console.warn(`Imagem não encontrada, seguindo sem capa: ${image}`);
    return null;
  }
  await mkdir(targetRoot, { recursive: true });
  try { await copyFile(source, path.join(targetRoot, storageKey)); } catch { /* arquivo já importado */ }
  return prisma.media.upsert({
    where: { storageKey },
    update: { altText: filename },
    create: { filename, storageKey, mimeType: mimeFor(filename), byteSize: (await readFile(source)).byteLength, altText: filename, createdById: userId },
  });
}

async function main() {
  const admin = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!admin) throw new Error("Execute pnpm db:seed antes da importação.");
  const source = await readFile(path.join(process.cwd(), "src", "data", "blog-posts.json"), "utf8");
  const posts = JSON.parse(source) as LegacyPost[];
  for (const item of posts) {
    const category = await prisma.category.upsert({ where: { slug: item.category.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }, update: { name: item.category }, create: { name: item.category, slug: item.category.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } });
    const media = await mediaFor(item.image, admin.id);
    await prisma.post.upsert({
      where: { slug: item.slug },
      update: { title: item.title, excerpt: item.excerpt, content: item.blocks as Prisma.InputJsonValue, status: "PUBLISHED", publishedAt: new Date(item.date), coverMediaId: media?.id ?? undefined, updatedById: admin.id, categories: { deleteMany: {}, create: [{ categoryId: category.id }] } },
      create: { slug: item.slug, title: item.title, excerpt: item.excerpt, content: item.blocks as Prisma.InputJsonValue, status: "PUBLISHED", publishedAt: new Date(item.date), authorId: admin.id, updatedById: admin.id, coverMediaId: media?.id, categories: { create: [{ categoryId: category.id }] } },
    });
  }
  console.log(`${posts.length} posts importados para o CMS.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
