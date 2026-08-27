import { Container } from "@/components/shared/container";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updatedAt: string;
  html: string;
};

export function LegalPage({ eyebrow, title, updatedAt, html }: LegalPageProps) {
  return (
    <main className="pv-page">
      <section className="pv-article-hero pv-legal-hero">
        <Container>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <span className="pv-article-meta">Última atualização: {updatedAt}</span>
        </Container>
      </section>

      <article className="pv-page-section pv-article-section pv-legal-section">
        <Container>
          <div className="pv-article-body pv-legal-body" dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
      </article>
    </main>
  );
}
