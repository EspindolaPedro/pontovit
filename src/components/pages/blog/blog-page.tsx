"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/shared/icons";
import { Container } from "@/components/shared/container";
import { ButtonLink } from "@/components/shared/button-link";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { blogPosts, formatPostDate } from "@/data/blog";

const PER_PAGE = 9;

function PostCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="pv-blog-card">
      <div className="pv-blog-card-meta"><span className="pv-blog-tag">{post.category}</span><span>{formatPostDate(post.date)}</span></div>
      <h3>{post.title}</h3>
      {post.image && <div className="pv-blog-card-image"><Image src={post.image} alt="" width={480} height={300} /></div>}
      <div className="pv-blog-card-author"><Image src="/assets/product/pontovit-mark.png" alt="" width={26} height={26} className="pv-blog-card-avatar" /><span>PontoVit<small>Conteúdo PontoVit</small></span></div>
    </Link>
  );
}

export function BlogPage() {
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(blogPosts.map((p) => p.category)))], []);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (activeCategory === "Todos" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featured = page === 1 ? pageItems[0] : null;
  const gridItems = featured ? pageItems.slice(1) : pageItems;

  function selectCategory(category: string) {
    setActiveCategory(category);
    setPage(1);
  }

  return (
    <main className="pv-page pv-blog-page">
      <section id="conteudo" className="pv-page-section pv-blog-section pv-blog-section-top">
        <Container>
          <div className="pv-blog-toolbar">
            <h2>Blog</h2>
            <div className="pv-blog-filters">
              {categories.map((category) => (
                <button key={category} type="button" className={category === activeCategory ? "is-active" : ""} onClick={() => selectCategory(category)}>{category}</button>
              ))}
            </div>
          </div>

          <div className="pv-blog-layout">
            <aside className="pv-blog-sidebar">
              <div className="pv-blog-promo-card">
                <h3>Pronto para organizar suas escalas?</h3>
                <p>Com o PontoVit você monta todas as Escalas de Trabalho de acordo com as regras da CLT, com rapidez e facilidade.</p>
                <ButtonLink href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Solicitar demonstração</ButtonLink>
              </div>
              <div className="pv-blog-promo-card is-accent">
                <h3>100% adequado à CLT.</h3>
                <p>Sistema Multiusuário e Multiempresa, via Web, sem complicação.</p>
                <ButtonLink href="/escalas-de-trabalho/" variant="secondary">Conhecer o sistema</ButtonLink>
              </div>
            </aside>

            <div className="pv-blog-main">
              {featured && (
                <Link href={`/blog/${featured.slug}/`} className="pv-blog-featured">
                  <div className="pv-blog-card-meta"><span className="pv-blog-tag">{featured.category}</span><span>{formatPostDate(featured.date)}</span></div>
                  <h3>{featured.title}</h3>
                  {featured.image && <div className="pv-blog-featured-image"><Image src={featured.image} alt="" width={860} height={430} priority /></div>}
                  <div className="pv-blog-card-author"><Image src="/assets/product/pontovit-mark.png" alt="" width={26} height={26} className="pv-blog-card-avatar" /><span>PontoVit<small>Conteúdo PontoVit</small></span></div>
                </Link>
              )}

              <div className="pv-blog-grid">
                {gridItems.map((post) => <PostCard key={post.slug} post={post} />)}
              </div>

              {totalPages > 1 && (
                <div className="pv-blog-pagination">
                  <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Página anterior"><ArrowLeftIcon size={16} /></button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button key={n} type="button" className={n === page ? "is-active" : ""} onClick={() => setPage(n)}>{n}</button>
                  ))}
                  <button type="button" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} aria-label="Próxima página"><ArrowRightIcon size={16} /></button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
