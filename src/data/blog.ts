import rawPosts from "./blog-posts.json";

export type BlogBlock =
  | { type: "p"; html: string }
  | { type: "h2" | "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string | null;
  blocks: BlogBlock[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoCanonical?: string | null;
  seoNoIndex?: boolean;
};

export const blogPosts = rawPosts as BlogPost[];

export function formatPostDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3) {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, count);
}
