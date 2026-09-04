import QRCode from "qrcode";
import { MagnoCard } from "@/components/pages/magno/magno-card";
import { getMagnoCardUrl, magnoCard } from "@/config/magno";
import { pageMetadata } from "@/lib/seo";
import { getMagnoPhoto } from "@/server/modules/magno/magno.service";

export const metadata = pageMetadata(
  `${magnoCard.fullName} · ${magnoCard.role}`,
  `Cartão virtual de ${magnoCard.fullName}, ${magnoCard.role} da PontoVit. Salve o contato, fale no WhatsApp ou conheça a plataforma.`,
  magnoCard.path,
);

export default async function MagnoRoute() {
  const [qrSvg, photo] = await Promise.all([
    QRCode.toString(getMagnoCardUrl(), { type: "svg", margin: 0, color: { dark: "#1c140d", light: "#00000000" } }),
    getMagnoPhoto(),
  ]);
  const photoUrl = photo ? `/api/magno/photo?v=${photo.updatedAt.getTime()}` : null;
  return <MagnoCard qrSvg={qrSvg} photoUrl={photoUrl} focalPointX={photo?.focalPointX} focalPointY={photo?.focalPointY} />;
}
