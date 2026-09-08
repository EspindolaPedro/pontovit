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
  role: "Founder & CEO",
  company: siteConfig.name,
  // Mensagem de posicionamento — fala da solução da PontoVit, não da pessoa.
  positioningStatement: "Solução em gestão de escalas de trabalho para equipes mais organizadas, produtivas e eficientes.",
  footerSignature: "Pessoas bem escaladas fazem empresas mais fortes",
  presentationUrl: "/assets/magno/apresentacao-pontovit-2026.pdf",
  email: "magno@pontovit.com.br",
  whatsapp: siteConfig.whatsapp,
  whatsappMessage: "Olá, Magno! Vim através do seu cartão digital da PontoVit.",
  demoWhatsappMessage: "Olá! Vim através do cartão do Magno e gostaria de agendar uma demonstração da PontoVit.",
  phoneDisplay: "+55 51 99299-8338",
  linkedin: siteConfig.socialLinks.linkedin,
  instagram: siteConfig.socialLinks.instagram,
  siteUrl: siteConfig.url,
} as const;

export function getMagnoWhatsAppUrl(message: string = magnoCard.whatsappMessage) {
  return `https://wa.me/${magnoCard.whatsapp}?text=${encodeURIComponent(message)}`;
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
    `NOTE:${escapeVCardValue(magnoCard.positioningStatement)}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}
