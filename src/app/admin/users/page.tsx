"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminModal } from "@/components/admin/admin-modal";

type User = { id: string; name: string; email: string; role: string; isActive: boolean };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); const [form, setForm] = useState({ name: "", email: "", password: "", role: "AUTHOR" }); const [open, setOpen] = useState(false); const [error, setError] = useState("");
  function load() { fetch("/api/admin/users").then((r) => r.json()).then((result) => setUsers(result.data ?? [])); }
  useEffect(load, []);
  async function create(event: React.FormEvent) { event.preventDefault(); setError(""); const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const result = await response.json(); if (!response.ok) setError(result.message); else { setForm({ name: "", email: "", password: "", role: "AUTHOR" }); setOpen(false); load(); } }
  async function toggle(user: User) { await fetch(`/api/admin/users/${user.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !user.isActive }) }); load(); }
  return <main className="pv-admin-subpage"><header className="pv-admin-subpage-header"><div><Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link><p className="pv-admin-eyebrow">Acesso</p><h1>Usuários</h1><span>Contas individuais, papéis e ativação de acesso ao CMS.</span></div><button className="pv-admin-primary-action" onClick={() => { setError(""); setOpen(true); }}>Novo usuário <b>↗</b></button></header>{error ? <p className="pv-admin-error">{error}</p> : null}<div className="pv-admin-user-list">{users.map((user) => <div key={user.id}><span><strong>{user.name}</strong><small>{user.email} · {user.role}</small></span><button onClick={() => toggle(user)}>{user.isActive ? "Desativar" : "Ativar"}</button></div>)}</div><AdminModal open={open} title="Novo usuário" description="Crie uma conta com permissão específica para o CMS." onClose={() => setOpen(false)}><form className="pv-admin-user-form" onSubmit={create}><label className="pv-admin-modal-field">Nome<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" required /></label><label className="pv-admin-modal-field">E-mail<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@empresa.com" required /></label><label className="pv-admin-modal-field">Senha<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo de 12 caracteres" minLength={12} required /></label><label className="pv-admin-modal-field">Permissão<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="AUTHOR">Autor</option><option value="EDITOR">Editor</option><option value="ADMIN">Administrador</option></select></label><button className="pv-admin-primary-action">Criar usuário <b>↗</b></button></form></AdminModal></main>;
}
