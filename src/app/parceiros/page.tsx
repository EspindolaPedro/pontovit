import { PartnersPage } from "@/components/pages/partners/partners-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Parceiros",
  "Conheça os parceiros da PontoVit e as soluções que ampliam a gestão de jornadas, pessoas e operações.",
  "/parceiros/",
);

export default function PartnersRoute() {
  return <PartnersPage />;
}
