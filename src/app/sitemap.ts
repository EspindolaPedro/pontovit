import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { listPublishedPosts } from "@/server/modules/posts/site.repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await listPublishedPosts();
  const pages = ["/", "/escalas-de-trabalho", "/quem-somos", "/parceiros", "/contato-antigo", "/blog"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.6, images: post.image ? [absoluteUrl(post.image)] : undefined })),
  ];
}
