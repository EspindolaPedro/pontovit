import QRCode from "qrcode";
import { MagnoCard } from "@/components/pages/magno/magno-card";
import { getMagnoCardUrl, magnoCard } from "@/config/magno";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  `${magnoCard.fullName} · ${magnoCard.role}`,
  `Cartão virtual de ${magnoCard.fullName}, ${magnoCard.role} da PontoVit. Salve o contato, fale no WhatsApp ou conheça a plataforma.`,
  magnoCard.path,
);

export default async function MagnoRoute() {
  const qrSvg = await QRCode.toString(getMagnoCardUrl(), {
    type: "svg",
    margin: 0,
    color: { dark: "#1c140d", light: "#00000000" },
  });
  return <MagnoCard qrSvg={qrSvg} />;
}
