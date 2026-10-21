"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRightIcon, CloseIcon, LockIcon } from "@/components/shared/icons";
import { getWorkScheduleSegment, type WorkScheduleSimulationInput } from "@/lib/work-schedule-simulation";
import styles from "./lead-capture.module.css";

export type LeadSimulationData = WorkScheduleSimulationInput;

type CaptureRequest = { trigger: string; simulation?: LeadSimulationData };
type LeadCaptureContextValue = { openLeadCapture: (request: CaptureRequest) => void };

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function useLeadCapture() {
  const context = useContext(LeadCaptureContext);
  if (!context) throw new Error("useLeadCapture must be used inside LeadCaptureProvider");
  return context;
}

// Provider único, montado em SiteChrome: todo botão "Falar no Whatsapp" do site passa
// por aqui antes de redirecionar, para sempre coletarmos nome/telefone/e-mail do lead.
export function LeadCaptureProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<CaptureRequest | null>(null);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!request) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => nameInputRef.current?.focus(), 50);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) setRequest(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [request, submitting]);

  function openLeadCapture(nextRequest: CaptureRequest) {
    setError("");
    setRequest(nextRequest);
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!request || submitting) return;
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams(window.location.search);

    try {
      const response = await fetch("/api/leads/work-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          website: form.get("website"),
          trigger: request.trigger,
          simulation: request.simulation,
          attribution: {
            utmSource: searchParams.get("utm_source") || undefined,
            utmMedium: searchParams.get("utm_medium") || undefined,
            utmCampaign: searchParams.get("utm_campaign") || undefined,
            utmTerm: searchParams.get("utm_term") || undefined,
            utmContent: searchParams.get("utm_content") || undefined,
            pageUrl: window.location.href,
            referrer: document.referrer || undefined,
          },
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.redirectUrl) throw new Error(data.message || "Não foi possível salvar seus dados.");

      const analyticsWindow = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      analyticsWindow.dataLayer?.push({ event: "lead_form_submitted", lead_trigger: request.trigger, has_simulation: Boolean(request.simulation) });
      window.location.assign(data.redirectUrl);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível continuar. Tente novamente.");
      setSubmitting(false);
    }
  }

  const modal = request ? (
    <div className={styles.leadModalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) setRequest(null); }}>
      <section className={styles.leadModal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button className={styles.leadModalClose} type="button" onClick={() => setRequest(null)} disabled={submitting} aria-label="Fechar formulário"><CloseIcon size={20} /></button>
        <div className={styles.leadModalIntro}>
          <p className={styles.eyebrow}>Próximo passo</p>
          <h2 id={titleId}>{request.simulation ? "Vamos planejar sua escala 5x2." : "Vamos continuar no WhatsApp."}</h2>
          <p>Preencha seus dados para salvar o interesse e conversar com a equipe da PontoVit pelo WhatsApp.</p>
          {request.simulation ? <span>Diagnóstico de {request.simulation.employees.toLocaleString("pt-BR")} colaboradores em {getWorkScheduleSegment(request.simulation).label} vinculado a este contato.</span> : null}
        </div>
        <form className={styles.leadForm} onSubmit={submitLead}>
          <label>Nome completo<input ref={nameInputRef} name="name" autoComplete="name" minLength={2} maxLength={120} required placeholder="Como podemos chamar você?" /></label>
          <label>Telefone com WhatsApp<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={40} required placeholder="(67) 99999-9999" /></label>
          <label>E-mail profissional<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="voce@empresa.com.br" /></label>
          <label className={styles.leadHoneypot} aria-hidden="true">Não preencha<input name="website" tabIndex={-1} autoComplete="off" /></label>
          {error ? <p className={styles.leadFormError} role="alert">{error}</p> : null}
          <button type="submit" disabled={submitting}>{submitting ? "Salvando seus dados..." : "Continuar pelo WhatsApp"}<ArrowUpRightIcon size={20} /></button>
          <small><LockIcon size={13} /> Seus dados serão usados pela PontoVit para contextualizar o atendimento desta solicitação.</small>
        </form>
      </section>
    </div>
  ) : null;

  return (
    <LeadCaptureContext.Provider value={{ openLeadCapture }}>
      {children}
      {mounted && modal ? createPortal(modal, document.body) : null}
    </LeadCaptureContext.Provider>
  );
}

// Botão genérico "Falar no Whatsapp": mantenha o className de cada CTA existente para
// preservar o visual (border/background/font já vêm resetados pelo preflight do Tailwind).
export function LeadCaptureButton({ trigger, simulation, className, children, onClick }: { trigger: string; simulation?: LeadSimulationData; className?: string; children: React.ReactNode; onClick?: () => void }) {
  const { openLeadCapture } = useLeadCapture();
  return <button type="button" className={`${styles.triggerReset}${className ? ` ${className}` : ""}`} onClick={() => { onClick?.(); openLeadCapture({ trigger, simulation }); }}>{children}</button>;
}
