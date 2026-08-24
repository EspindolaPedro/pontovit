"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSending(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone"),
          subject: form.get("interest"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Não foi possível preparar a mensagem.");
      setSent(true);
      window.location.assign(result.redirectUrl);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Tente novamente em instantes.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form className="pv-contact-form" onSubmit={handleSubmit}>
      <div className="pv-contact-form-header">
        <span>Vamos conversar</span>
        <p>Preencha os dados e nosso time continuará o atendimento pelo WhatsApp.</p>
      </div>

      <div className="pv-contact-form-grid">
        <label>
          <span>Seu nome</span>
          <input name="name" type="text" placeholder="Como podemos chamar você?" autoComplete="name" required />
        </label>
        <label>
          <span>Empresa</span>
          <input name="company" type="text" placeholder="Nome da empresa" autoComplete="organization" />
        </label>
        <label>
          <span>E-mail</span>
          <input name="email" type="email" placeholder="voce@empresa.com.br" autoComplete="email" required />
        </label>
        <label>
          <span>Telefone</span>
          <input name="phone" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" />
        </label>
        <label className="is-wide">
          <span>Como podemos ajudar?</span>
          <select name="interest" defaultValue="Conhecer a plataforma">
            <option>Conhecer a plataforma</option>
            <option>Organizar minhas escalas</option>
            <option>Integrar o registro de ponto Stelanto</option>
            <option>Tirar uma dúvida</option>
          </select>
        </label>
        <label className="is-wide">
          <span>Mensagem <small>(opcional)</small></span>
          <textarea name="message" rows={4} placeholder="Conte brevemente sobre a sua operação..." />
        </label>
        <label className="pv-honeypot" aria-hidden="true">
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="pv-contact-form-footer">
        <button type="submit" disabled={isSending}>
          {isSending ? "Preparando..." : sent ? "Mensagem preparada ✓" : "Falar com um especialista"}
          <b aria-hidden="true">↗</b>
        </button>
        <small>Sem compromisso. Atendimento humano e personalizado.</small>
      </div>
      {error ? <p className="pv-contact-form-error" role="alert">{error}</p> : null}
    </form>
  );
}
