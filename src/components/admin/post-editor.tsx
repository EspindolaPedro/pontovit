"use client";

import { useEffect, useMemo, useState } from "react";
import { RichTextEditor } from "./rich-text-editor";

type Category = { id: string; name: string; slug?: string };
type Media = { id: string; filename: string; altText: string; mimeType?: string; byteSize?: number };
type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  categoryIds: string[];
  coverMediaId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  seoNoIndex: boolean;
};

const empty: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: { type: "doc", content: [{ type: "paragraph" }] },
  categoryIds: [],
  coverMediaId: "",
  status: "DRAFT",
  seoTitle: "",
  seoDescription: "",
  seoCanonical: "",
  seoNoIndex: false,
};

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function PostEditor({ id }: { id?: string }) {
  const [form, setForm] = useState<FormState>(empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [categoryResponse, mediaResponse, postResponse] = await Promise.all([
          fetch("/api/admin/categories"),
          fetch("/api/admin/media"),
          id ? fetch(`/api/admin/posts/${id}`) : Promise.resolve(null),
        ]);
        const categoryResult = await categoryResponse.json();
        const mediaResult = await mediaResponse.json();
        const postResult = postResponse ? await postResponse.json() : null;
        if (!categoryResponse.ok || !mediaResponse.ok || (postResponse && !postResponse.ok)) throw new Error("Não foi possível carregar os dados do editor.");
        if (!active) return;
        setCategories(categoryResult.data ?? []);
        setMedia(mediaResult.data ?? []);
        if (postResult?.data) {
          const post = postResult.data;
          setForm({
            ...empty,
            ...post,
            categoryIds: post.categories.map((item: { categoryId: string }) => item.categoryId),
            coverMediaId: post.coverMediaId ?? "",
            seoTitle: post.seoTitle ?? "",
            seoDescription: post.seoDescription ?? "",
            seoCanonical: post.seoCanonical ?? "",
          });
        }
      } catch (reason) {
        if (active) setError(reason instanceof Error ? reason.message : "Não foi possível carregar os dados do editor.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => { active = false; };
  }, [id]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const cover = useMemo(() => media.find((item) => item.id === form.coverMediaId), [form.coverMediaId, media]);

  async function uploadCover(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("altText", form.title || file.name);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar a imagem.");
      setMedia((current) => [result.data, ...current]);
      update("coverMediaId", result.data.id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível enviar a imagem.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function createCategory() {
    if (!newCategoryName.trim()) return;
    setError("");
    const response = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newCategoryName, slug: newCategoryName }) });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || "Não foi possível criar a categoria.");
      return;
    }
    setCategories((current) => [...current, result.data].sort((left, right) => left.name.localeCompare(right.name)));
    update("categoryIds", [result.data.id]);
    setNewCategoryName("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    const response = await fetch(id ? `/api/admin/posts/${id}` : "/api/admin/posts", {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug: form.slug || slugify(form.title), coverMediaId: form.coverMediaId || null, seoCanonical: form.seoCanonical || undefined }),
    });
    const result = await response.json();
    if (!response.ok) setError(result.message || "Não foi possível salvar o post.");
    else {
      setMessage("Post salvo com sucesso.");
      if (!id && result.data?.id) window.history.replaceState({}, "", `/admin/posts/${result.data.id}`);
    }
    setSaving(false);
  }

  if (loading) return <div className="pv-post-editor-loading">Carregando editor...</div>;

  return (
    <form id="post-editor" className="pv-post-form" onSubmit={submit}>
      <div className="pv-post-form-actions">
        <div><span className="pv-admin-eyebrow">Conteúdo editorial</span><strong>{id ? "Editando este post" : "Pronto para publicar"}</strong></div>
        <button className="pv-admin-primary-action" disabled={saving}>{saving ? "Salvando..." : "Salvar post"}</button>
      </div>

      {message ? <p className="pv-admin-success">{message}</p> : null}
      {error ? <p className="pv-admin-error">{error}</p> : null}

      <section className="pv-post-panel pv-post-cover-panel">
        <div className="pv-post-panel-heading"><div><span className="pv-post-section-number">01</span><h3>Imagem de capa</h3><p>Escolha uma imagem para abrir o artigo com presença visual.</p></div><span className="pv-post-panel-label">Preview</span></div>
        <div className="pv-post-cover-layout">
          <div className="pv-post-cover-preview">
            {cover ? <img src={`/api/media/${cover.id}`} alt={cover.altText} /> : <div className="pv-post-cover-placeholder"><span>+</span><strong>Nenhuma capa selecionada</strong><small>JPG, PNG ou WebP até 5 MB</small></div>}
          </div>
          <div className="pv-post-cover-controls">
            <label className="pv-post-field"><span>Usar imagem da biblioteca</span><select value={form.coverMediaId} onChange={(event) => update("coverMediaId", event.target.value)}><option value="">Sem imagem</option>{media.map((item) => <option key={item.id} value={item.id}>{item.filename}</option>)}</select></label>
            <label className="pv-post-upload-button"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadCover} disabled={uploading} /><span>{uploading ? "Enviando imagem..." : "Enviar nova imagem"}</span><b>↑</b></label>
            <small className="pv-post-help">A imagem enviada fica disponível também na biblioteca de mídia.</small>
          </div>
        </div>
      </section>

      <section className="pv-post-panel">
        <div className="pv-post-panel-heading"><div><span className="pv-post-section-number">02</span><h3>Informações do post</h3><p>Defina o título, endereço e organização do conteúdo.</p></div></div>
        <div className="pv-post-fields-grid">
          <label className="pv-post-field pv-post-field-wide"><span>Título do post</span><input value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Ex.: Como organizar uma escala eficiente" required /></label>
          <label className="pv-post-field"><span>Slug</span><input value={form.slug} onChange={(event) => update("slug", event.target.value)} placeholder={slugify(form.title) || "endereco-do-post"} /><small>Gerado automaticamente se ficar vazio.</small></label>
          <label className="pv-post-field"><span>Status</span><select value={form.status} onChange={(event) => update("status", event.target.value as FormState["status"])}><option value="DRAFT">Rascunho</option><option value="PUBLISHED">Publicado</option><option value="ARCHIVED">Arquivado</option></select></label>
          <label className="pv-post-field pv-post-field-wide"><span>Resumo</span><textarea rows={3} value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} placeholder="Uma descrição curta para o blog e para os resultados de busca." /></label>
          <div className="pv-post-field pv-post-field-wide"><span>Categoria principal</span><select value={form.categoryIds[0] ?? ""} onChange={(event) => update("categoryIds", event.target.value ? [event.target.value] : [])}><option value="">Selecione uma categoria</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><div className="pv-post-category-create"><input value={newCategoryName} onChange={(event) => setNewCategoryName(event.target.value)} placeholder="Nova categoria" /><button type="button" onClick={() => void createCategory()}>Adicionar</button></div></div>
        </div>
      </section>

      <section className="pv-post-panel pv-post-content-panel">
        <div className="pv-post-panel-heading"><div><span className="pv-post-section-number">03</span><h3>Conteúdo</h3><p>Escreva com uma área ampla e ferramentas simples de formatação.</p></div><span className="pv-post-panel-label">Rich text</span></div>
        <RichTextEditor value={form.content} onChange={(value) => update("content", value)} />
      </section>

      <section className="pv-post-panel pv-post-seo-panel">
        <div className="pv-post-panel-heading"><div><span className="pv-post-section-number">04</span><h3>SEO e indexação</h3><p>Personalize como esse conteúdo será apresentado nos buscadores.</p></div></div>
        <div className="pv-post-fields-grid">
          <label className="pv-post-field"><span>SEO title</span><input value={form.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} placeholder={form.title || "Título para o Google"} /></label>
          <label className="pv-post-field"><span>URL canônica</span><input type="url" value={form.seoCanonical} onChange={(event) => update("seoCanonical", event.target.value)} placeholder="https://pontovit.com.br/blog/..." /></label>
          <label className="pv-post-field pv-post-field-wide"><span>SEO description</span><textarea rows={3} value={form.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} placeholder="Descrição de até 320 caracteres para os resultados de busca." /></label>
          <label className="pv-post-checkbox"><input type="checkbox" checked={form.seoNoIndex} onChange={(event) => update("seoNoIndex", event.target.checked)} /><span><strong>Não indexar este post</strong><small>Use apenas para conteúdos internos ou temporários.</small></span></label>
        </div>
      </section>

      <div className="pv-post-bottom-actions"><span>Revise o conteúdo antes de publicar.</span><button className="pv-admin-primary-action" disabled={saving}>{saving ? "Salvando..." : "Salvar post"}</button></div>
    </form>
  );
}
