import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth/session";
import { AdminIcon, type AdminIconName } from "@/components/admin/admin-icons";

const modules = [
  ["Conteúdo", "Posts, categorias, mídia e SEO", "/admin/posts"],
  ["Marca", "Logos, redes sociais e CTAs", "/admin/brand"],
  ["Site", "Dados públicos e códigos de integração", "/admin/settings"],
  ["Acesso", "Usuários, permissões e API keys", "/admin/users"],
];

const moduleIcons: Record<string, AdminIconName> = {
  "/admin/posts": "content",
  "/admin/brand": "brand",
  "/admin/settings": "settings",
  "/admin/users": "access",
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <main className="pv-admin-dashboard">
      <div className="pv-admin-intro"><p>Visão geral</p><h2>Gerencie o conteúdo do site.</h2><span>Escolha um módulo para começar a editar os dados que alimentam a experiência pública.</span></div>
      <div className="pv-admin-module-grid">
        {modules.map(([title, description, href], index) => (
          <a href={href} className="pv-admin-module" key={title}>
            <small>0{index + 1}</small>
            <span className="pv-admin-module-icon"><AdminIcon name={moduleIcons[href]} /></span>
            <h3>{title}</h3>
            <p>{description}</p>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </main>
  );
}
