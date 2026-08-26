import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/blog/article-page";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { absoluteUrl, postKeywords } from "@/lib/seo";
import { getPublishedPost, listPublishedPosts } from "@/server/modules/posts/site.repository";

export const dynamic = "force-dynamic";

export function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};

  const url = absoluteUrl(post.seoCanonical || `/blog/${post.slug}`);
  const image = post.image ? absoluteUrl(post.image) : undefined;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: postKeywords(post.title, post.category),
    alternates: { canonical: post.seoCanonical || `/blog/${post.slug}` },
    robots: post.seoNoIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: "PontoVit",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.date,
      section: post.category,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, images: image ? [image] : undefined },
  };
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const related = (await listPublishedPosts()).filter((item) => item.slug !== slug).slice(0, 2);
  return <ArticlePage slug={slug} post={post} relatedPosts={related} />;
}
