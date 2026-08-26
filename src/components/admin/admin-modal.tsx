"use client";

import { useEffect } from "react";
import { AdminIcon } from "./admin-icons";

export function AdminModal({ open, title, description, onClose, children, size = "default" }: { open: boolean; title: string; description?: string; onClose: () => void; children: React.ReactNode; size?: "default" | "wide" }) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [open, onClose]);

  if (!open) return null;
  return <div className="pv-admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className={`pv-admin-modal${size === "wide" ? " is-wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="admin-modal-title"><header><div><p className="pv-admin-eyebrow">Ação rápida</p><h2 id="admin-modal-title">{title}</h2>{description ? <p>{description}</p> : null}</div><button type="button" className="pv-admin-modal-close" onClick={onClose} aria-label="Fechar modal"><AdminIcon name="close" /></button></header>{children}</section></div>;
}
