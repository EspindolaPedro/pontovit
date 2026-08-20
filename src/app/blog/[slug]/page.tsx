import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/blog/article-page";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { absoluteUrl, postKeywords } from "@/lib/seo";

export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = absoluteUrl(`/blog/${post.slug}/`);
  const image = post.image ? absoluteUrl(post.image) : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: postKeywords(post.title, post.category),
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: "PontoVit",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      section: post.category,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: post.title, description: post.excerpt, images: image ? [image] : undefined },
  };
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!getPostBySlug(slug)) notFound(); return <ArticlePage slug={slug} />; }
