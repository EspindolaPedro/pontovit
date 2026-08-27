import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { SiteChrome } from "@/components/shared/site-chrome";
import { AdminFrame } from "@/components/admin/admin-frame";
import { siteConfig } from "@/config/site";
import { seoKeywords } from "@/lib/seo";
import { getCurrentUser } from "@/server/auth/session";
import { getPublicSettings } from "@/server/modules/settings/settings.service";
import { getPublicCodeInjections } from "@/server/modules/settings/code.service";
import { CodeInjectionLocation } from "@prisma/client";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSettings();
  const title = settings.site?.defaultSeoTitle || "PontoVit | Gestão de Escalas de Trabalho";
  const description = settings.site?.defaultSeoDescription || settings.site?.description || siteConfig.description;
  return {
    metadataBase: new URL(siteConfig.url), title: { default: title, template: "%s | PontoVit" }, description, keywords: seoKeywords,
    authors: [{ name: settings.site?.companyName || "PontoVit" }], creator: "PontoVit", publisher: "PontoVit", alternates: { canonical: "/" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: "PontoVit", title, description }, twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const runtimeSettings = await getPublicSettings();
  const currentUser = await getCurrentUser();
  const [headerCode, footerCode] = await Promise.all([getPublicCodeInjections(CodeInjectionLocation.HEADER), getPublicCodeInjections(CodeInjectionLocation.FOOTER)]);
  const organizationJsonLd = { "@context": "https://schema.org", "@type": "Organization", name: runtimeSettings.site?.companyName || siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/assets/product/pontovit-logo.png`, email: runtimeSettings.site?.email || siteConfig.email, description: runtimeSettings.site?.description || siteConfig.description };
  const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: runtimeSettings.site?.companyName || siteConfig.name, url: siteConfig.url, inLanguage: "pt-BR", publisher: { "@type": "Organization", name: runtimeSettings.site?.companyName || siteConfig.name, url: siteConfig.url } };
  return <html lang="pt-BR"><head><Script id="gtm-script" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WFFR273T');`}</Script></head><body className={`${inter.variable} ${manrope.variable} font-sans`}><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFFR273T" height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} /><Script id="chatwoot-widget" strategy="afterInteractive">{`(function(d,t) {
    var BASE_URL="https://chatwoot.vitoriahumana.com.br";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({ websiteToken: 'KMFc1nEDrcH8igRBGgihM3n', baseUrl: BASE_URL })
    }
  })(document,"script");`}</Script><SiteChrome settings={runtimeSettings} headerCode={headerCode} footerCode={footerCode}><AdminFrame user={currentUser ? { name: currentUser.name, email: currentUser.email } : null}>{children}</AdminFrame></SiteChrome></body></html>;
}
