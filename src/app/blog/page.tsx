import { BlogPage } from "@/components/pages/blog/blog-page";
import { pageMetadata } from "@/lib/seo";
import { listPublishedPosts } from "@/server/modules/posts/site.repository";
import { getPublicSettings } from "@/server/modules/settings/settings.service";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Blog de Gestão de Escalas e Jornadas",
  "Conteúdos sobre gestão de escalas de trabalho, jornadas, turnos, folgas, controle de ponto, legislação trabalhista e gestão empresarial.",
  "/blog",
);
export default async function BlogRoute() { const [posts, settings] = await Promise.all([listPublishedPosts(), getPublicSettings()]); return <BlogPage posts={posts} ctaTarget={settings.cta?.target} />; }
