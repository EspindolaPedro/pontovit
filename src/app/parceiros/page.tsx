import { PartnersPage } from "@/components/pages/partners/partners-page";
import { pageMetadata } from "@/lib/seo";
import { getPublicBrandLogos } from "@/server/modules/brand/brand.repository";
import { LogoGroup } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Parceiros",
  "Conheça os parceiros da PontoVit e as soluções que ampliam a gestão de jornadas, pessoas e operações.",
  "/parceiros/",
);

export default async function PartnersRoute() {
  return <PartnersPage partnerLogos={await getPublicBrandLogos(LogoGroup.PARTNER)} />;
}
