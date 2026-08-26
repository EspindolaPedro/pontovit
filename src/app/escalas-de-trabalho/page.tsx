import { ProductPage } from "@/components/pages/product/product-page";
import { pageMetadata } from "@/lib/seo";
import { getPublicSettings } from "@/server/modules/settings/settings.service";

export const metadata = pageMetadata(
  "Sistema de Escalas de Trabalho",
  "Monte escalas de trabalho, jornadas, turnos e folgas em um sistema empresarial online, adequado à CLT e feito para equipes e operações complexas.",
  "/escalas-de-trabalho",
);
export default async function EscalasPage() { return <ProductPage ctaTarget={(await getPublicSettings()).cta?.target} />; }
