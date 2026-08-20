import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { siteConfig } from "@/config/site";
import { seoKeywords } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "PontoVit | Gestão de Escalas de Trabalho", template: "%s | PontoVit" },
  description: siteConfig.description,
  keywords: seoKeywords,
  authors: [{ name: "PontoVit" }],
  creator: "PontoVit",
  publisher: "PontoVit",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: "PontoVit", title: "PontoVit | Gestão de Escalas de Trabalho", description: siteConfig.description },
  twitter: { card: "summary_large_image", title: "PontoVit | Gestão de Escalas de Trabalho", description: siteConfig.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/assets/product/pontovit-logo.png`, email: siteConfig.email, description: siteConfig.description };
  const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, inLanguage: "pt-BR", publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url } };
  return <html lang="pt-BR"><body className={`${inter.variable} ${manrope.variable} font-sans`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} /><Script id="chatwoot-widget" strategy="afterInteractive">{`(function(d,t) {
    var BASE_URL="https://chatwoot.vitoriahumana.com.br";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: 'KMFc1nEDrcH8igRBGgihM3n',
        baseUrl: BASE_URL
      })
    }
  })(document,"script");`}</Script><SiteHeader />{children}<SiteFooter /></body></html>;
}
