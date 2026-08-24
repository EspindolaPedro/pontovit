import { prisma } from "../../db/prisma";
import { blogPosts, getPostBySlug as getStaticPost, type BlogPost } from "@/data/blog";

type SitePost = Awaited<ReturnType<typeof prisma.post.findFirst>> & {
  categories?: { category: { name: string; slug: string } }[];
  coverMedia?: { id: string; storageKey: string; altText: string; focalPointX: number | null; focalPointY: number | null } | null;
};

function formatDate(date: Date | null) {
  if (!date) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function toLegacyBlocks(content: unknown): BlogPost["blocks"] {
  if (Array.isArray(content)) return content as BlogPost["blocks"];
  if (!content || typeof content !== "object") return [];
  const nodes = (content as { content?: unknown[] }).content;
  if (!Array.isArray(nodes)) return [];
  const blocks: BlogPost["blocks"] = [];
  for (const node of nodes) {
    if (!node || typeof node !== "object") return [];
    const item = node as { type?: string; content?: { text?: string }[]; attrs?: { level?: number } };
    const text = (item.content ?? []).map((child) => child.text ?? "").join("").trim();
    if (!text) continue;
    if (item.type === "heading") blocks.push({ type: item.attrs?.level === 3 ? "h3" : "h2", text });
    else if (item.type === "bulletList" || item.type === "orderedList") blocks.push({ type: "ul", items: [text] });
    else blocks.push({ type: "p", html: text });
  }
  return blocks;
}

function toSitePost(post: SitePost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: formatDate(post.publishedAt),
    category: post.categories?.[0]?.category.name ?? "Conteúdos",
    excerpt: post.excerpt ?? "",
    image: post.coverMedia ? `/api/media/${post.coverMedia.id}` : null,
    blocks: toLegacyBlocks(post.content),
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoCanonical: post.seoCanonical,
    seoNoIndex: post.seoNoIndex,
  };
}

export async function getPublishedPost(slug: string) {
  try {
    const post = await prisma.post.findFirst({
      where: { slug, status: "PUBLISHED", deletedAt: null },
      include: {
        categories: { include: { category: { select: { name: true, slug: true } } } },
        coverMedia: { select: { id: true, storageKey: true, altText: true, focalPointX: true, focalPointY: true } },
      },
    });
    return post ? toSitePost(post) : getStaticPost(slug);
  } catch {
    return getStaticPost(slug);
  }
}

export async function listPublishedPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      include: {
        categories: { include: { category: { select: { name: true, slug: true } } } },
        coverMedia: { select: { id: true, storageKey: true, altText: true, focalPointX: true, focalPointY: true } },
      },
    });
    return posts.length ? posts.map(toSitePost) : blogPosts;
  } catch {
    return blogPosts;
  }
}
