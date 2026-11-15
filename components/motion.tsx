"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/** True once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Fades and lifts its children in when scrolled into view. */
export function Reveal({
  children, delay = 0, className = "", as: Tag = "div",
}: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const [armed, setArmed] = useState(false);
  // Only hide content once JS is running, so it is never invisible without JS.
  useEffect(() => setArmed(true), []);
  const El = Tag as "div";
  return (
    <El
      ref={ref}
      data-reveal=""
      className={`${armed ? "rv" : ""} ${inView ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </El>
  );
}

/** Counts a figure such as "120+" or "4.23M" up from zero when it scrolls into view. */
export function CountUp({ value, className = "", style }: { value: string; className?: string; style?: CSSProperties }) {
  const m = value.match(/^([\d.,]+)(.*)$/);
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const [text, setText] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (m && !reduced) setArmed(true);
  }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!m || !armed) return;
    const target = parseFloat(m[1].replace(/,/g, ""));
    const decimals = (m[1].split(".")[1] || "").length;
    const suffix = m[2];
    if (!inView) {
      setText((0).toFixed(decimals) + suffix);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setText((target * eased).toFixed(decimals) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setText(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, armed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} style={style} aria-label={value} data-count={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}

/** Splits a headline into words that rise in sequence on page load. */
export function WordRise({ text, startDelay = 0, step = 55 }: { text: string; startDelay?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="word">
          <span style={{ animationDelay: `${startDelay + i * step}ms` }}>{w}</span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
