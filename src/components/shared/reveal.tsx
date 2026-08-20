"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & { delay?: number };

export function Reveal({ className, delay = 0, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Safety net: some environments (older browsers, automated screenshot tools that
    // render full-page height without dispatching real scroll/intersection events)
    // never fire the observer for off-screen content. Real, non-decorative copy must
    // never stay permanently invisible, so we force it in after a short delay regardless.
    const fallback = window.setTimeout(() => setVisible(true), 1800);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          window.clearTimeout(fallback);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 120px 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={cn("pv-reveal", visible && "is-visible", className)} style={{ transitionDelay: `${delay}ms`, ...style }} {...props}>
      {children}
    </div>
  );
}
