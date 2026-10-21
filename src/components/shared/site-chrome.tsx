"use client";

import { usePathname } from "next/navigation";
import { LeadCaptureProvider } from "@/components/shared/lead-capture";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { normalizeCtaLabel } from "@/lib/whatsapp";

type ChromeSettings = {
  site?: {
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    description?: string | null;
    logoMediaId?: string | null;
  } | null;
  cta?: {
    headerLabel?: string | null;
    footerLabel?: string | null;
    target?: string | null;
  } | null;
  socials?: {
    platform: string;
    url: string;
    label: string;
    isVisible: boolean;
  }[];
};

type CodeItem = {
  id: string;
  html: string;
  css: string;
  javascript: string;
};

export function SiteChrome({ settings, headerCode, footerCode, children }: { settings: ChromeSettings; headerCode: CodeItem[]; footerCode: CodeItem[]; children: React.ReactNode }) {
  const pathname = usePathname();

  // O painel tem navegação e layout próprios. Nunca herda o chrome público.
  if (pathname.startsWith("/admin")) return <>{children}</>;

  // O cartão virtual (/magno) é uma mini-página standalone (link in bio), sem header/footer do site.
  if (pathname.startsWith("/magno")) return <>{children}</>;

  // A LP da escala 5x2 trava a navegação: o rodapé perde os links de menu.
  const isLockedLp = pathname === "/lp-escala-de-trabalho";

  const renderCode = (item: CodeItem) => (
    <span
      key={item.id}
      className="pv-cms-code"
      dangerouslySetInnerHTML={{
        __html: `${item.html}${item.css ? `<style>${item.css}</style>` : ""}${item.javascript ? `<script>${item.javascript}</script>` : ""}`,
      }}
    />
  );

  // Todo botão "Falar no Whatsapp" do site (header, rodapé, CTAs das páginas) passa
  // pelo mesmo formulário de lead antes do redirect — por isso o provider fica aqui,
  // uma vez só, cobrindo header + conteúdo + rodapé em qualquer página pública.
  return (
    <LeadCaptureProvider>
      {headerCode.map(renderCode)}
      <SiteHeader ctaLabel={normalizeCtaLabel(settings.cta?.headerLabel)} logoMediaId={settings.site?.logoMediaId} />
      {children}
      <SiteFooter settings={settings} locked={isLockedLp} />
      {footerCode.map(renderCode)}
    </LeadCaptureProvider>
  );
}
