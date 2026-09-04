import { siteConfig } from "@/config/site";

/**
 * Cartão virtual do Magno (/magno) — cartão de visita digital + link in bio.
 * A foto de perfil não fica aqui: é gerenciada pelo CMS (/admin/magno) e
 * servida via /api/magno/photo — veja src/server/modules/magno/magno.service.ts.
 */
export const magnoCard = {
  slug: "magno",
  path: "/magno",
  fullName: "Magno Baís",
  firstName: "Magno",
  lastName: "Baís",
  role: "Founder",
  company: siteConfig.name,
  bio: "Founder da PontoVit. Ajudo empresas a organizarem escalas, jornadas e equipes com mais eficiência.",
  email: "magno@pontovit.com.br",
  whatsapp: siteConfig.whatsapp,
  whatsappMessage: "Olá, Magno! Vim através do seu cartão digital da PontoVit.",
  phoneDisplay: "+55 51 99299-8338",
  linkedin: siteConfig.socialLinks.linkedin,
  instagram: siteConfig.socialLinks.instagram,
  siteUrl: siteConfig.url,
} as const;

export function getMagnoWhatsAppUrl() {
  return `https://wa.me/${magnoCard.whatsapp}?text=${encodeURIComponent(magnoCard.whatsappMessage)}`;
}

export function getMagnoCardUrl() {
  return `${siteConfig.url}${magnoCard.path}`;
}

function escapeVCardValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function buildMagnoVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(magnoCard.lastName)};${escapeVCardValue(magnoCard.firstName)};;;`,
    `FN:${escapeVCardValue(magnoCard.fullName)}`,
    `ORG:${escapeVCardValue(magnoCard.company)}`,
    `TITLE:${escapeVCardValue(magnoCard.role)}`,
    `TEL;TYPE=CELL,WHATSAPP:+${magnoCard.whatsapp}`,
    `EMAIL;TYPE=WORK:${magnoCard.email}`,
    `URL:${magnoCard.siteUrl}`,
    `URL:${getMagnoCardUrl()}`,
    `NOTE:${escapeVCardValue(magnoCard.bio)}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}
