"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminIcon } from "@/components/admin/admin-icons";

type Category = { id: string; name: string; slug: string; description?: string | null };

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]); const [name, setName] = useState(""); const [open, setOpen] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  function load() { fetch("/api/admin/categories").then((response) => response.json()).then((result) => setItems(result.data ?? [])).catch(() => setError("Não foi possível carregar as categorias.")); }
  useEffect(load, []);
  async function create(event: React.FormEvent) { event.preventDefault(); setError(""); const response = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, slug: name }) }); const result = await response.json(); if (!response.ok) setError(result.message); else { setName(""); setOpen(false); setMessage("Categoria criada."); load(); } }
  async function remove(id: string) { const response = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" }); const result = await response.json(); if (!response.ok) setError(result.message); else load(); }
  return <main className="pv-admin-subpage"><header className="pv-admin-subpage-header"><div><Link className="pv-admin-back" href="/admin/posts">← Voltar para posts</Link><p className="pv-admin-eyebrow">Conteúdo</p><h1>Categorias</h1><span>Organize os assuntos do blog com slugs estáveis para SEO.</span></div><button className="pv-admin-primary-action" onClick={() => { setError(""); setOpen(true); }}><AdminIcon name="plus" />Nova categoria</button></header>{message ? <p className="pv-admin-success">{message}</p> : null}{error ? <p className="pv-admin-error">{error}</p> : null}<div className="pv-admin-table-wrap"><table className="pv-admin-table"><thead><tr><th>Categoria</th><th>Slug</th><th /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>/{item.slug}</td><td><button className="pv-admin-delete" onClick={() => remove(item.id)}>Excluir</button></td></tr>)}</tbody></table>{!items.length && !error ? <p className="pv-admin-empty">Nenhuma categoria cadastrada.</p> : null}</div><AdminModal open={open} title="Nova categoria" description="Crie uma categoria para organizar os posts do blog." onClose={() => setOpen(false)}><form className="pv-admin-inline-form" onSubmit={create}><label className="pv-admin-modal-field">Nome da categoria<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Gestão de escalas" required /></label><button className="pv-admin-primary-action"><AdminIcon name="plus" />Criar categoria</button></form></AdminModal></main>;
}
