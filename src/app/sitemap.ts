import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/escalas-de-trabalho/", "/quem-somos/", "/parceiros/", "/contato-antigo/", "/blog/"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}/`), lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.6, images: post.image ? [absoluteUrl(post.image)] : undefined })),
  ];
}
