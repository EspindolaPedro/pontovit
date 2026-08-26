"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminIcon, type AdminIconName } from "./admin-icons";

type AdminUser = { name: string; email: string };

const navigation = [
  ["Visão geral", "/admin"],
  ["Posts e categorias", "/admin/posts"],
  ["Mídia", "/admin/media"],
  ["Marcas e parceiros", "/admin/brand"],
  ["Configurações", "/admin/settings"],
  ["Usuários e API", "/admin/users"],
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function iconForAdminPath(href: string): AdminIconName {
  if (href === "/admin") return "overview";
  if (href === "/admin/posts") return "content";
  if (href === "/admin/media") return "media";
  if (href === "/admin/brand") return "brand";
  if (href === "/admin/settings") return "settings";
  return "access";
}

export function AdminFrame({ user, children }: { user: AdminUser | null; children: React.ReactNode }) {
  const pathname = usePathname();

  // A tela de login é a única página administrativa sem a navegação interna.
  if (!pathname.startsWith("/admin") || pathname === "/admin/login" || !user) return <>{children}</>;

  return (
    <div className="pv-admin-shell">
      <aside className="pv-admin-sidebar">
        <Link className="pv-admin-brand" href="/admin" aria-label="PontoVit CMS, visão geral">
          <img src="/assets/product/pontovit-logo.png" alt="PontoVit" />
          <small>CMS</small>
        </Link>
        <nav aria-label="Navegação do CMS">
          {navigation.map(([label, href]) => (
            <Link key={href} className={isActivePath(pathname, href) ? "is-active" : ""} href={href}>
              <AdminIcon name={iconForAdminPath(href)} className="pv-admin-nav-icon" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <p className="pv-admin-sidebar-footer">Conteúdo seguro e validado no servidor.</p>
      </aside>
      <section className="pv-admin-content">
        <header className="pv-admin-header">
          <div><p className="pv-admin-eyebrow">CMS PontoVit</p><h1>Olá, {user.name.split(" ")[0]}.</h1></div>
          <div className="pv-admin-user"><span>{user.email}</span><form action="/api/admin/auth/logout" method="post"><button>Sair</button></form></div>
        </header>
        {children}
      </section>
    </div>
  );
}
