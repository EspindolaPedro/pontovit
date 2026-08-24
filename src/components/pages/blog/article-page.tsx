import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/shared/icons";
import { Container } from "@/components/shared/container";
import { formatPostDate, getPostBySlug, getRelatedPosts, type BlogBlock, type BlogPost } from "@/data/blog";
import { absoluteUrl } from "@/lib/seo";

type ArticlePageProps = { slug: string; post?: BlogPost | null; relatedPosts?: BlogPost[] };

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return <ul>{block.items.map((item) => <li key={item.slice(0, 40)}>{item}</li>)}</ul>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}

export function ArticlePage({ slug, post: dynamicPost, relatedPosts }: ArticlePageProps) {
  const post = dynamicPost ?? getPostBySlug(slug);
  if (!post) return null;
  const related = relatedPosts ?? getRelatedPosts(post.slug, 2);
  const [lead, ...rest] = post.blocks;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.image ? [absoluteUrl(post.image)] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: "pt-BR",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(post.seoCanonical || `/blog/${post.slug}/`) },
    author: { "@type": "Organization", name: "PontoVit", url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: "PontoVit", url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/assets/product/pontovit-logo.png") } },
  };

  return (
    <main className="pv-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pv-article-hero">
        <Container>
          <Link href="/blog/" className="pv-back-link"><ArrowLeftIcon size={16} /> Voltar para conteúdos</Link>
          <div className="pv-article-hero-grid">
            <div>
              <p className="eyebrow">{post.category}</p>
              <h1>{post.title}</h1>
              <span className="pv-article-meta">{formatPostDate(post.date)} · Conteúdo PontoVit</span>
            </div>
            {post.image && <div className="pv-article-hero-image"><Image src={post.image} alt={post.title} width={520} height={270} /></div>}
          </div>
        </Container>
      </section>

      <article id="conteudo" className="pv-page-section pv-article-section">
        <Container>
          <div className="pv-article-layout">
            <div className="pv-article-body">
              {lead && lead.type === "p" ? <p className="pv-article-lead" dangerouslySetInnerHTML={{ __html: lead.html }} /> : lead && <Block block={lead} />}
              {rest.map((block, index) => <Block key={index} block={block} />)}
              <div className="pv-article-callout">
                <p>Quer entender como esse processo pode funcionar na sua empresa?</p>
                <Link href="/contato-antigo/">Fale com um especialista <ArrowUpRightIcon size={16} /></Link>
              </div>
            </div>
            <aside className="pv-related">
              <p className="eyebrow">Leia também</p>
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}/`}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <ArrowUpRightIcon size={15} />
                </Link>
              ))}
            </aside>
          </div>
        </Container>
      </article>
    </main>
  );
}
