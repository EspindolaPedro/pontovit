"use client";

import Link from "next/link";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/home";
import { blogPosts, formatPostDate } from "@/data/blog";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const asset = "/assets/figma/";
const CtaContext = createContext({ label: "Falar no Whatsapp", target: getWhatsAppUrl() });

const legacyClientLogos = [
  ["superdo.jpeg", "Superdó"],
  ["master-supermercados.jpeg", "Master Supermercados"],
  ["posto-vargem-linda.jpeg", "Posto Vargem Linda"],
  ["cardapio-web.jpeg", "Cardápio Web"],
  ["patbo.jpeg", "PatBo"],
  ["supermercado-gaucho.jpeg", "Supermercado Gaúcho"],
  ["basica-condominios.jpeg", "Básica Administração de Condomínios"],
  ["laticinios-uniao-do-brasil.jpeg", "Laticínios União do Brasil"],
  ["dom-pedro.jpeg", "Dom Pedro"],
  ["veratti-supermercados.jpeg", "Veratti Supermercados"],
  ["santhiago.jpeg", "Supermercado Santhiago"],
  ["cliente-01.jpeg", "Cliente PontoVit"],
  ["pag-poko.jpeg", "Supermercados Pag Poko"],
  ["vetcenter.jpeg", "VetCenter Clínica & Pet Store"],
] as const;

const legacyPartnerLogos = [
  ["abrasel.jpeg", "Abrasel"],
  ["amas.jpeg", "AMAS"],
  ["metadados.jpeg", "Metadados"],
  ["vitoria-humana.jpeg", "Vitória Humana"],
  ["stelanto.jpeg", "Stelanto"],
] as const;

const clientLogos = [
  ["Logo Básica.jpg.jpeg", "Básica Administração de Condomínios"],
  ["Logo CardápioWeb.png", "Cardápio Web"],
  ["Logo Dom Pedro.png", "Dom Pedro"],
  ["Logo Nicolini.jpeg", "Nicolini"],
  ["Logo Nohda.jpg.jpeg", "Nohda"],
  ["Logo Pag Poko.jpg.jpeg", "Supermercados Pag Poko"],
  ["Logo Santhiago.jpg.jpeg", "Supermercado Santhiago"],
  ["Logo Super Gaúcho.png", "Supermercado Gaúcho"],
  ["Logo superdo.png", "Superdó"],
  ["logo uniao nova.jpg.jpeg", "Laticínios União do Brasil"],
  ["Logo Vargem Linda.jpg.jpeg", "Posto Vargem Linda"],
  ["Logo Veratti.png", "Veratti Supermercados"],
  ["Logo Vet Center.jpg.jpeg", "VetCenter Clínica & Pet Store"],
  ["Logomarca Master Sonda.png", "Master Sonda"],
  ["One Car Wash.png", "One Car Wash"],
] as const;

const partnerLogos = [
  ["Logo Abrasel.png", "Abrasel"],
  ["Logo AMAS.png", "AMAS"],
  ["Logo Metadados.png", "Metadados"],
  ["Logo Stelanto.png", "Stelanto"],
  ["Logo Vitória Humana 2026.jpeg", "Vitória Humana"],
] as const;

function LogoMarquee({ logos, folder, direction = "left" }: { logos: readonly (readonly [string, string])[]; folder: string; direction?: "left" | "right" }) {
  // Repeat the set enough times that the seam where it loops sits well past what's visible
  // in one viewport — with a short list (e.g. 5 partners), just doubling it makes the repeat
  // obvious immediately. Always keep the repeat count even so translateX(-50%) lands on a
  // clean set boundary for a seamless loop.
  const minTiles = 20;
  const rawRepeat = Math.max(2, Math.ceil(minTiles / logos.length));
  const repeatCount = rawRepeat % 2 === 0 ? rawRepeat : rawRepeat + 1;
  const looped = Array.from({ length: repeatCount }, () => logos).flat();
  return (
    <div className={`figma-marquee figma-marquee-${direction}`}>
      <div className="figma-marquee-track">
        {looped.map(([file, name], index) => (
          <div className="figma-marquee-tile" key={`${file}-${index}`}>
            <img src={`/assets/${folder}/${file}`} alt={name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnerCarousel({ logos = partnerLogos }: { logos?: readonly (readonly [string, string])[] }) {
  const loopedLogos = [...logos, ...logos];
  return (
    <div className="figma-partner-carousel" aria-label="Parceiros da PontoVit">
      <div className="figma-partner-carousel-track">
        {loopedLogos.map(([file, name], index) => <img key={`${file}-${index}`} src={file.startsWith("/") ? file : `/assets/parceiros-novos/${encodeURIComponent(file)}`} alt={index < logos.length ? name : ""} aria-hidden={index >= logos.length ? true : undefined} />)}
      </div>
    </div>
  );
}

function ArrowButton({ children = "Falar no Whatsapp", mobileChildren }: { children?: React.ReactNode; mobileChildren?: React.ReactNode }) {
  return (
    <Link href={useContext(CtaContext).target} target="_blank" rel="noreferrer" className="figma-button">
      <span className="figma-button-label figma-button-label-desktop">{children}</span>
      {mobileChildren && <span className="figma-button-label figma-button-label-mobile">{mobileChildren}</span>}
      <span className="figma-button-arrow">↗</span>
    </Link>
  );
}

function SectionTitle({ eyebrow, title, light = false }: { eyebrow?: string; title: React.ReactNode; light?: boolean }) {
  return <div className={`figma-section-title${light ? " is-light" : ""}`}>{eyebrow && <p className="figma-eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>;
}

function MobileCarouselDots({ count, activeIndex, onSelect, label }: { count: number; activeIndex: number; onSelect: (index: number) => void; label: string }) {
  return (
    <div className="figma-mobile-carousel-dots" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-label={label + ": slide " + (index + 1)}
          aria-selected={activeIndex === index}
          className={"figma-mobile-carousel-dot" + (activeIndex === index ? " is-active" : "")}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

const benefits = [
  ["Automatize o planejamento", "Crie escalas e distribua jornadas com muito menos trabalho manual.", "benefit-plan.svg"],
  ["Reduza erros e retrabalho", "Identifique inconsistências antes que elas virem um problema na operação.", "benefit-errors.svg"],
  ["Tenha tudo sob controle", "Acompanhe equipes, horários, folgas e jornadas em um único lugar.", "benefit-gear.svg"],
  ["Tome decisões melhores", "Transforme dados da operação em informações claras para seus gestores.", "candidate-1.svg"],
] as const;

const resources = [
  ["Gestão de Escalas", "Planeje diferentes jornadas, turnos e folgas de forma centralizada.", "resources-gestao-de-escalas.png", "resources-gestao-de-escalas.png"],
  ["Controle de Ponto", "Acompanhe os registros e tenha mais visibilidade sobre a jornada realizada.", "resources-controle-ponto.png", "resources-controle-ponto.png"],
  ["Gestão da Força de Trabalho (WFM)", "Organize colaboradores por unidade, setor, função ou necessidade operacional.", "resources-gestao-wfm.png", "resources-gestao-wfm.png"],
];

function BenefitsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveSlide = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      const nextIndex = cards.reduce((closestIndex, card, index) => {
        const closestCard = cards[closestIndex];
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
        return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? index : closestIndex;
      }, 0);
      setActiveIndex(nextIndex);
    };

    track.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveSlide);
  }, []);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const scrollPaddingLeft = Number.parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: Math.max(0, card.offsetLeft - scrollPaddingLeft), behavior: "smooth" });
  };

  const snapToNearestSlide = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const index = cards.reduce((closestIndex, card, cardIndex) => {
      const closestCard = cards[closestIndex];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
      return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? cardIndex : closestIndex;
    }, 0);

    setActiveIndex(index);
    const scrollPaddingLeft = Number.parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: Math.max(0, cards[index].offsetLeft - scrollPaddingLeft), behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      track.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 450);
    }
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove("is-dragging");
    if (drag.moved) snapToNearestSlide();
    dragRef.current = null;
  };

  const handlePillClick = (index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    goToSlide(index);
  };

  return (
    <>
      <div ref={trackRef} className="figma-benefit-grid" aria-label="Benefícios da PontoVit" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
      {benefits.map(([title, text, icon], index) => (
        <article key={title} className={`figma-benefit-card card-${index + 1}`}>
          <button type="button" className={`benefit-pill${activeIndex === index ? " is-default-active" : ""}`} aria-label={`Ativar benefício: ${title}`} onClick={() => handlePillClick(index)}>
            <img src={`${asset}benefit-arrow.svg`} alt="" />
          </button>
          <span className="benefit-icon"><img src={`${asset}${icon}`} alt="" /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
      </div>
      <MobileCarouselDots count={benefits.length} activeIndex={activeIndex} onSelect={goToSlide} label="Automatização" />
    </>
  );
}

function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveCard = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      const nextIndex = cards.reduce((closestIndex, card, index) => {
        const closestCard = cards[closestIndex];
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
        return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? index : closestIndex;
      }, 0);
      setActiveIndex(nextIndex);
    };

    track.addEventListener("scroll", updateActiveCard, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveCard);
  }, []);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    setActiveIndex(index);
    const scrollPaddingLeft = Number.parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: Math.max(0, card.offsetLeft - scrollPaddingLeft), behavior: "smooth" });
  };

  const snapToNearestCard = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const index = cards.reduce((closestIndex, cardIndex, cardIndexPosition) => {
      const closestCard = cards[closestIndex];
      const cardCenter = cardIndex.offsetLeft + cardIndex.offsetWidth / 2;
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
      return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? cardIndexPosition : closestIndex;
    }, 0);
    setActiveIndex(index);
    const scrollPaddingLeft = Number.parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: Math.max(0, cards[index].offsetLeft - scrollPaddingLeft), behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      track.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove("is-dragging");
    if (drag.moved) snapToNearestCard();
    dragRef.current = null;
  };

  return (
    <>
      <div ref={trackRef} className="figma-testimonial-grid" aria-label="Depoimentos de clientes" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
      {testimonials.map((testimonial) => (
        <article className="figma-testimonial-card" key={testimonial.name}>
          <span className="testimonial-accent" aria-hidden="true" />
          <blockquote>“{testimonial.quote}”</blockquote>
          <footer>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.company}</span>
          </footer>
        </article>
      ))}
      </div>
      <MobileCarouselDots count={testimonials.length} activeIndex={activeIndex} onSelect={goToSlide} label="Depoimentos" />
    </>
  );
}

function BlogPreviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);

  const snapToNearestCard = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const index = cards.reduce((closestIndex, card, cardIndex) => {
      const closestCard = cards[closestIndex];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
      return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? cardIndex : closestIndex;
    }, 0);
    const scrollPaddingLeft = Number.parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: Math.max(0, cards[index].offsetLeft - scrollPaddingLeft), behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      track.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 450);
    }
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove("is-dragging");
    if (drag.moved) snapToNearestCard();
    dragRef.current = null;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div ref={trackRef} className="figma-blog-preview-grid" aria-label="Posts recentes do blog" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd} onClick={handleClick}>
      {blogPosts.slice(0, 3).map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}/`} className="figma-blog-preview-card">
          {post.image && <div className="figma-blog-preview-image"><Image src={post.image} alt="" width={640} height={360} /></div>}
          <div className="figma-blog-preview-meta"><span>{post.category}</span><time dateTime={post.date}>{formatPostDate(post.date)}</time></div>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <span className="figma-blog-preview-read">Ler artigo <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  );
}

function LogoCarousel({ logos = clientLogos }: { logos?: readonly (readonly [string, string])[] }) {
  const loopedLogos = [...logos, ...logos];

  return (
    <div className="figma-logo-track" aria-label="Empresas que confiam na PontoVit">
      <div className="figma-logo-track-inner">
        {loopedLogos.map(([image, label], index) => <img key={`${image}-${index}`} src={image.startsWith("/") ? image : `/assets/clientes-novos/${encodeURIComponent(image)}`} alt={index < logos.length ? label : ""} aria-hidden={index >= logos.length ? true : undefined} />)}
      </div>
    </div>
  );
}

function LegacyRawLogoCarousel() {
  const logos = [
    ["raw-1.png", "Supermercado Paraná"],
    ["raw-4.png", "Vitória Humana"],
    ["raw-5.png", "Amas"],
    ["raw-10.png", "Metadados"],
  ] as const;
  const loopedLogos = [...logos, ...logos];

  return (
    <div className="figma-logo-track" aria-label="Empresas que confiam na PontoVit">
      <div className="figma-logo-track-inner">
        {loopedLogos.map(([image, label], index) => <img key={`${image}-${index}`} src={`${asset}${image}`} alt={index < logos.length ? label : ""} aria-hidden={index >= logos.length ? true : undefined} />)}
      </div>
    </div>
  );
}

function LegacyLogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const logos = [
    ["raw-1.png", "Supermercado Paraná"],
    ["raw-4.png", "Vitória Humana"],
    ["raw-5.png", "Amas"],
    ["raw-10.png", "Metadados"],
  ] as const;

  const snapToNearestLogo = () => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (!items.length) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const index = items.reduce((closestIndex, item, itemIndex) => {
      const closestItem = items[closestIndex];
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const closestCenter = closestItem.offsetLeft + closestItem.offsetWidth / 2;
      return Math.abs(itemCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? itemIndex : closestIndex;
    }, 0);
    const scrollPaddingLeft = Number.parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: Math.max(0, items[index].offsetLeft - scrollPaddingLeft), behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      track.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove("is-dragging");
    if (drag.moved) snapToNearestLogo();
    dragRef.current = null;
  };

  return (
    <div ref={trackRef} className="figma-logo-track" aria-label="Empresas que confiam na PontoVit" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
      {logos.map(([image, label]) => <img key={image} src={`${asset}${image}`} alt={label} />)}
    </div>
  );
}

function BlogPreviewCarouselV2() {
  const posts = blogPosts.slice(0, 3);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; currentX: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const goTo = (index: number) => setActiveIndex(Math.max(0, Math.min(posts.length - 1, index)));

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, currentX: event.clientX, moved: false };
    trackRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.currentX = event.clientX;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      setDragOffset(distance);
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = drag.currentX - drag.startX;
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 450);
      if (Math.abs(distance) > 42) goTo(activeIndex + (distance < 0 ? 1 : -1));
    }
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    setDragOffset(0);
    dragRef.current = null;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div className="figma-blog-preview-carousel">
      <div
        ref={trackRef}
        className="figma-blog-preview-grid"
        aria-label="Posts recentes do blog"
        style={{ transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 10}px + ${dragOffset}px))`, transition: dragOffset === 0 ? "transform .45s cubic-bezier(.22,1,.36,1)" : "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClick={handleClick}
      >
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className="figma-blog-preview-card">
            {post.image && <div className="figma-blog-preview-image"><Image src={post.image} alt="" width={640} height={360} /></div>}
            <div className="figma-blog-preview-meta"><span>{post.category}</span><time dateTime={post.date}>{formatPostDate(post.date)}</time></div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="figma-blog-preview-read">Ler artigo <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
      <div className="figma-blog-preview-controls" aria-label="Navegação dos posts">
        <div className="figma-blog-preview-dots">
          {posts.map((post, index) => <button key={post.slug} type="button" className={index === activeIndex ? "is-active" : ""} aria-label={`Ir para o post ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => goTo(index)} />)}
        </div>
      </div>
    </div>
  );
}

export function FigmaHome({ clientLogosFromCms = [], partnerLogosFromCms = [], ctaTarget }: { clientLogosFromCms?: readonly (readonly [string, string])[]; partnerLogosFromCms?: readonly (readonly [string, string])[]; ctaTarget?: string | null }) {
  const cmsClients = clientLogosFromCms.length ? clientLogosFromCms : clientLogos;
  const cmsPartners = partnerLogosFromCms.length ? partnerLogosFromCms : partnerLogos;
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoMuted, setVideoMuted] = useState(true);

  function toggleVideoSound() {
    const command = videoMuted ? "unMute" : "mute";
    videoRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "*");
    if (videoMuted) {
      videoRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "setVolume", args: [100] }), "*");
    }
    setVideoMuted(!videoMuted);
  }

  return (
    <CtaContext.Provider value={{ label: "Falar no Whatsapp", target: ctaTarget || getWhatsAppUrl() }}><main className="figma-home">
      <section className="figma-hero">
        <img className="figma-rosette rosette-left" src={`${asset}rosette-left.svg`} alt="" aria-hidden="true" />
        <img className="figma-rosette rosette-right" src={`${asset}rosette-right.svg`} alt="" aria-hidden="true" />
        <div className="figma-orbit" aria-hidden="true"><img src={`${asset}hero-icons.svg`} alt="" /></div>
        <div className="figma-hero-copy">
          <h1>Gestão de <em>escalas inteligente</em>, com registro de <em>ponto integrado</em></h1>
          <p>Com o PontoVit, você simplifica a gestão de escalas e, quando precisar, pode integrar o registro de ponto Stelanto para uma gestão ainda mais completa da jornada de trabalho.</p>
          <ArrowButton>Falar no Whatsapp</ArrowButton>
        </div>
      </section>

      <div className="figma-video-embed" aria-label="Vídeo de apresentação da PontoVit">
        <div className="figma-video-frame">
          <button type="button" className="figma-video-sound" onClick={toggleVideoSound} aria-pressed={!videoMuted} aria-label={videoMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.2 3a4.2 4.2 0 0 0-2.2-3.7v7.4a4.2 4.2 0 0 0 2.2-3.7Zm0-8.2v2.1a8 8 0 0 1 0 12.2v2.1a10 10 0 0 0 0-16.4Z" /></svg>
            <span>{videoMuted ? "Ativar som" : "Desativar som"}</span>
          </button>
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/NHp77G9FiZQ?si=n6WaBjx5YT2DDxaA&autoplay=1&mute=1&playsinline=1&rel=0&vq=hd1080&controls=1&modestbranding=1&fs=1&enablejsapi=1&cc_load_policy=0&iv_load_policy=3"
            title="Conheça a PontoVit"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <section className="figma-problem">
        <div className="figma-problem-copy problem-left"><h2>Gerenciar jornadas não deveria dar tanto trabalho.</h2><p>Planilhas, ajustes manuais, trocas de turno, folgas, horas extras e regras trabalhistas tornam a rotina cada vez mais complexa conforme sua operação cresce.</p><span className="problem-arrow">→</span></div>
        <picture className="problem-device">
          <source media="(max-width: 720px)" srcSet={`${asset}mobile/problem-monitor.png`} />
          <img src={`${asset}problem-raw-2.png`} alt="Mockup do sistema PontoVit" />
        </picture>
        <div className="figma-problem-copy problem-right"><h2>A PontoVit coloca tudo isso em ordem.</h2><p>Centralize a gestão da sua equipe e tenha mais clareza para planejar, ajustar e acompanhar cada jornada.</p></div>
      </section>

      <section className="figma-benefits">
        <SectionTitle title={<>Menos tempo montando escalas.<br /><strong>Mais tempo gerenciando sua operação.</strong></>} />
        <BenefitsCarousel />
      </section>

      <section className="figma-product">
        <div className="figma-product-copy"><SectionTitle title={<><span className="product-title-desktop">Uma escala que considera<br /><strong>muito mais do que horários.</strong></span><span className="product-title-mobile">Uma escala que<br /><strong>considera mais do<br />que horários.</strong></span></>} /><p>A PontoVit ajuda sua empresa a planejar jornadas considerando as necessidades da operação, disponibilidade das equipes e regras definidas para cada escala.</p><ArrowButton mobileChildren="Falar no Whatsapp">Conhecer a plataforma</ArrowButton></div>
        <picture className="product-device">
          <source media="(max-width: 720px)" srcSet={`${asset}mobile/product-monitor.png`} />
          <img src={`${asset}raw-16.png`} alt="Sistema PontoVit em um notebook" />
        </picture>
      </section>

      <section className="figma-resources"><SectionTitle title={<>Gerêncie sua equipe<br /><strong>sem complicar a rotina.</strong></>} /><div className="figma-resource-grid">{resources.map(([title, text, image, mobileImage]) => <article key={title}><div className="resource-image"><picture><source media="(max-width: 720px)" srcSet={`${asset}${mobileImage}`} /><img src={`${asset}${image}`} alt="" /></picture></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="figma-scale" aria-labelledby="scale-title">
        <div className="figma-scale-art">
          <picture>
            <source media="(max-width: 720px)" srcSet={`${asset}mobile/scale-laptop.png`} />
            <img src={`${asset}raw-2.png`} alt="Notebook com a grade de escalas PontoVit" />
          </picture>
        </div>
        <div className="figma-scale-copy">
          <h2 id="scale-title">Da jornada mais<br />simples à operação<br />mais complexa.</h2>
          <p><strong>5x2. 6x1. 12x36.</strong> Turnos alternados. Folgas. Equipes diferentes em unidades diferentes.</p>
          <ArrowButton />
        </div>
      </section>

      <section className="figma-partners">
        <div className="figma-partners-block is-accent">
          <div className="figma-partners-label"><span>Parceiros</span><p>Organizações que caminham ao lado da PontoVit todos os dias.</p></div>
          <PartnerCarousel logos={cmsPartners} />
        </div>
      </section>

      <section className="figma-client-strip" aria-label="Clientes da PontoVit">
        <div className="figma-logos">
          <div className="figma-client-strip-label">
            <span>Clientes</span>
            <p>Empresas que confiam na PontoVit para manter a operação em movimento.</p>
          </div>
          <LogoCarousel logos={cmsClients} />
        </div>
      </section>

      <section className="figma-testimonials" aria-labelledby="testimonials-title">
        <div className="figma-testimonial-intro">
          <p className="figma-eyebrow">Depoimentos</p>
          <h2 id="testimonials-title">Empresas que colocaram<br />suas jornadas em ordem<br />com a PontoVit.</h2>
          <div className="figma-stars" aria-label="5 estrelas">★★★★★</div>
        </div>
        <TestimonialsCarousel />
      </section>

      <section className="figma-blog-preview" aria-labelledby="blog-preview-title">
        <div className="figma-blog-preview-heading">
          <div>
            <p className="figma-eyebrow">Conteúdos para sua operação</p>
            <h2 id="blog-preview-title">Informação para tomar decisões melhores.</h2>
          </div>
          <Link href="/blog/" className="figma-blog-preview-link">Ver todos os posts <span aria-hidden="true">↗</span></Link>
        </div>

        <BlogPreviewCarouselV2 />
      </section>

    </main></CtaContext.Provider>
  );
}
