"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminIcon } from "@/components/admin/admin-icons";

type User = { id: string; name: string; email: string; role: string; isActive: boolean };
type ApiScope = "posts:read" | "posts:write" | "posts:delete" | "media:write";
type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: ApiScope[];
  expiresAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
};

const availableScopes: { value: ApiScope; label: string; description: string }[] = [
  { value: "posts:read", label: "Ler posts", description: "Reservado para integrações que consultam conteúdo autenticado." },
  { value: "posts:write", label: "Criar e editar posts", description: "Permite ao Manus criar rascunhos e atualizar artigos." },
  { value: "media:write", label: "Enviar imagens", description: "Permite enviar JPG, PNG e WebP para a biblioteca." },
  { value: "posts:delete", label: "Excluir posts", description: "Permite arquivamento por API; deixe desmarcado se não for necessário." },
];

const initialKeyForm = {
  name: "Integração Manus",
  scopes: ["posts:write", "media:write"] as ApiScope[],
  expiresAt: "",
};

function formatDate(value: string | null) {
  if (!value) return "Nunca";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "AUTHOR" });
  const [keyForm, setKeyForm] = useState(initialKeyForm);
  const [userOpen, setUserOpen] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [usersResponse, keysResponse] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/api-keys"),
      ]);
      const [usersResult, keysResult] = await Promise.all([usersResponse.json(), keysResponse.json()]);
      if (!usersResponse.ok || !keysResponse.ok) {
        throw new Error(usersResult.message || keysResult.message || "Não foi possível carregar os acessos.");
      }
      setUsers(usersResult.data ?? []);
      setApiKeys(keysResult.data ?? []);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível carregar os acessos.");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function createUser(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForm),
    });
    const result = await response.json();
    if (!response.ok) setError(result.message);
    else {
      setUserForm({ name: "", email: "", password: "", role: "AUTHOR" });
      setUserOpen(false);
      await load();
    }
  }

  async function toggleUser(user: User) {
    setError("");
    const response = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    if (!response.ok) {
      const result = await response.json();
      setError(result.message || "Não foi possível alterar o usuário.");
      return;
    }
    await load();
  }

  function toggleScope(scope: ApiScope) {
    setKeyForm((current) => ({
      ...current,
      scopes: current.scopes.includes(scope)
        ? current.scopes.filter((item) => item !== scope)
        : [...current.scopes, scope],
    }));
  }

  async function createApiKey(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setCopyMessage("");
    const expiresAt = keyForm.expiresAt
      ? new Date(`${keyForm.expiresAt}T23:59:59.999`).toISOString()
      : undefined;
    const response = await fetch("/api/admin/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: keyForm.name, scopes: keyForm.scopes, expiresAt }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || "Não foi possível criar a API key.");
      return;
    }
    setCreatedKey(result.data.key);
    setKeyForm(initialKeyForm);
    await load();
  }

  async function copyCreatedKey() {
    await navigator.clipboard.writeText(createdKey);
    setCopyMessage("Chave copiada.");
  }

  function closeKeyModal() {
    setKeyOpen(false);
    setCreatedKey("");
    setCopyMessage("");
    setKeyForm(initialKeyForm);
  }

  async function revokeApiKey(id: string) {
    if (!window.confirm("Revogar esta API key? A integração que usa essa chave deixará de funcionar.")) return;
    setError("");
    const response = await fetch(`/api/admin/api-keys/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = await response.json();
      setError(result.message || "Não foi possível revogar a API key.");
      return;
    }
    await load();
  }

  return <main className="pv-admin-subpage">
    <header className="pv-admin-subpage-header">
      <div><Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link><p className="pv-admin-eyebrow">Acesso</p><h1>Usuários e API</h1><span>Contas individuais, permissões e credenciais para integrações externas.</span></div>
      <button className="pv-admin-primary-action" onClick={() => { setError(""); setUserOpen(true); }}><AdminIcon name="plus" />Novo usuário</button>
    </header>
    {error ? <p className="pv-admin-error">{error}</p> : null}

    <section className="pv-admin-access-section">
      <header><div><p className="pv-admin-eyebrow">Equipe</p><h2>Usuários do CMS</h2></div></header>
      <div className="pv-admin-table-wrap"><table className="pv-admin-table"><thead><tr><th>Nome</th><th>E-mail</th><th>Permissão</th><th>Status</th><th /></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><strong>{user.name}</strong></td><td>{user.email}</td><td>{user.role}</td><td><span className={`pv-admin-status ${user.isActive ? "is-published" : "is-archived"}`}>{user.isActive ? "Ativo" : "Inativo"}</span></td><td><button className="pv-admin-delete" onClick={() => void toggleUser(user)}>{user.isActive ? "Desativar" : "Ativar"}</button></td></tr>)}</tbody></table>{!users.length ? <p className="pv-admin-empty">Nenhum usuário cadastrado.</p> : null}</div>
    </section>

    <section className="pv-admin-access-section">
      <header><div><p className="pv-admin-eyebrow">Integrações</p><h2>API keys</h2><span>Use uma chave separada para cada serviço, com apenas as permissões necessárias.</span></div><button className="pv-admin-secondary-action" onClick={() => { setError(""); setKeyOpen(true); }}><AdminIcon name="plus" />Nova API key</button></header>
      <div className="pv-admin-table-wrap"><table className="pv-admin-table"><thead><tr><th>Nome</th><th>Prefixo</th><th>Permissões</th><th>Último uso</th><th>Expira</th><th /></tr></thead><tbody>{apiKeys.map((key) => <tr key={key.id}><td><strong>{key.name}</strong></td><td><code>{key.keyPrefix}…</code></td><td><small>{key.scopes.join(", ")}</small></td><td>{formatDate(key.lastUsedAt)}</td><td>{key.expiresAt ? formatDate(key.expiresAt) : "Sem expiração"}</td><td><button className="pv-admin-delete" onClick={() => void revokeApiKey(key.id)}>Revogar</button></td></tr>)}</tbody></table>{!apiKeys.length ? <p className="pv-admin-empty">Nenhuma API key ativa.</p> : null}</div>
    </section>

    <AdminModal open={userOpen} title="Novo usuário" description="Crie uma conta com permissão específica para o CMS." onClose={() => setUserOpen(false)}>
      <form className="pv-admin-user-form" onSubmit={createUser}>
        <label className="pv-admin-modal-field">Nome<input value={userForm.name} onChange={(event) => setUserForm({ ...userForm, name: event.target.value })} placeholder="Nome completo" required /></label>
        <label className="pv-admin-modal-field">E-mail<input type="email" value={userForm.email} onChange={(event) => setUserForm({ ...userForm, email: event.target.value })} placeholder="email@empresa.com" required /></label>
        <label className="pv-admin-modal-field">Senha<input type="password" value={userForm.password} onChange={(event) => setUserForm({ ...userForm, password: event.target.value })} placeholder="Mínimo de 12 caracteres" minLength={12} required /></label>
        <label className="pv-admin-modal-field">Permissão<select value={userForm.role} onChange={(event) => setUserForm({ ...userForm, role: event.target.value })}><option value="AUTHOR">Autor</option><option value="EDITOR">Editor</option><option value="ADMIN">Administrador</option></select></label>
        <button className="pv-admin-primary-action"><AdminIcon name="plus" />Criar usuário</button>
      </form>
    </AdminModal>

    <AdminModal open={keyOpen} title="Nova API key" description="Crie uma credencial para o Manus ou outra integração." onClose={closeKeyModal}>
      {createdKey ? <div className="pv-api-key-result">
        <p className="pv-admin-success">API key criada. Copie agora: ela não será exibida novamente.</p>
        <code>{createdKey}</code>
        <button type="button" className="pv-admin-primary-action" onClick={() => void copyCreatedKey()}>Copiar chave</button>
        {copyMessage ? <small>{copyMessage}</small> : null}
      </div> : <form className="pv-admin-api-key-form" onSubmit={createApiKey}>
        <label className="pv-admin-modal-field">Nome<input value={keyForm.name} onChange={(event) => setKeyForm({ ...keyForm, name: event.target.value })} required minLength={2} /></label>
        <fieldset className="pv-api-scope-list"><legend>Permissões</legend>{availableScopes.map((scope) => <label key={scope.value}><input type="checkbox" checked={keyForm.scopes.includes(scope.value)} onChange={() => toggleScope(scope.value)} /><span><strong>{scope.label}</strong><small>{scope.description}</small></span></label>)}</fieldset>
        <label className="pv-admin-modal-field">Expiração opcional<input type="date" value={keyForm.expiresAt} onChange={(event) => setKeyForm({ ...keyForm, expiresAt: event.target.value })} /></label>
        <button className="pv-admin-primary-action" disabled={!keyForm.scopes.length}><AdminIcon name="plus" />Criar API key</button>
      </form>}
    </AdminModal>
  </main>;
}
