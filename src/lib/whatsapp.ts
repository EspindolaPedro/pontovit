import { siteConfig } from "@/config/site";

export function getWhatsAppUrl(message: string = siteConfig.whatsappMessage) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
