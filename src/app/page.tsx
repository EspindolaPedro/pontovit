import { FigmaHome } from "@/components/home/figma-home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Gestão de Escalas de Trabalho",
  "Sistema empresarial para montar, organizar e acompanhar escalas de trabalho, jornadas, turnos e folgas com rapidez e conformidade com a CLT.",
  "/",
);

export default function HomePage() {
  return <FigmaHome />;
}
