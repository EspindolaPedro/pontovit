"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type TimelineStyle = CSSProperties & { "--timeline-progress"?: string };

export function ScrollTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.72;
      const end = window.innerHeight * 0.28;
      const distance = Math.max(rect.height - (start - end), 1);
      const travelled = start - rect.top;
      const progress = Math.max(0, Math.min(1, travelled / distance));
      node.style.setProperty("--timeline-progress", `${progress * 100}%`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="pv-timeline-scroll" style={{ "--timeline-progress": "0%" } as TimelineStyle}>{children}</div>;
}
