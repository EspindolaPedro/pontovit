"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RichTextEditor } from "./rich-text-editor";

type Category = { id: string; name: string };
type Media = { id: string; filename: string; altText: string };
type FormState = { title: string; slug: string; excerpt: string; content: unknown; categoryIds: string[]; coverMediaId: string; status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; seoTitle: string; seoDescription: string; seoCanonical: string; seoNoIndex: boolean };

const empty: FormState = { title: "", slug: "", excerpt: "", content: { type: "doc", content: [{ type: "paragraph" }] }, categoryIds: [], coverMediaId: "", status: "DRAFT", seoTitle: "", seoDescription: "", seoCanonical: "", seoNoIndex: false };

function slugify(value: string) { return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }

export function PostEditor({ id }: { id?: string }) {
  const [form, setForm] = useState<FormState>(empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/categories").then((response) => response.json()),
      fetch("/api/admin/media").then((response) => response.json()),
      id ? fetch(`/api/admin/posts/${id}`).then((response) => response.json()) : Promise.resolve(null),
    ]).then(([categoryResult, mediaResult, postResult]) => {
      setCategories(categoryResult.data ?? []);
      setMedia(mediaResult.data ?? []);
      if (postResult?.data) {
        const post = postResult.data;
        setForm({ ...empty, ...post, categoryIds: post.categories.map((item: { categoryId: string }) => item.categoryId), coverMediaId: post.coverMediaId ?? "", seoTitle: post.seoTitle ?? "", seoDescription: post.seoDescription ?? "", seoCanonical: post.seoCanonical ?? "" });
      }
    }).catch(() => setError("Não foi possível carregar os dados do editor."));
  }, [id]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) { setForm((current) => ({ ...current, [key]: value })); }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage(""); setError("");
    const response = await fetch(id ? `/api/admin/posts/${id}` : "/api/admin/posts", { method: id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, slug: form.slug || slugify(form.title), coverMediaId: form.coverMediaId || null, seoCanonical: form.seoCanonical || undefined }) });
    const result = await response.json();
    if (!response.ok) setError(result.message || "Não foi possível salvar o post.");
    else { setMessage("Post salvo com sucesso."); if (!id && result.data?.id) window.history.replaceState({}, "", `/admin/posts/${result.data.id}`); }
    setSaving(false);
  }

  return (
    <main className="pv-admin-subpage pv-admin-editor-page">
      <header className="pv-admin-subpage-header"><div><Link className="pv-admin-back" href="/admin/posts">← Voltar para posts</Link><p className="pv-admin-eyebrow">Editor editorial</p><h1>{id ? "Editar post" : "Novo post"}</h1></div><button className="pv-admin-primary-action" form="post-editor" disabled={saving}>{saving ? "Salvando..." : "Salvar post"} <b>↗</b></button></header>
      {message ? <p className="pv-admin-success">{message}</p> : null}{error ? <p className="pv-admin-error">{error}</p> : null}
      <form id="post-editor" className="pv-admin-editor-grid" onSubmit={submit}>
        <section className="pv-admin-editor-main">
          <label>Título<input value={form.title} onChange={(event) => update("title", event.target.value)} required /></label>
          <label>Slug<input value={form.slug} onChange={(event) => update("slug", event.target.value)} placeholder={slugify(form.title)} /></label>
          <label>Resumo<textarea rows={3} value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} /></label>
          <label>Conteúdo<RichTextEditor value={form.content} onChange={(value) => update("content", value)} /></label>
        </section>
        <aside className="pv-admin-editor-side">
          <label>Status<select value={form.status} onChange={(event) => update("status", event.target.value as FormState["status"])}><option value="DRAFT">Rascunho</option><option value="PUBLISHED">Publicado</option><option value="ARCHIVED">Arquivado</option></select></label>
          <fieldset><legend>Categorias</legend>{categories.map((category) => <label className="pv-admin-check" key={category.id}><input type="checkbox" checked={form.categoryIds.includes(category.id)} onChange={(event) => update("categoryIds", event.target.checked ? [...form.categoryIds, category.id] : form.categoryIds.filter((idValue) => idValue !== category.id))} />{category.name}</label>)}</fieldset>
          <label>Imagem de capa<select value={form.coverMediaId} onChange={(event) => update("coverMediaId", event.target.value)}><option value="">Sem imagem</option>{media.map((item) => <option key={item.id} value={item.id}>{item.filename}</option>)}</select></label>
          <div className="pv-admin-seo-box"><p className="pv-admin-eyebrow">SEO</p><label>Title<input value={form.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} /></label><label>Description<textarea rows={3} value={form.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} /></label><label className="pv-admin-check"><input type="checkbox" checked={form.seoNoIndex} onChange={(event) => update("seoNoIndex", event.target.checked)} /> Não indexar</label></div>
        </aside>
      </form>
    </main>
  );
}
