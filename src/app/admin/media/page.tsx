"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AdminModal } from "@/components/admin/admin-modal";

type Media = {
  id: string;
  filename: string;
  altText: string;
  focalPointX: number | null;
  focalPointY: number | null;
  mimeType: string;
  byteSize: number;
  brandLogos: { id: string; name: string; group: "CLIENT" | "PARTNER" }[];
};

type FocalPoint = { focalPointX: number; focalPointY: number };
type DragState = { startClientX: number; startClientY: number; startX: number; startY: number };

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function MediaCard({ item, onChange }: { item: Media; onChange: (next: Media) => void }) {
  const [adjusting, setAdjusting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [draft, setDraft] = useState<FocalPoint>({
    focalPointX: item.focalPointX ?? 50,
    focalPointY: item.focalPointY ?? 50,
  });
  const dragState = useRef<DragState | null>(null);

  function beginAdjusting() {
    setSaveError("");
    setDraft({ focalPointX: item.focalPointX ?? 50, focalPointY: item.focalPointY ?? 50 });
    setAdjusting(true);
  }

  function startDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (!adjusting) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: draft.focalPointX,
      startY: draft.focalPointY,
    };
  }

  function dragImage(event: React.PointerEvent<HTMLDivElement>) {
    const current = dragState.current;
    if (!current || !adjusting) return;
    setDraft({
      focalPointX: clamp(current.startX + (event.clientX - current.startClientX) * 0.65),
      focalPointY: clamp(current.startY + (event.clientY - current.startClientY) * 0.65),
    });
  }

  function stopDragging() {
    dragState.current = null;
  }

  async function saveFocalPoint() {
    setSaving(true);
    setSaveError("");
    const response = await fetch(`/api/admin/media/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altText: item.altText, ...draft }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setSaveError(result?.message ?? "Não foi possível salvar o enquadramento.");
      setSaving(false);
      return;
    }

    onChange({ ...item, ...draft });
    setAdjusting(false);
    setSaving(false);
  }

  const focal = adjusting
    ? draft
    : { focalPointX: item.focalPointX ?? 50, focalPointY: item.focalPointY ?? 50 };

  return (
    <article className={`pv-admin-media-card${adjusting ? " is-adjusting" : ""}`}>
      <div
        className="pv-admin-media-preview"
        onPointerDown={startDragging}
        onPointerMove={dragImage}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        aria-label={adjusting ? "Arraste para ajustar o enquadramento" : undefined}
      >
        <img
          src={`/api/media/${item.id}`}
          alt={item.altText}
          draggable={false}
          style={{ objectPosition: `${focal.focalPointX}% ${focal.focalPointY}%` }}
        />
        {adjusting ? <span className="pv-admin-media-drag-hint">Arraste para enquadrar</span> : null}
      </div>
      <div className="pv-admin-media-details">
        <strong>{item.brandLogos[0]?.name || item.filename}</strong>
        <small>{item.altText}</small>
        <span>{Math.round(item.byteSize / 1024)} KB · {item.mimeType}</span>
        <div className="pv-admin-media-actions">
          {adjusting ? (
            <>
              <button type="button" className="pv-admin-media-action is-primary" onClick={saveFocalPoint} disabled={saving}>
                {saving ? "Salvando…" : "Salvar enquadramento"}
              </button>
              <button type="button" className="pv-admin-media-action" onClick={() => setAdjusting(false)} disabled={saving}>
                Cancelar
              </button>
            </>
          ) : (
            <button type="button" className="pv-admin-media-action" onClick={beginAdjusting}>
              Ajustar enquadramento
            </button>
          )}
        </div>
        {saveError ? <small className="pv-admin-media-save-error">{saveError}</small> : null}
      </div>
    </article>
  );
}

function MediaSection({ title, description, items, onChange }: { title: string; description: string; items: Media[]; onChange: (next: Media) => void }) {
  return (
    <section className="pv-admin-media-section">
      <header>
        <div>
          <p className="pv-admin-eyebrow">Biblioteca de marca</p>
          <h2>{title}</h2>
          <span>{description}</span>
        </div>
        <strong>{items.length.toString().padStart(2, "0")}</strong>
      </header>
      {items.length ? <div className="pv-admin-media-grid">{items.map((item) => <MediaCard key={item.id} item={item} onChange={onChange} />)}</div> : <p className="pv-admin-media-empty">Nenhuma logo cadastrada nesta categoria.</p>}
    </section>
  );
}

export default function MediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [error, setError] = useState("");

  function load() {
    fetch("/api/admin/media")
      .then((response) => response.json())
      .then((result) => setItems(result.data ?? []))
      .catch(() => setError("Não foi possível carregar a mídia."));
  }

  useEffect(load, []);

  async function upload(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return;
    const form = new FormData();
    form.set("file", file);
    form.set("altText", altText);
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const result = await response.json();
    if (!response.ok) setError(result.message);
    else {
      setFile(null);
      setAltText("");
      setUploadOpen(false);
      load();
    }
  }

  function updateItem(next: Media) {
    setItems((current) => current.map((item) => item.id === next.id ? next : item));
  }

  const partnerItems = items.filter((item) => item.brandLogos.some((logo) => logo.group === "PARTNER"));
  const clientItems = items.filter((item) => item.brandLogos.some((logo) => logo.group === "CLIENT"));
  const otherItems = items.filter((item) => item.brandLogos.length === 0);

  return (
    <main className="pv-admin-subpage">
      <header className="pv-admin-subpage-header">
        <div>
          <Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link>
          <p className="pv-admin-eyebrow">Biblioteca</p>
          <h1>Mídia</h1>
          <span>Organize as logos por contexto e mantenha as imagens editoriais separadas da marca.</span>
        </div>
        <button className="pv-admin-primary-action" onClick={() => { setError(""); setUploadOpen(true); }}>Enviar imagem <b>↗</b></button>
      </header>
      {error ? <p className="pv-admin-error">{error}</p> : null}
      <div className="pv-admin-media-groups">
        <MediaSection title="Parceiros" description="Logos exibidas na seção de parceiros do site." items={partnerItems} onChange={updateItem} />
        <MediaSection title="Clientes" description="Logos exibidas na seção de clientes do site." items={clientItems} onChange={updateItem} />
        {otherItems.length ? <MediaSection title="Outras imagens" description="Arquivos disponíveis para posts e conteúdos editoriais." items={otherItems} onChange={updateItem} /> : null}
      </div>
      <AdminModal open={uploadOpen} title="Enviar imagem" description="Adicione uma imagem à biblioteca editorial do CMS." onClose={() => setUploadOpen(false)}>
        <form className="pv-admin-upload-form" onSubmit={upload}>
          <label className="pv-admin-modal-field">Arquivo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setFile(event.target.files?.[0] ?? null)} required /></label>
          <label className="pv-admin-modal-field">Texto alternativo<input value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="Descreva a imagem" required /></label>
          <button className="pv-admin-primary-action">Enviar imagem <b>↗</b></button>
        </form>
      </AdminModal>
    </main>
  );
}
