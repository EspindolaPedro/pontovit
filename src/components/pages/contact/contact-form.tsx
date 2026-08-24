"use client";

import { useState, type FormEvent } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "*Novo contato pelo site PontoVit*",
      "",
      "*Dados do contato*",
      `*Nome:* ${form.get("name")}`,
      `*Empresa:* ${form.get("company") || "Não informado"}`,
      `*E-mail:* ${form.get("email")}`,
      `*Telefone:* ${form.get("phone") || "Não informado"}`,
      "",
      `*Interesse:* ${form.get("interest")}`,
      `*Mensagem:* ${form.get("message") || "Não informado"}`,
    ].join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
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
      </div>

      <div className="pv-contact-form-footer">
        <button type="submit">{sent ? "Mensagem preparada ✓" : "Falar com um especialista"}<b aria-hidden="true">↗</b></button>
        <small>Sem compromisso. Atendimento humano e personalizado.</small>
      </div>
    </form>
  );
}
