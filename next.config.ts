import type { NextConfig } from "next";

// Slugs publicados no site antigo (WordPress) em "/<slug>.htm", hoje servidos
// em "/blog/<slug>/". O Google (orgânico e Ads) ainda tem essas URLs antigas
// indexadas/configuradas como destino de campanha, então precisam de redirect
// permanente para não perder o ranking/tráfego já conquistado.
const legacyBlogSlugs = [
  "13o-salario-2025-regras-prazos-erros-comuns-e-como-evitar-problemas-no-fechamento-da-folha",
  "aplicativo-de-escala-de-trabalho",
  "banco-de-horas-em-2026-principais-riscos-e-como-evitar-passivos-trabalhistas",
  "batida-eletronica-de-ponto",
  "como-calcular-jornada-de-trabalho",
  "como-evitar-passivos-trabalhistas-com-um-controle-eficiente-da-jornada-de-trabalho",
  "como-fazer-escala-de-trabalho",
  "como-funciona-a-escala-de-trabalho-12x36",
  "como-funciona-a-escala-de-trabalho-4x3",
  "como-funciona-a-escala-de-trabalho-5x1",
  "como-funciona-a-escala-de-trabalho-5x2",
  "como-funciona-a-escala-de-trabalho-6x1",
  "como-funciona-a-escala-de-trabalho-6x2",
  "como-funciona-uma-escala-de-trabalho",
  "consolidacao-das-leis-do-trabalho",
  "constituicao-da-republica-federativa-do-brasil",
  "controle-de-escalas-de-trabalho",
  "controle-de-ponto",
  "elaboracao-de-escala-de-trabalho",
  "escala-2-por-2",
  "escala-24-por-48",
  "escala-5x1",
  "escala-6x1",
  "escala-de-folga",
  "escala-de-folgas",
  "escala-de-funcionarios",
  "escala-de-horario-de-trabalho",
  "escala-de-plantao",
  "escala-de-revezamento-de-trabalho",
  "escala-de-sobreaviso",
  "escala-de-trabalho",
  "escala-de-trabalho-em-excel",
  "escala-facil",
  "escala-periodica-de-trabalho",
  "escala-periodica-de-trabalho-2",
  "escalas-12x36-6x1-e-plantoes-noturnos-como-organizar-sem-caos-e-dentro-da-lei",
  "faltas-justificada-ou-injustificada-o-que-diz-a-clt-e-como-registrar-corretamente",
  "folgas-intervalos-e-descanso-direitos-do-colaborador-segundo-a-lei",
  "jornada-de-trabalho",
  "jornada-de-trabalho-flex-em-2026-tendencias-do-mercado-e-impactos-na-gestao-de-escalas",
  "jornada-mista",
  "leis-trabalhistas-e-a-clt",
  "nova-lei-do-horario-de-almoco-assegura-ate-2-horas-de-descanso-reforcando-direito-ao-equilibrio-fisico-e-mental",
  "o-impacto-nas-escalas-e-operacoes-pela-escassez-de-mao-de-obra-e-alta-rotatividade",
  "o-que-e-gestao-de-pessoas-e-como-impacta-no-mercado",
  "o-que-e-steel-deck",
  "o-que-e-turnover-e-como-reduzir-seus-impactos",
  "otimize-a-gestao-de-escalas-de-trabalho",
  "ponto-eletronico",
  "portaria-1510",
  "quantas-horas-sua-equipe-de-rh-perde-toda-semana-montando-escalas-manuais",
  "recesso-coletivo-e-escalas-de-fim-de-ano-o-que-diz-a-clt-e-como-organizar-sem-prejudicar-a-operacao",
  "reducao-da-jornada-de-trabalho-no-brasil-tendencia-projetos-de-lei-e-impactos",
  "reforma-trabalhista-o-que-pode-mudar-em-2025-e-como-isso-impacta-as-escalas-de-trabalho",
  "sistema-de-escalas-de-trabalho",
  "sua-escala-de-trabalho-esta-realmente-conforme-a-clt",
  "teletrabalho-e-modelo-hibrido-em-2025-formalizacao-controle-de-jornada-e-direito-a-desconexao",
  "trabalho-em-feriados-tera-nova-regra-a-partir-de-julho-veja-o-que-muda",
  "validacao-do-trabalho-intermitente-pelo-stf-implicacoes-para-empregadores-e-colaboradores",
  "voce-tem-clareza-sobre-quem-esta-escalado-hoje-nas-suas-unidades",
] as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // O deploy Linux usa standalone; no Windows local o pnpm cria symlinks que
  // podem falhar no tracing quando o Developer Mode não está habilitado.
  output: process.platform === "win32" ? undefined : "standalone",
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyBlogSlugs.flatMap((slug) => [
      { source: `/${slug}.htm`, destination: `/blog/${slug}`, permanent: true },
      { source: `/${slug}`, destination: `/blog/${slug}`, permanent: true },
    ]);
  },
};

export default nextConfig;
