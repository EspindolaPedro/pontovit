import { prisma } from "../../db/prisma";
import { SiteSettingsSchema, SocialLinkSchema, CtaSettingsSchema } from "../../validation/common";

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "main" } });
}

export async function saveSiteSettings(input: ReturnType<typeof SiteSettingsSchema.parse>) {
  return prisma.siteSettings.upsert({ where: { id: "main" }, update: input, create: { id: "main", ...input } });
}

export async function getCtaSettings() { return prisma.ctaSettings.findUnique({ where: { id: "main" } }); }

export async function saveCtaSettings(input: ReturnType<typeof CtaSettingsSchema.parse>) {
  return prisma.ctaSettings.upsert({ where: { id: "main" }, update: input, create: { id: "main", ...input } });
}

export function getSocialLinks() { return prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } }); }

export async function createSocialLink(input: ReturnType<typeof SocialLinkSchema.parse>) { return prisma.socialLink.create({ data: input }); }
export async function updateSocialLink(id: string, input: ReturnType<typeof SocialLinkSchema.parse>) { return prisma.socialLink.update({ where: { id }, data: input }); }

export async function deleteSocialLink(id: string) { await prisma.socialLink.delete({ where: { id } }); }

export async function getPublicSettings() {
  try {
    const [site, cta, socials] = await Promise.all([getSiteSettings(), getCtaSettings(), getSocialLinks()]);
    const configuredTarget = site?.whatsapp
      ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}${site.whatsappMessage ? `?text=${encodeURIComponent(site.whatsappMessage)}` : ""}`
      : cta?.target || null;
    return { site, cta: cta ? { ...cta, target: configuredTarget } : { target: configuredTarget, headerLabel: null, heroLabel: null, footerLabel: null }, socials };
  } catch {
    return { site: null, cta: null, socials: [] };
  }
}
