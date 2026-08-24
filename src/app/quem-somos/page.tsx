import { AboutPage } from "@/components/pages/about/about-page";
import { pageMetadata } from "@/lib/seo";
import { getPublicSettings } from "@/server/modules/settings/settings.service";

export const metadata = pageMetadata(
  "Quem Somos",
  "Conheça a PontoVit, empresa pioneira em gestão de escalas de trabalho, jornadas e turnos para operações empresariais.",
  "/quem-somos/",
);
export default async function AboutRoute() { return <AboutPage ctaTarget={(await getPublicSettings()).cta?.target} />; }
