"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/shared/icons";

export function MagnoShareButton({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    // No celular, abre o menu nativo de compartilhamento (WhatsApp, e-mail, etc.).
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Usuário cancelou o compartilhamento — não é um erro.
      }
      return;
    }
    // Sem suporte (a maioria dos navegadores desktop): copia o link.
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ambiente sem acesso à área de transferência — ignora silenciosamente */
    }
  }

  return (
    <button type="button" className="pv-magno-share" onClick={share}>
      <ArrowUpRightIcon size={15} />
      {copied ? "Link copiado!" : "Compartilhar este cartão"}
    </button>
  );
}
