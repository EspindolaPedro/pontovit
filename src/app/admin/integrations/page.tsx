"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminIcon } from "@/components/admin/admin-icons";

type Injection = { id: string; name: string; location: string; html: string; css: string; javascript: string; isEnabled: boolean; updatedAt: string };
type FormState = { name: string; location: "HEADER" | "FOOTER"; html: string; css: string; javascript: string; isEnabled: boolean };
const empty: FormState = { name: "", location: "HEADER", html: "", css: "", javascript: "", isEnabled: false };

export default function IntegrationsPage() {
  const [items, setItems] = useState<Injection[]>([]); const [form, setForm] = useState<FormState>(empty); const [editingId, setEditingId] = useState(""); const [open, setOpen] = useState(false); const [error, setError] = useState("");
  function load() { fetch("/api/admin/code-injections").then((r) => r.json()).then((result) => setItems(result.data ?? [])).catch(() => setError("Não foi possível carregar os snippets.")); }
  useEffect(load, []);
  function closeModal() { setOpen(false); setEditingId(""); setForm(empty); }
  async function save(event: React.FormEvent) { event.preventDefault(); setError(""); const response = await fetch(editingId ? `/api/admin/code-injections/${editingId}` : "/api/admin/code-injections", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const result = await response.json(); if (!response.ok) setError(result.message); else { closeModal(); load(); } }
  function edit(item: Injection) { setEditingId(item.id); setForm({ name: item.name, location: item.location as FormState["location"], html: item.html, css: item.css, javascript: item.javascript, isEnabled: item.isEnabled }); setOpen(true); }
  async function remove(id: string) { await fetch(`/api/admin/code-injections/${id}`, { method: "DELETE" }); load(); }
  return <main className="pv-admin-subpage">
    <header className="pv-admin-subpage-header"><div><Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link><p className="pv-admin-eyebrow">Integrações</p><h1>Header e footer</h1><span>Snippets controlados para integrações, pixels e customizações do site.</span></div><button className="pv-admin-primary-action" onClick={() => { setError(""); setOpen(true); }}><AdminIcon name="plus" />Novo snippet</button></header>
    {error ? <p className="pv-admin-error">{error}</p> : null}
    <div className="pv-admin-table-wrap"><table className="pv-admin-table"><thead><tr><th>Nome</th><th>Local</th><th>Status</th><th /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td>{item.location === "HEADER" ? "Header" : "Footer"}</td><td><span className={`pv-admin-status ${item.isEnabled ? "is-published" : "is-archived"}`}>{item.isEnabled ? "Ativo" : "Desativado"}</span></td><td className="pv-admin-table-actions"><button className="pv-admin-link-action" onClick={() => edit(item)}>Editar</button><button className="pv-admin-delete" onClick={() => remove(item.id)}>Remover</button></td></tr>)}</tbody></table>{!items.length ? <p className="pv-admin-empty">Nenhum snippet cadastrado.</p> : null}</div>
    <AdminModal open={open} title={editingId ? "Editar snippet" : "Novo snippet"} description="Adicione código de integração sem poluir a tela principal." onClose={closeModal} size="wide">
      <form className="pv-admin-injection-form" onSubmit={save}>
        <label className="pv-admin-modal-field">Nome<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Google Analytics" required /></label>
        <label className="pv-admin-modal-field">Local<select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value as FormState["location"] })}><option value="HEADER">Header</option><option value="FOOTER">Footer</option></select></label>
        <label className="pv-admin-modal-field">HTML<textarea value={form.html} onChange={(e) => setForm({ ...form, html: e.target.value })} placeholder="<!-- HTML -->" rows={4} /></label>
        <label className="pv-admin-modal-field">CSS<textarea value={form.css} onChange={(e) => setForm({ ...form, css: e.target.value })} placeholder="/* CSS */" rows={4} /></label>
        <label className="pv-admin-modal-field">JavaScript<textarea value={form.javascript} onChange={(e) => setForm({ ...form, javascript: e.target.value })} placeholder="// JavaScript" rows={4} /></label>
        <label className="pv-admin-check"><input type="checkbox" checked={form.isEnabled} onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })} /> Ativo</label>
        <button className="pv-admin-primary-action">{editingId ? null : <AdminIcon name="plus" />}{editingId ? "Atualizar snippet" : "Salvar snippet"}</button>
      </form>
    </AdminModal>
  </main>;
}
