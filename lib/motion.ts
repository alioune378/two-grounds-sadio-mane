"use client";

import { useEffect, useRef } from "react";

/**
 * A small scroll engine: no library, about 1 KB.
 *
 * It writes one number, --p (0 to 1), onto a section as the visitor scrolls. All
 * choreography lives in CSS as functions of --p, scoped under `.motion`, so the
 * browser keeps transforms and opacity on the compositor and the script never
 * touches layout.
 *
 *  - "pin":  progress through a tall section whose stage is position: sticky.
 *  - "pass": progress of an ordinary section crossing the viewport.
 *
 * Reduced motion, or no `.motion` class (no JS, or the boot script decided
 * against motion): the hook does nothing and the static layout stands.
 */
export type Mode = "pin" | "pass";

function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return (
    document.documentElement.classList.contains("motion") &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useProgress<T extends HTMLElement>(mode: Mode = "pass", onProgress?: (p: number) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;

    let raf = 0;
    let visible = false;
    let last = -1;

    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      let p: number;
      if (mode === "pin") {
        const travel = r.height - vh;
        p = travel > 0 ? -r.top / travel : r.top <= 0 ? 1 : 0;
      } else {
        p = (vh - r.top) / (vh + r.height);
      }
      p = Math.min(1, Math.max(0, p));
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      el.style.setProperty("--p", p.toFixed(4));
      cb.current?.(p);
    };
    const request = () => {
      if (visible && !raf) raf = requestAnimationFrame(measure);
    };
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        // Settle the final state even when the section is left at speed.
        measure();
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    measure();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);

  return ref;
}
