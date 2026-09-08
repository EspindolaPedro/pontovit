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
    // Nível de correção de erro alto (H) porque o selo da PontoVit fica sobreposto
    // no centro do QR — o código continua lendo mesmo com ~30% da área coberta.
    QRCode.toString(getMagnoCardUrl(), { type: "svg", margin: 0, errorCorrectionLevel: "H", color: { dark: "#24313f", light: "#00000000" } }),
    getMagnoPhoto(),
  ]);
  const photoUrl = photo ? `/api/magno/photo?v=${photo.updatedAt.getTime()}` : null;
  return <MagnoCard qrSvg={qrSvg} photoUrl={photoUrl} focalPointX={photo?.focalPointX} focalPointY={photo?.focalPointY} />;
}
