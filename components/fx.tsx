"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { networkField, stackCards, magnetic } from "@/lib/fx.js";

export function NetworkField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => (ref.current ? networkField(ref.current) : undefined), []);
  return <canvas ref={ref} data-network="" aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}

export function StackCards({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? stackCards(ref.current) : undefined), []);
  return <div ref={ref} data-stack="">{children}</div>;
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => (ref.current ? magnetic(ref.current, strength) : undefined), [strength]);
  return <span ref={ref} data-magnetic={strength} className="inline-block transition-transform duration-300 ease-out">{children}</span>;
}

/** Category tabs; every panel is rendered so content is indexable, only one is shown. */
export function SkillsExplorer({ groups }: { groups: { group: string; items: string[] }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div data-tabs="" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
        {groups.map((g, i) => (
          <button
            key={g.group}
            role="tab"
            id={`skill-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`skill-panel-${i}`}
            data-tab-btn={i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              const k = e.key;
              if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(k)) return;
              e.preventDefault();
              const n = groups.length;
              const next = k === "Home" ? 0 : k === "End" ? n - 1 : (i + (k === "ArrowDown" || k === "ArrowRight" ? 1 : n - 1)) % n;
              setActive(next);
              (document.getElementById(`skill-tab-${next}`) as HTMLButtonElement | null)?.focus();
            }}
            className={`group relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-left text-[0.95rem] transition-colors lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:py-4 lg:font-serif lg:text-2xl ${
              active === i ? "border-paper text-paper lg:border-rule" : "border-rule text-muted hover:text-paper lg:border-rule"
            }`}
          >
            <span className={`inline-block transition-transform duration-500 ${active === i ? "lg:translate-x-3" : ""}`}>{g.group}</span>
            <span aria-hidden className={`tab-bar absolute left-0 top-1/2 hidden h-px -translate-y-1/2 bg-marigold transition-all duration-500 lg:block ${active === i ? "w-2" : "w-0"}`} />
          </button>
        ))}
      </div>
      <div className="lg:col-span-8">
        {groups.map((g, i) => (
          <div key={g.group} role="tabpanel" id={`skill-panel-${i}`} aria-labelledby={`skill-tab-${i}`} data-tab-panel={i} hidden={active !== i}>
            <p className="text-sm text-muted">{g.items.length} skills</p>
            <ul className="chips mt-5 flex flex-wrap gap-2.5">
              {g.items.map((it) => (
                <li key={it} className="rounded-full border border-rule px-4 py-2 text-[0.98rem] transition-colors hover:border-marigold hover:text-marigold">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((it) => (
        <span key={it} className="flex items-center">
          <span className="px-6">{it}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-marigold" />
        </span>
      ))}
    </span>
  );
  return (
    <div aria-hidden className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}>{row}{row}</div>
    </div>
  );
}
