import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/_next/"] }],
    host: "https://www.pontovit.com.br",
    sitemap: "https://www.pontovit.com.br/sitemap.xml",
  };
}
