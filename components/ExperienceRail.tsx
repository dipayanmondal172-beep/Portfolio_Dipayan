"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A vertical line beside the timeline that fills as you scroll through it. */
export default function ExperienceRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="relative" data-rail="">
      <span aria-hidden className="absolute -left-5 top-0 hidden h-full w-px bg-rule lg:-left-8 lg:block" />
      <span aria-hidden className="progress-line absolute -left-5 top-0 hidden h-full w-px bg-marigold lg:-left-8 lg:block" />
      {children}
    </div>
  );
}
