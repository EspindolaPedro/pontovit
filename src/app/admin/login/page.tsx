"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Não foi possível entrar.");
      router.push("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="pv-admin-login">
      <div className="pv-admin-login-card">
        <div className="pv-admin-login-brand"><img src="/assets/product/pontovit-logo.png" alt="PontoVit" /><small>CMS</small></div>
        <h1>Bem-vindo de volta.</h1>
        <p className="pv-admin-login-description">Entre para gerenciar conteúdo, SEO, marcas e configurações do site.</p>
        <form onSubmit={submit} className="pv-admin-form">
          <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
          <label>Senha<input name="password" type="password" autoComplete="current-password" required /></label>
          {error ? <p className="pv-admin-error" role="alert">{error}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar no CMS"}<span>↗</span></button>
        </form>
      </div>
    </main>
  );
}
