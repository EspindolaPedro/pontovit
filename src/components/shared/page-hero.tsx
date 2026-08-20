import { Container } from "@/components/shared/container";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowDownIcon, CircleDotIcon } from "@/components/shared/icons";

type PageHeroVisual = "story" | "product" | "content" | "contact";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  visual?: PageHeroVisual;
  image?: string;
  imageAlt?: string;
  video?: string;
  stat?: string;
  statLabel?: string;
};

export function PageHero({ eyebrow, title, description, visual = "content", image, imageAlt, video, stat = "03", statLabel = "leituras para quem planeja operações" }: PageHeroProps) {
  return (
    <section className="pv-page-hero pv-editorial-hero hero-stage">
      <Container>
        <div className="pv-editorial-hero-grid">
          <div className="pv-editorial-hero-copy">
            <p className="eyebrow"><CircleDotIcon size={15} /> {eyebrow}</p>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            <a href="#conteudo" className="pv-explore-link"><span><ArrowDownIcon size={16} /></span> Explorar esta página</a>
          </div>
          <div className={`pv-editorial-hero-art pv-hero-visual-${visual}${image ? " has-image" : ""}`}>
            {image ? (
              <Image src={image} alt={imageAlt ?? "PontoVit"} width={640} height={420} className="pv-editorial-hero-image" />
            ) : video ? (
              <div className="pv-hero-video-stage">
                <iframe className="pv-hero-video" src={video} title="Vídeo institucional PontoVit" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              </div>
            ) : visual === "story" ? (
              <div className="pv-hero-story-card">
                <Image src="/assets/product/pontovit-logo.png" alt="PontoVit" width={187} height={32} className="pv-story-logo" />
                <span>Desde 2011</span>
                <strong>Uma história construída<br />no chão da operação.</strong>
                <i aria-hidden="true" />
                <small>Vitória Humana + PontoVit</small>
              </div>
            ) : visual === "contact" ? (
              <div className="pv-hero-contact-card">
                <span>Fale com a PontoVit</span>
                <strong>Uma conversa<br />começa aqui.</strong>
                <div className="pv-hero-contact-line"><i /> atendimento humano</div>
              </div>
            ) : (
              <div className="pv-hero-content-card">
                <span>Conteúdos PontoVit</span>
                <strong>Ideias que<br />organizam a rotina.</strong>
                <div><b>{stat}</b><small>{statLabel}</small></div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
