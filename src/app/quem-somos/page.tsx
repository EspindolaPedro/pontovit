import { AboutPage } from "@/components/pages/about/about-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Quem Somos",
  "Conheça a PontoVit, empresa pioneira em gestão de escalas de trabalho, jornadas e turnos para operações empresariais.",
  "/quem-somos/",
);
export default function AboutRoute() { return <AboutPage />; }
