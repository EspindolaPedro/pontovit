import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const seoKeywords = [
  "gestão de escalas de trabalho",
  "sistema de gestão de escalas",
  "software para escalas de trabalho",
  "sistema empresarial para escalas",
  "organização de jornadas de trabalho",
  "controle de turnos e folgas",
  "sistema de ponto",
  "controle de ponto eletrônico",
  "gestão de equipes",
  "conformidade com a CLT",
  "PontoVit",
];

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function postKeywords(title: string, category: string) {
  return [title, category, ...seoKeywords.slice(0, 8)];
}

export function pageMetadata(title: string, description: string, path: string, keywords = seoKeywords): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "pt_BR", url: path, siteName: siteConfig.name, title: `${title} | ${siteConfig.name}`, description },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description },
  };
}
