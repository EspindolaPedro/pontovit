"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FocalPoint = { focalPointX: number; focalPointY: number };
type CurrentPhoto = FocalPoint & { hasPhoto: boolean; updatedAt?: string };
type DragState = { startClientX: number; startClientY: number; startX: number; startY: number };

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export default function MagnoCardAdminPage() {
  const [current, setCurrent] = useState<CurrentPhoto>({ hasPhoto: false, focalPointX: 50, focalPointY: 50 });
  const [loading, setLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [draft, setDraft] = useState<FocalPoint>({ focalPointX: 50, focalPointY: 50 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dragState = useRef<DragState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function load() {
    setLoading(true);
    fetch("/api/admin/magno/photo")
      .then((response) => response.json())
      .then((result) => {
        const data: CurrentPhoto = result.data ?? { hasPhoto: false, focalPointX: 50, focalPointY: 50 };
        setCurrent(data);
        setDraft({ focalPointX: data.focalPointX, focalPointY: data.focalPointY });
      })
      .catch(() => setError("Não foi possível carregar a foto atual."))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  function pickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    setError("");
    setMessage("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDraft({ focalPointX: 50, focalPointY: 50 });
  }

  function cancelNewFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDraft({ focalPointX: current.focalPointX, focalPointY: current.focalPointY });
  }

  function startDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (!current.hasPhoto && !previewFile) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = { startClientX: event.clientX, startClientY: event.clientY, startX: draft.focalPointX, startY: draft.focalPointY };
  }

  function dragImage(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragState.current;
    if (!drag) return;
    setDraft({
      focalPointX: clamp(drag.startX + (event.clientX - drag.startClientX) * 0.5),
      focalPointY: clamp(drag.startY + (event.clientY - drag.startClientY) * 0.5),
    });
  }

  function stopDragging() {
    dragState.current = null;
  }

  async function save() {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (previewFile) {
        const form = new FormData();
        form.set("file", previewFile);
        form.set("focalPointX", String(draft.focalPointX));
        form.set("focalPointY", String(draft.focalPointY));
        const response = await fetch("/api/admin/magno/photo", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message ?? "Não foi possível enviar a foto.");
      } else {
        const response = await fetch("/api/admin/magno/photo", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message ?? "Não foi possível salvar o enquadramento.");
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage("Foto do cartão atualizada.");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  const showImage = previewUrl ?? (current.hasPhoto ? `/api/magno/photo?v=${encodeURIComponent(current.updatedAt ?? "")}` : null);
  const canAdjust = !!previewFile || current.hasPhoto;
  const dirty = !!previewFile || draft.focalPointX !== current.focalPointX || draft.focalPointY !== current.focalPointY;

  return (
    <main className="pv-admin-subpage">
      <header className="pv-admin-subpage-header">
        <div>
          <Link className="pv-admin-back" href="/admin">← Voltar para visão geral</Link>
          <p className="pv-admin-eyebrow">Cartão virtual</p>
          <h1>Foto do Magno (/magno)</h1>
          <span>Envie a foto de perfil exibida no cartão e ajuste o enquadramento arrastando a imagem.</span>
        </div>
      </header>

      {error ? <p className="pv-admin-error">{error}</p> : null}
      {message ? <p className="pv-admin-success">{message}</p> : null}

      {loading ? (
        <p className="pv-admin-empty">Carregando…</p>
      ) : (
        <div className="pv-magno-admin-layout">
          <div className="pv-magno-admin-preview-col">
            <div
              className={`pv-magno-admin-avatar${canAdjust ? " is-draggable" : ""}`}
              onPointerDown={startDragging}
              onPointerMove={dragImage}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
            >
              {showImage ? (
                <img src={showImage} alt="Foto do Magno" draggable={false} style={{ objectPosition: `${draft.focalPointX}% ${draft.focalPointY}%` }} />
              ) : (
                <span className="pv-magno-admin-avatar-empty">MB</span>
              )}
            </div>
            {canAdjust ? <p className="pv-magno-admin-hint">Arraste a foto para ajustar o enquadramento dentro do círculo.</p> : null}
          </div>

          <div className="pv-magno-admin-form">
            <label className="pv-admin-modal-field">
              {current.hasPhoto ? "Trocar foto" : "Enviar foto"}
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={pickFile} />
            </label>
            {previewFile ? (
              <button type="button" className="pv-admin-secondary-action" onClick={cancelNewFile} disabled={saving}>
                Cancelar novo arquivo
              </button>
            ) : null}
            <button type="button" className="pv-admin-primary-action" onClick={save} disabled={saving || !dirty}>
              {saving ? "Salvando…" : "Salvar"}
            </button>
            <p className="pv-magno-admin-note">A foto aparece em <Link href="/magno" target="_blank">pontovit.com.br/magno</Link> assim que salva.</p>
          </div>
        </div>
      )}
    </main>
  );
}
