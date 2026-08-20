import { BlogPage } from "@/components/pages/blog/blog-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Blog de Gestão de Escalas e Jornadas",
  "Conteúdos sobre gestão de escalas de trabalho, jornadas, turnos, folgas, controle de ponto, legislação trabalhista e gestão empresarial.",
  "/blog/",
);
export default function BlogRoute() { return <BlogPage />; }
