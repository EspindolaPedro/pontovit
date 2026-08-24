import { siteConfig } from "@/config/site";

export function getWhatsAppUrl(message: string = siteConfig.whatsappMessage) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function normalizeCtaLabel(label?: string | null) {
  if (!label || /solicitar.*demonstra/i.test(label)) return "Falar no Whatsapp";
  return label.replace(/WhatsApp/g, "Whatsapp");
}
