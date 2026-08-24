import { FigmaHome } from "@/components/home/figma-home";
import { pageMetadata } from "@/lib/seo";
import { getPublicBrandLogos } from "@/server/modules/brand/brand.repository";
import { LogoGroup } from "@prisma/client";
import { getPublicSettings } from "@/server/modules/settings/settings.service";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Gestão de Escalas de Trabalho",
  "Sistema empresarial para montar, organizar e acompanhar escalas de trabalho, jornadas, turnos e folgas com rapidez e conformidade com a CLT.",
  "/",
);

export default async function HomePage() {
  const [clients, partners, settings] = await Promise.all([getPublicBrandLogos(LogoGroup.CLIENT), getPublicBrandLogos(LogoGroup.PARTNER), getPublicSettings()]);
  const toCarousel = (items: typeof clients) => items.map((item) => [`/api/media/${item.media.id}`, item.name] as const);
  return <FigmaHome clientLogosFromCms={toCarousel(clients)} partnerLogosFromCms={toCarousel(partners)} ctaTarget={settings.cta?.target} />;
}
