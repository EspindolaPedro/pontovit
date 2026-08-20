import Link from "next/link";
import type { ComponentType } from "react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/shared/logo";
import { ArrowUpRightIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/shared/icons";

const footerGroups = [
  {
    title: "Produto",
    links: [
      ["Gestão de escalas", "/escalas-de-trabalho/"],
      ["Recursos da plataforma", "/escalas-de-trabalho/#recursos"],
      ["Falar com especialista", "/contato-antigo/"],
    ],
  },
  {
    title: "Empresa",
    links: [
      ["Quem somos", "/quem-somos/"],
      ["Nossa história", "/quem-somos/#conteudo"],
      ["Contato", "/contato-antigo/"],
    ],
  },
  {
    title: "Conteúdos",
    links: [
      ["Blog PontoVit", "/blog/"],
      ["Artigos e novidades", "/blog/#conteudo"],
    ],
  },
] as const;

type SocialIcon = ComponentType<{ size?: number; className?: string }>;

const socialLinks: ReadonlyArray<readonly [string, SocialIcon, string]> = [
  ["Instagram", InstagramIcon, siteConfig.socialLinks.instagram],
  ["LinkedIn", LinkedinIcon, siteConfig.socialLinks.linkedin],
  ["Facebook", FacebookIcon, siteConfig.socialLinks.facebook],
] as const;

export function SiteFooter() {
  return (
    <footer className="pv-footer">
      <div className="pv-footer-inner">
        <div className="pv-footer-cta">
          <div>
            <p className="pv-footer-eyebrow">PontoVit</p>
            <h2>Mais controle para quem planeja.</h2>
            <p>Mais simplicidade para quem opera.</p>
          </div>
          <Link href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="pv-footer-cta-button">
            Solicitar demo <ArrowUpRightIcon size={18} />
          </Link>
        </div>

        <div className="pv-footer-top">
          <div className="pv-footer-brand">
            <Logo />
            <p>Gestão de escalas, jornadas e equipes em um único sistema.</p>
            <div className="pv-footer-socials" aria-label="Redes sociais">
              {socialLinks.map(([label, Icon, href]) => href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="pv-social-link" aria-label={label}>
                  <Icon size={18} />
                </a>
              ) : (
                <span key={label} className="pv-social-link is-placeholder" title={`${label}: link será configurado`} aria-label={`${label}: link será configurado`}>
                  <Icon size={18} />
                </span>
              ))}
            </div>
          </div>

          <nav className="pv-footer-grid" aria-label="Links do rodapé">
            {footerGroups.map((group) => (
              <div key={group.title} className="pv-footer-group">
                <h3>{group.title}</h3>
                {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              </div>
            ))}
          </nav>
        </div>

        <div className="pv-footer-bottom">
          <span>© {new Date().getFullYear()} PontoVit. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
