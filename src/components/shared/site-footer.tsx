import Link from "next/link";
import type { ComponentType } from "react";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/shared/logo";
import { ArrowUpRightIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/shared/icons";

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
      <span className="pv-footer-orb pv-footer-orb-1" aria-hidden="true" />
      <span className="pv-footer-orb pv-footer-orb-2" aria-hidden="true" />
      <div className="pv-footer-inner">
        <div className="pv-footer-cta">
          <span className="pv-footer-cta-orb" aria-hidden="true" />
          <div>
            <p className="pv-footer-eyebrow">PontoVit</p>
            <h2>Mais controle para quem planeja.</h2>
            <p>Mais simplicidade para quem opera.</p>
          </div>
          <Link href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="pv-footer-cta-button">
            Solicitar demonstração <ArrowUpRightIcon size={20} />
          </Link>
        </div>

        <div className="pv-footer-top">
          <div className="pv-footer-brand">
            <Logo />
            <p>Gestão de escalas, jornadas e equipes em um único sistema.</p>
            <div className="pv-footer-contact">
              <a href={`mailto:${siteConfig.email}`}><MailIcon size={16} /> {siteConfig.email}</a>
              <a href="tel:+556730257957"><PhoneIcon size={16} /> +55 (67) 3025-7957</a>
              <span><MapPinIcon size={16} /> Campo Grande · Porto Alegre</span>
            </div>
            <div className="pv-footer-socials" aria-label="Redes sociais">
              {socialLinks.map(([label, Icon, href]) => href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="pv-social-link" aria-label={label}>
                  <Icon size={20} />
                </a>
              ) : (
                <span key={label} className="pv-social-link is-placeholder" title={`${label}: link será configurado`} aria-label={`${label}: link será configurado`}>
                  <Icon size={20} />
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
          <a href="https://www.instagram.com/eupedroespindola" target="_blank" rel="noreferrer" className="pv-footer-credit">Desenvolvido por @eupedroespindola</a>
        </div>
      </div>
    </footer>
  );
}
