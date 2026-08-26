"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminIcon } from "@/components/admin/admin-icons";

type Media = { id: string; filename: string };
type Logo = { id: string; name: string; group: string; altText: string; media: { id: string } };

export default function BrandPage() {
  const [logos, setLogos] = useState<Logo[]>([]); const [media, setMedia] = useState<Media[]>([]); const [form, setForm] = useState({ group: "PARTNER", name: "", altText: "", mediaId: "" }); const [open, setOpen] = useState(false); const [error, setError] = useState(""); const [uploading, setUploading] = useState(false);
  function load() { Promise.all([fetch("/api/admin/brand-logos").then((r) => r.json()), fetch("/api/admin/media").then((r) => r.json())]).then(([a, b]) => { setLogos(a.data ?? []); setMedia(b.data ?? []); }); }
  useEffect(load, []);
  async function create(event: React.FormEvent) { event.preventDefault(); setError(""); const response = await fetch("/api/admin/brand-logos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, sortOrder: logos.length, isVisible: true }) }); const result = await response.json(); if (!response.ok) setError(result.message); else { setForm({ group: "PARTNER", name: "", altText: "", mediaId: "" }); setOpen(false); load(); } }
  async function remove(id: string) { await fetch(`/api/admin/brand-logos/${id}`, { method: "DELETE" }); load(); }
  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("altText", form.altText || form.name || file.name);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar a imagem.");
      setMedia((current) => [result.data, ...current]);
      setForm((current) => ({ ...current, mediaId: result.data.id }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível enviar a imagem.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }
  return <main className="pv-admin-subpage">
    <header className="pv-admin-subpage-header"><div><Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link><p className="pv-admin-eyebrow">Marca</p><h1>Clientes e parceiros</h1><span>Controle as logos exibidas nas seções públicas sem editar código.</span></div><button className="pv-admin-primary-action" onClick={() => { setError(""); setOpen(true); }}><AdminIcon name="plus" />Adicionar logo</button></header>
    {error ? <p className="pv-admin-error">{error}</p> : null}
    <div className="pv-admin-table-wrap"><table className="pv-admin-table"><thead><tr><th>Logo</th><th>Nome</th><th>Área</th><th /></tr></thead><tbody>{logos.map((logo) => <tr key={logo.id}><td><img className="pv-admin-table-thumb" src={`/api/media/${logo.media.id}`} alt={logo.altText} /></td><td><strong>{logo.name}</strong></td><td>{logo.group === "CLIENT" ? "Cliente" : "Parceiro"}</td><td><button className="pv-admin-delete" onClick={() => remove(logo.id)}>Remover</button></td></tr>)}</tbody></table>{!logos.length ? <p className="pv-admin-empty">Nenhuma logo cadastrada.</p> : null}</div>
    <AdminModal open={open} title="Adicionar logo" description="Associe uma imagem a uma das áreas públicas da marca." onClose={() => setOpen(false)}>
      <form className="pv-admin-brand-form" onSubmit={create}>
        <label className="pv-admin-modal-field">Área<select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}><option value="PARTNER">Parceiro</option><option value="CLIENT">Cliente</option></select></label>
        <label className="pv-admin-modal-field">Nome da marca<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome da marca" required /></label>
        <label className="pv-admin-modal-field">Texto alternativo<input value={form.altText} onChange={(e) => setForm({ ...form, altText: e.target.value })} placeholder="Logo da empresa" required /></label>
        <div className="pv-admin-modal-field pv-admin-modal-field-wide">
          <span>Logo</span>
          <div className="pv-post-cover-layout">
            <div className="pv-post-cover-preview">
              {form.mediaId ? <img src={`/api/media/${form.mediaId}`} alt="Pré-visualização da logo" /> : <div className="pv-post-cover-placeholder"><span>+</span><strong>Nenhuma imagem selecionada</strong><small>JPG, PNG ou WebP até 5 MB</small></div>}
            </div>
            <div className="pv-post-cover-controls">
              <label className="pv-post-upload-button"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadFile} disabled={uploading} /><span>{uploading ? "Enviando imagem..." : "Enviar nova imagem"}</span><AdminIcon name="upload" /></label>
              <select value={form.mediaId} onChange={(e) => setForm({ ...form, mediaId: e.target.value })}><option value="">Ou selecione da biblioteca</option>{media.map((item) => <option key={item.id} value={item.id}>{item.filename}</option>)}</select>
            </div>
          </div>
        </div>
        <button className="pv-admin-primary-action" disabled={!form.mediaId}><AdminIcon name="plus" />Salvar logo</button>
      </form>
    </AdminModal>
  </main>;
}
