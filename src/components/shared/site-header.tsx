"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type MenuItem = { label: string; href: string };
const productItems: MenuItem[] = [{ label: "Como funciona", href: "/escalas-de-trabalho/#conteudo" }, { label: "Tipos de escala", href: "/escalas-de-trabalho/#tipos-de-escala" }, { label: "Vantagens", href: "/escalas-de-trabalho/#recursos" }];
const aboutItems: MenuItem[] = [{ label: "Nossa história", href: "/quem-somos/#conteudo" }, { label: "Público-alvo e propósito", href: "/quem-somos/#publico-alvo" }];

function Chevron() { return <svg className="site-header-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>; }
function ArrowIcon() { return <svg className="site-header-item-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 9.5 9 3" /><path d="M4.5 3H9v4.5" /></svg>; }

function Dropdown({ label, href, items, active }: { label: string; href: string; items: MenuItem[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const close = (event: PointerEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  return <div ref={dropdownRef} className={`site-header-dropdown${open ? " is-open" : ""}`}><div className="site-header-dropdown-trigger"><Link href={href} className={`site-header-link${active ? " is-active" : ""}`}>{label}</Link><button type="button" className={`site-header-link site-header-dropdown-toggle${active || open ? " is-active" : ""}`} aria-label={`Abrir submenu de ${label}`} aria-haspopup="menu" aria-expanded={open} onFocus={() => setOpen(true)} onClick={() => setOpen((value) => !value)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}><Chevron /></button></div><div className="site-header-submenu"><div className="site-header-submenu-card" role="menu" aria-hidden={!open}>{items.map((item) => <Link key={item.href} href={item.href} role="menuitem" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{item.label}<ArrowIcon /></Link>)}</div></div></div>;
}

export function SiteHeader({ ctaLabel = "Falar no Whatsapp", ctaTarget, logoMediaId }: { ctaLabel?: string; ctaTarget?: string | null; logoMediaId?: string | null }) {
  const pathname = usePathname(); const [mobileOpen, setMobileOpen] = useState(false); const target = ctaTarget || getWhatsAppUrl();
  const productActive = pathname.startsWith("/escalas-de-trabalho"); const aboutActive = pathname.startsWith("/quem-somos"); const partnersActive = pathname.startsWith("/parceiros"); const blogActive = pathname.startsWith("/blog"); const contactActive = pathname.startsWith("/contato");
  return <header className={`site-header${mobileOpen ? " is-mobile-open" : ""}`}>
    <div className="site-header-left"><Link href="/" className="site-header-brand" aria-label="PontoVit, início" onClick={() => setMobileOpen(false)}><span className="site-header-logo-window"><img src={logoMediaId ? `/api/media/${logoMediaId}` : "/assets/product/pontovit-logo.png"} alt="PontoVit" /></span></Link><nav className="site-header-nav" aria-label="Navegação principal"><Link href="/" className={`site-header-link${pathname === "/" ? " is-active" : ""}`}>Home</Link><Dropdown label="Escalas de Trabalho" href="/escalas-de-trabalho/" items={productItems} active={productActive} /><Dropdown label="Quem Somos" href="/quem-somos/" items={aboutItems} active={aboutActive} /><Link href="/parceiros/" className={`site-header-link${partnersActive ? " is-active" : ""}`}>Parceiros</Link><Link href="/blog/" className={`site-header-link${blogActive ? " is-active" : ""}`}>Blog</Link><Link href="/contato-antigo/" className={`site-header-link${contactActive ? " is-active" : ""}`}>Contato</Link></nav></div>
    <Link href={target} target="_blank" rel="noreferrer" className="site-header-cta">{ctaLabel}</Link>
    <button type="button" className="site-header-toggle" aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><span /><span /><span /></button>
    <div className="site-header-mobile-panel"><Link href="/" onClick={() => setMobileOpen(false)}>Home</Link><details open={productActive}><summary><Link href="/escalas-de-trabalho/" onClick={() => setMobileOpen(false)}>Escalas de Trabalho</Link><Chevron /></summary><div>{productItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}</div></details><details open={aboutActive}><summary><Link href="/quem-somos/" onClick={() => setMobileOpen(false)}>Quem Somos</Link><Chevron /></summary><div>{aboutItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}</div></details><Link href="/parceiros/" onClick={() => setMobileOpen(false)}>Parceiros</Link><Link href="/blog/" onClick={() => setMobileOpen(false)}>Blog</Link><Link href="/contato-antigo/" onClick={() => setMobileOpen(false)}>Contato</Link><Link href={target} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>{ctaLabel} <ArrowIcon /></Link></div>
  </header>;
}
