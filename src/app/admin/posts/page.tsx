"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = { id: string; title: string; slug: string; status: string; updatedAt: string; author: { name: string } };
type Result = { items: Post[]; pagination: { page: number; totalPages: number; total: number } };

export default function AdminPostsPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/posts?page=${page}&q=${encodeURIComponent(query)}`)
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.message); return data; })
      .then(setResult).catch((reason) => setError(reason instanceof Error ? reason.message : "Não foi possível carregar os posts."));
  }, [page, query]);

  async function remove(id: string) {
    if (!window.confirm("Excluir este post?")) return;
    const response = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (response.ok) setResult((current) => current ? { ...current, items: current.items.filter((post) => post.id !== id) } : current);
  }

  return (
    <main className="pv-admin-subpage">
      <header className="pv-admin-subpage-header"><div><p className="pv-admin-eyebrow">Conteúdo</p><h1>Posts e categorias</h1><span>Gerencie os artigos que aparecem no blog público.</span></div><Link className="pv-admin-primary-action" href="/admin/posts/new">Novo post <b>↗</b></Link></header>
      <div className="pv-admin-toolbar"><input value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} placeholder="Buscar por título ou slug..." /><Link href="/admin/categories">Gerenciar categorias</Link></div>
      {error ? <p className="pv-admin-error">{error}</p> : null}
      <div className="pv-admin-table-wrap"><table className="pv-admin-table"><thead><tr><th>Post</th><th>Status</th><th>Autor</th><th>Atualizado</th><th /></tr></thead><tbody>{result?.items.map((post) => <tr key={post.id}><td><Link href={`/admin/posts/${post.id}`}><strong>{post.title}</strong><small>/{post.slug}</small></Link></td><td><span className={`pv-admin-status is-${post.status.toLowerCase()}`}>{post.status}</span></td><td>{post.author.name}</td><td>{new Date(post.updatedAt).toLocaleDateString("pt-BR")}</td><td><button className="pv-admin-delete" onClick={() => remove(post.id)}>Excluir</button></td></tr>)}</tbody></table>{!result?.items.length && !error ? <p className="pv-admin-empty">Nenhum post encontrado.</p> : null}</div>
      {result && result.pagination.totalPages > 1 ? <div className="pv-admin-pagination"><button disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Anterior</button><span>{page} de {result.pagination.totalPages}</span><button disabled={page === result.pagination.totalPages} onClick={() => setPage((current) => current + 1)}>Próxima</button></div> : null}
    </main>
  );
}
