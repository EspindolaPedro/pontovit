"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => router.replace("/"), 4200);
    return () => window.clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="pv-not-found" aria-labelledby="not-found-title">
      <div className="pv-not-found-orbit pv-not-found-orbit-one" aria-hidden="true" />
      <div className="pv-not-found-orbit pv-not-found-orbit-two" aria-hidden="true" />
      <div className="pv-not-found-grid" aria-hidden="true" />

      <section className="pv-not-found-content">
        <div className="pv-not-found-mark" aria-hidden="true">
          <span>4</span>
          <span className="pv-not-found-zero">0</span>
          <span>4</span>
        </div>
        <p className="pv-not-found-eyebrow">Rota não encontrada</p>
        <h1 id="not-found-title">Essa página saiu da escala.</h1>
        <p className="pv-not-found-description">
          O endereço que você acessou não existe ou mudou de lugar. Mas a sua operação continua no ritmo certo.
        </p>
        <Link href="/" className="pv-not-found-button">
          Voltar para a home
          <span aria-hidden="true">↗</span>
        </Link>
        <p className="pv-not-found-redirect" aria-live="polite">
          Você será redirecionado automaticamente.
        </p>
        <div className="pv-not-found-progress" aria-hidden="true"><span /></div>
      </section>
    </main>
  );
}
