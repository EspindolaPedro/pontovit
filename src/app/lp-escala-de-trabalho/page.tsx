import { LogoGroup } from "@prisma/client";
import { WorkScheduleLandingPage } from "@/components/lp-escala-de-trabalho/landing-page";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { getPublicBrandLogos } from "@/server/modules/brand/brand.repository";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Simulador da Escala 5x2",
  "Simule o impacto da transição da escala 6x1 para a 5x2 e descubra como reorganizar jornadas, folgas, turnos e equipes com a PontoVit.",
  "/lp-escala-de-trabalho",
  ["escala 5x2", "fim da escala 6x1", "simulador escala 5x2", "jornada de 40 horas", "gestão de escalas", "PontoVit"],
);

const fallbackLogos = [
  ["Logo Básica.jpg.jpeg", "Básica Administração de Condomínios"],
  ["Logo CardápioWeb.png", "Cardápio Web"],
  ["Logo Dom Pedro.png", "Dom Pedro"],
  ["Logo Nicolini.jpeg", "Nicolini"],
  ["Logo Pag Poko.jpg.jpeg", "Supermercados Pag Poko"],
  ["Logo Santhiago.jpg.jpeg", "Supermercado Santhiago"],
  ["Logo Super Gaúcho.png", "Supermercado Gaúcho"],
  ["Logo Vargem Linda.jpg.jpeg", "Posto Vargem Linda"],
  ["Logo Veratti.png", "Veratti Supermercados"],
  ["Logomarca Master Sonda.png", "Master Sonda"],
] as const;

const faqJsonLd = [
  ["Minha empresa precisa fechar aos domingos?", "Não necessariamente. Empresas que funcionam aos finais de semana podem organizar escalas com revezamento, observando as regras legais e coletivas aplicáveis."],
  ["A escala 5x2 exige contratar mais funcionários?", "Depende da estrutura, da demanda por horário e da quantidade de colaboradores disponíveis. A simulação inicial não substitui uma análise detalhada."],
  ["A calculadora mostra quantos funcionários preciso contratar?", "Não. Ela apresenta uma estimativa operacional inicial. A necessidade efetiva depende de intervalos, funções, turnos, férias, ausências e regras coletivas."],
  ["A PontoVit funciona apenas com a escala 5x2?", "Não. A plataforma permite planejar diferentes modelos de escalas, revezamentos e turnos alternados."],
] as const;

export default async function WorkScheduleLandingPageRoute() {
  const clients = await getPublicBrandLogos(LogoGroup.CLIENT);

  const clientLogos = clients.length
    ? clients.map((item) => ({ src: `/api/media/${item.media.id}`, alt: item.altText || item.name }))
    : fallbackLogos.map(([file, alt]) => ({ src: `/assets/clientes-novos/${encodeURIComponent(file)}`, alt }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PontoVit",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${siteConfig.url}/lp-escala-de-trabalho`,
      description: "Plataforma de gestão de escalas, jornadas, turnos, folgas e equipes.",
      provider: { "@type": "Organization", name: "PontoVit", url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqJsonLd.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <WorkScheduleLandingPage clientLogos={clientLogos} />
    </>
  );
}
