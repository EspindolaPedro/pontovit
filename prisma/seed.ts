import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const email = (process.env.CMS_ADMIN_EMAIL ?? "admin@pontovit.local").trim().toLowerCase();
  const password = process.env.CMS_ADMIN_PASSWORD ?? "change-me-local-only";

  if (password === "change-me-local-only" || password === "troque-esta-senha-local") {
    console.warn("CMS_ADMIN_PASSWORD não foi trocada; use uma senha própria antes de qualquer ambiente compartilhado.");
  }

  await prisma.user.upsert({
    where: { email },
    update: { isActive: true, role: UserRole.OWNER },
    create: {
      name: "Administrador PontoVit",
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: UserRole.OWNER,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      companyName: "PontoVit",
      description: "Gestão de escalas, jornadas e equipes em um único sistema.",
    },
  });

  await prisma.ctaSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      headerLabel: "Falar no Whatsapp",
      heroLabel: "Falar no Whatsapp",
      footerLabel: "Falar no Whatsapp",
      target: "https://wa.me/5567999999999",
    },
  });

  for (const category of [
    { name: "Gestão de escalas", slug: "gestao-de-escalas" },
    { name: "Gestão de pessoas", slug: "gestao-de-pessoas" },
    { name: "Tecnologia", slug: "tecnologia" },
  ]) {
    await prisma.category.upsert({ where: { slug: category.slug }, update: {}, create: category });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
