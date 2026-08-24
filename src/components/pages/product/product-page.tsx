import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal } from "@/components/shared/reveal";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowUpRightIcon } from "@/components/shared/icons";
import { escalasBenefits, escalasIntro, scaleTypes } from "@/data/home";

const stages = [
  ["Montagem", "Construa a jornada com as regras e necessidades da operação."],
  ["Análise", "Visualize conflitos, folgas e distribuição antes de publicar."],
  ["Autorização", "Dê clareza às responsabilidades e ao fluxo de aprovação."],
  ["Impressão", "Gere e compartilhe a escala final com as equipes de forma simples."],
] as const;

export function ProductPage({ ctaTarget }: { ctaTarget?: string | null }) {
  const whatsapp = ctaTarget || getWhatsAppUrl();

  return (
    <main className="pv-page pv-product-page">
      <PageHero eyebrow={escalasIntro.eyebrow} title={<>Com o PontoVit você monta todas as <strong>Escalas de Trabalho</strong> de acordo com as regras da consolidação das leis trabalhistas com rapidez e facilidade.</>} visual="product" image="/assets/product/product-devices.png" imageAlt="PontoVit em diferentes dispositivos" />

      <section id="conteudo" className="pv-page-section pv-product-intro">
        <Container>
          <Reveal className="pv-product-intro-grid">
            <div className="pv-product-screen-plain">
              <Image src="/assets/product/product-notebook.png" alt="Tela real do sistema PontoVit em um notebook" width={417} height={269} className="pv-product-screen" />
            </div>
            <div className="pv-product-intro-copy">
              <p className="eyebrow">O PontoVit</p>
              <h2>{escalasIntro.oPontoVit[0]}</h2>
              <p>{escalasIntro.oPontoVit[1]}</p>
              <p>{escalasIntro.oPontoVit[2]}</p>
              <ButtonLink href={whatsapp} target="_blank" rel="noreferrer" className="mt-8">Falar no Whatsapp</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pv-page-section pv-gestao-section">
        <Container>
          <Reveal className="pv-section-dark flex flex-col gap-4">
            <p className="eyebrow">Gestão das Escalas</p>
            <p className="max-w-2xl text-lg">{escalasIntro.gestaoDasEscalas}</p>
          </Reveal>
        </Container>
      </section>

      <section id="tipos-de-escala" className="pv-page-section pv-scale-types-section">
        <Container>
          <Reveal className="pv-feature-heading">
            <div><p className="eyebrow">Tipos de escala</p><h2>Da jornada mais simples<br /><strong>à operação mais complexa.</strong></h2></div>
            <p>5x2. 6x1. 12x36. Turnos alternados, folgas e equipes diferentes em unidades diferentes — cada operação com a escala certa.</p>
          </Reveal>
          <Reveal delay={100} className="pv-icon-card-grid">
            {scaleTypes.map(({ title, text, href, icon: Icon }, index) => {
              const card = (
                <>
                  <span className="pv-icon-card-icon"><Icon size={24} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {href && <span className="pv-icon-card-link">Saiba mais <ArrowUpRightIcon size={14} /></span>}
                </>
              );
              const className = `pv-icon-card${index % 3 === 1 ? " is-yellow" : ""}`;
              return href ? (
                <Link key={title} href={href} className={className}>{card}</Link>
              ) : (
                <article key={title} className={className}>{card}</article>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <section className="pv-page-section pv-flow-section">
        <Container>
          <Reveal className="pv-flow-heading">
            <div><p className="eyebrow">Um fluxo claro</p><h2>Da montagem à impressão,<br /><strong>cada etapa no seu lugar.</strong></h2></div>
            <p>Menos troca de arquivos. Mais visibilidade para quem participa do planejamento.</p>
          </Reveal>
          <Reveal delay={100} className="pv-flow-list">
            {stages.map(([title, text], index) => (
              <article key={title} className="pv-flow-item">
                <span className="pv-flow-number">0{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="recursos" className="pv-page-section pv-feature-section">
        <Container>
          <Reveal className="pv-feature-heading">
            <div><p className="eyebrow">Conheça todas as vantagens</p><h2>O que o PontoVit oferece.</h2></div>
            <p>Consulte nossos planos personalizados — adequamos conforme o número de funcionários que tem em sua empresa.</p>
          </Reveal>
          <Reveal delay={100} className="pv-icon-card-grid is-cols-4">
            {escalasBenefits.map(({ title, text, icon: Icon }, index) => (
              <article key={title} className={`pv-icon-card${index % 4 === 2 ? " is-yellow" : ""}`}>
                <span className="pv-icon-card-icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="pv-page-section pv-access-section">
        <Container>
          <Reveal className="pv-access-grid">
            <div className="pv-access-art"><Image src="/assets/product/product-devices.png" alt="A PontoVit em diferentes dispositivos" width={578} height={315} /></div>
            <div>
              <p className="eyebrow">O sistema via Web</p>
              <h2>Tecnologia Software as a Service.</h2>
              <p>{escalasIntro.sistemaViaWeb}</p>
              <ButtonLink href={whatsapp} target="_blank" rel="noreferrer" className="mt-8">Falar com um especialista</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
