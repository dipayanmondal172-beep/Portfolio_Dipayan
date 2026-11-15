"use client";

/**
 * Animated diagrams. Each one explains a piece of work rather than decorating it:
 * lines draw, nodes arrive, and signals travel along the paths.
 * Motion is transform/opacity/stroke only and stops under prefers-reduced-motion.
 */

import { useEffect, useRef, useState, type CSSProperties, type ComponentType } from "react";
import { useInView, useReducedMotion } from "./motion";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A dot that travels along an SVG path on a loop once `play` is true. */
function Packet({ path, play, delay = 0, dur = 2.8, r = 3.5, className = "fill-marigold" }: {
  path: string; play: boolean; delay?: number; dur?: number; r?: number; className?: string;
}) {
  const reduced = useReducedMotion();
  const anim = useRef<SVGAnimateMotionElement | null>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!play || reduced) return;
    const t = setTimeout(() => {
      try { anim.current?.beginElement(); } catch {}
      setLive(true);
    }, delay);
    return () => clearTimeout(t);
  }, [play, reduced, delay]);
  if (reduced) return null;
  return (
    <circle r={r} className={className} style={{ opacity: live ? 1 : 0 }} data-packet={delay}>
      <animateMotion ref={anim} begin="indefinite" dur={`${dur}s`} repeatCount="indefinite" path={path} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.35 1" />
    </circle>
  );
}

function Node({ x, y, w, h, title, sub, accent = false, delay = 0, size = 15 }: {
  x: number; y: number; w: number; h: number; title: string; sub?: string; accent?: boolean; delay?: number; size?: number;
}) {
  return (
    <g className="pop" style={d(delay)}>
      <rect x={x} y={y} width={w} height={h} rx={6} className={`fill-surface ${accent ? "stroke-marigold" : "stroke-rule"}`} strokeWidth={accent ? 1.5 : 1} />
      <text x={x + 12} y={sub ? y + h / 2 - 3 : y + h / 2 + 5} className="fill-paper font-sans" fontSize={size} fontWeight={500}>{title}</text>
      {sub && <text x={x + 12} y={y + h / 2 + 15} className="fill-muted font-sans" fontSize={size - 3}>{sub}</text>}
    </g>
  );
}

function Line({ path, delay = 0, accent = false, dashed = false }: { path: string; delay?: number; accent?: boolean; dashed?: boolean }) {
  return (
    <path d={path} pathLength={1} fill="none" className={`${dashed ? "fade" : "draw"} ${accent ? "stroke-marigold" : "stroke-rule"}`} strokeWidth={accent ? 1.5 : 1.25} strokeDasharray={dashed ? "0.012 0.012" : undefined} style={d(delay)} />
  );
}

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
};

/* ───────────────────────── Hero: inputs → narrative → audiences ───────────────────────── */

export function HeroSystem() {
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 50); return () => clearTimeout(t); }, []);

  const inputs = [
    { t: "Capabilities", s: "what the product does", y: 60 },
    { t: "Evidence", s: "proof it works", y: 185 },
    { t: "Market research", s: "what buyers need", y: 310 },
  ];
  const outputs = [
    { t: "Analysts", s: "RFIs, demos", y: 20 },
    { t: "Buyers", s: "120+ listings", y: 125 },
    { t: "Event audiences", s: "370 registrations", y: 230 },
    { t: "Audiences", s: "10M+ views / 30 days", y: 335 },
  ];
  const cx1 = 200, cx2 = 318, cy = 210;
  const inPaths = inputs.map((n) => curve(150, n.y + 30, cx1, cy));
  const outPaths = outputs.map((n) => curve(cx2, cy, 370, n.y + 30));

  return (
    <svg viewBox="0 0 540 400" data-hero className={`dv ${play ? "play" : ""} h-auto w-full`} role="img" aria-label="Diagram: capabilities, evidence and market research feed one narrative, which is adapted for analysts, buyers, event audiences and social audiences.">
      {inPaths.map((p, i) => <Line key={p} path={p} delay={500 + i * 120} />)}
      {outPaths.map((p, i) => <Line key={p} path={p} delay={1100 + i * 120} accent />)}

      {inputs.map((n, i) => <Node key={n.t} x={0} y={n.y} w={150} h={60} title={n.t} sub={n.s} delay={200 + i * 110} />)}

      <g className="pop" style={d(800)}>
        <circle cx={(cx1 + cx2) / 2} cy={cy} r={46} className="pulse fill-none stroke-marigold" strokeWidth={1} />
        <rect x={cx1} y={cy - 34} width={cx2 - cx1} height={68} rx={34} className="fill-marigold" />
        <text x={(cx1 + cx2) / 2} y={cy + 6} textAnchor="middle" className="fill-ink font-serif" fontSize={20} fontStyle="italic">Narrative</text>
      </g>

      {outputs.map((n, i) => (
        <g key={n.t}>
          <Node x={370} y={n.y} w={170} h={60} title={n.t} sub={n.s} delay={1300 + i * 120} />
          <circle cx={526} cy={n.y + 14} r={3} className="blink fill-marigold" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}

      {inPaths.map((p, i) => <Packet key={`i${i}`} path={p} play={play} delay={1700 + i * 500} dur={2.2} r={3} className="fill-muted" />)}
      {outPaths.map((p, i) => <Packet key={`o${i}`} path={p} play={play} delay={2300 + i * 450} dur={2.4} />)}
    </svg>
  );
}

/* ───────────────────────── Analyst relations: evaluation cycle ───────────────────────── */

function ARCycle() {
  const [ref, play] = useInView<HTMLDivElement>(0.35);
  const teams = ["Product", "Engineering", "Pre-sales"];
  const rfi = { x: 170, y: 95, w: 150, h: 76 };
  const mx = 380, my = 34, mw = 172, mh = 210;
  const others = [[0.18, 0.7], [0.3, 0.52], [0.45, 0.78], [0.62, 0.62], [0.55, 0.35], [0.76, 0.45], [0.82, 0.24], [0.4, 0.3]];
  const start = { x: mx + mw * 0.22, y: my + mh * 0.82 };
  const end = { x: mx + mw * 0.74, y: my + mh * 0.2 };
  return (
    <div ref={ref}>
      <svg viewBox="0 0 560 310" className={`dv ${play ? "play" : ""} h-auto w-full`} role="img" aria-label="Diagram: product, engineering and pre-sales input flows into the RFI and demo, which feeds the analyst assessment, where the platform moves toward higher capability and market impact.">
        {teams.map((t, i) => {
          const y = 40 + i * 78;
          return (
            <g key={t}>
              <Line path={curve(120, y + 22, rfi.x, rfi.y + rfi.h / 2)} delay={300 + i * 120} />
              <Node x={0} y={y} w={120} h={44} title={t} delay={i * 120} />
              <Packet path={curve(120, y + 22, rfi.x, rfi.y + rfi.h / 2)} play={play} delay={1400 + i * 400} dur={2} r={3} className="fill-muted" />
            </g>
          );
        })}
        <Node x={rfi.x} y={rfi.y} w={rfi.w} h={rfi.h} title="RFI + demo" sub="owned end to end" accent delay={600} size={17} />
        <Line path={`M${rfi.x + rfi.w} ${rfi.y + rfi.h / 2} L${mx - 6} ${rfi.y + rfi.h / 2}`} accent delay={900} />
        <Packet path={`M${rfi.x + rfi.w} ${rfi.y + rfi.h / 2} L${mx - 6} ${rfi.y + rfi.h / 2}`} play={play} delay={1800} dur={1.6} />

        {/* Generic capability matrix: not any firm's chart */}
        <g className="fade" style={d(1000)}>
          <rect x={mx} y={my} width={mw} height={mh} className="fill-surface stroke-rule" />
          <line x1={mx + mw / 2} y1={my} x2={mx + mw / 2} y2={my + mh} className="stroke-rule" strokeDasharray="3 4" />
          <line x1={mx} y1={my + mh / 2} x2={mx + mw} y2={my + mh / 2} className="stroke-rule" strokeDasharray="3 4" />
          {others.map(([px, py], i) => <circle key={i} cx={mx + mw * px} cy={my + mh * py} r={4} className="fill-muted" opacity={0.45} />)}
          <text x={mx + mw / 2} y={my + mh + 22} textAnchor="middle" className="fill-muted font-sans" fontSize={13}>Capability</text>
          <text x={mx} y={my - 8} className="fill-muted font-sans" fontSize={13}>Market impact</text>
        </g>
        <path d={`M${start.x} ${start.y} Q${start.x + 20} ${end.y + 40} ${end.x} ${end.y}`} pathLength={1} fill="none" className="draw stroke-marigold" strokeWidth={1.5} strokeDasharray="1" style={d(1700)} />
        <g className="move" data-to={`translate(${end.x - start.x}px, ${end.y - start.y}px)`} style={{ ...d(1700), transform: play ? `translate(${end.x - start.x}px, ${end.y - start.y}px)` : "none" }}>
          <circle cx={start.x} cy={start.y} r={14} className="pulse fill-none stroke-marigold" />
          <circle cx={start.x} cy={start.y} r={7} className="fill-marigold" />
        </g>
        <text x={mx + mw / 2} y={my + mh + 48} textAnchor="middle" className="fade fill-paper font-sans" fontSize={14} fontWeight={500} style={d(2600)}>Analyst assessment</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── Marketplace: tiles sort into categories ───────────────────────── */

function MarketplaceSort() {
  const [ref, play] = useInView<HTMLDivElement>(0.35);
  const cols = ["Agents", "Accelerators", "Components", "Connectors", "Extensions"];
  const scatter = [
    [140, 90, -14], [40, 150, 9], [-60, 40, -6], [90, -10, 12], [-120, 120, 7],
    [10, 60, -11], [-30, -20, 15], [160, 30, -8], [-90, 80, 10], [60, 120, -15],
    [-150, 10, 6], [120, -30, -12], [-40, 140, 13], [30, -40, -7], [-170, 70, 11],
  ];
  const claims = new Set([0, 4, 6, 11, 13]);
  return (
    <div ref={ref}>
      <svg viewBox="0 0 560 300" className={`dv ${play ? "play" : ""} h-auto w-full`} role="img" aria-label="Diagram: unsorted solution tiles arrange themselves into five categories, then a claims filter highlights the matching listings.">
        {cols.map((c, i) => (
          <g key={c} className="fade" style={d(900 + i * 80)}>
            <text x={i * 114 + 4} y={22} className="fill-paper font-sans" fontSize={14} fontWeight={500}>{c}</text>
            <line x1={i * 114 + 4} y1={32} x2={i * 114 + 98} y2={32} className="stroke-rule" />
          </g>
        ))}
        {Array.from({ length: 15 }).map((_, k) => {
          const col = k % 5, row = Math.floor(k / 5);
          const x = col * 114 + 4, y = 46 + row * 72;
          const [dx, dy, rot] = scatter[k];
          const lit = claims.has(k);
          return (
            <g key={k} className="move" data-to="none" style={{ ...d(200 + k * 55), transformOrigin: "center", transform: play ? "none" : `translate(${dx - x + 230}px, ${dy - y + 90}px) rotate(${rot}deg)` }}>
              <rect x={x} y={y} width={94} height={60} rx={5} className="fill-surface stroke-rule" />
              <rect x={x + 10} y={y + 12} width={16} height={16} rx={3} className="fill-rule" />
              <rect x={x + 10} y={y + 36} width={64} height={5} rx={2.5} className="fill-muted" opacity={0.6} />
              <rect x={x + 10} y={y + 46} width={44} height={5} rx={2.5} className="fill-muted" opacity={0.35} />
              {lit && <rect x={x} y={y} width={94} height={60} rx={5} className="fade fill-marigold/10 stroke-marigold" strokeWidth={1.5} style={d(2700)} />}
            </g>
          );
        })}
        <g className="fade" style={d(2500)}>
          <rect x={4} y={268} width={196} height={28} rx={14} className="fill-marigold" />
          <text x={102} y={287} textAnchor="middle" className="fill-ink font-sans" fontSize={13} fontWeight={500}>Filtered by claims: 5 listings</text>
        </g>
      </svg>
    </div>
  );
}

/* ───────────────────────── Enablement: a battlecard assembles ───────────────────────── */

function EnablementBuild() {
  const [ref, play] = useInView<HTMLDivElement>(0.35);
  const panels = ["Pain points", "Objectives", "Features", "Differentiators", "Customer proof", "Pricing model"];
  return (
    <div ref={ref}>
      <svg viewBox="0 0 560 320" className={`dv ${play ? "play" : ""} h-auto w-full`} role="img" aria-label="Diagram: a one-page battlecard assembles panel by panel, beside a fanned pitch deck and a one-page analyst use case.">
        <rect x={0} y={0} width={340} height={320} rx={8} pathLength={1} className="draw fill-none stroke-rule" style={d(0)} />
        <g className="pop" style={d(250)}>
          <rect x={16} y={16} width={308} height={44} rx={4} className="fill-marigold" />
          <text x={30} y={44} className="fill-ink font-serif" fontSize={18}>Battlecard: heads of underwriting</text>
        </g>
        {panels.map((p, i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const x = 16 + col * 104, y = 74 + row * 118;
          return (
            <g key={p} className="pop" style={d(500 + i * 170)}>
              <rect x={x} y={y} width={96} height={108} rx={4} className="fill-surface stroke-rule" />
              <text x={x + 10} y={y + 22} className="fill-paper font-sans" fontSize={12} fontWeight={500}>{p}</text>
              {[0, 1, 2, 3].map((l) => <rect key={l} x={x + 10} y={y + 36 + l * 15} width={l === 3 ? 40 : 72} height={5} rx={2.5} className="fill-muted" opacity={0.4} />)}
            </g>
          );
        })}
        {[-8, 0, 8].map((rot, i) => (
          <g key={rot} className="move" data-to={`rotate(${rot}deg) translate(${i * 8}px, 0)`} style={{ ...d(1600 + i * 120), transformOrigin: "center", transform: play ? `rotate(${rot}deg) translate(${i * 8}px, 0)` : "none" }}>
            <rect x={380} y={40 + i * 6} width={160} height={92} rx={4} className="fill-surface stroke-rule" />
            <rect x={394} y={56 + i * 6} width={70} height={7} rx={3} className="fill-muted" opacity={0.5} />
            <rect x={394} y={76 + i * 6} width={120} height={36} rx={3} className={i === 2 ? "fill-marigold/30" : "fill-rule"} />
          </g>
        ))}
        <text x={460} y={172} textAnchor="middle" className="fade fill-muted font-sans" fontSize={12} style={d(1900)}>Pitch deck, 10 slides</text>
        <g className="pop" style={d(2100)}>
          <rect x={410} y={196} width={100} height={100} rx={4} className="fill-surface stroke-rule" />
          {[0, 1, 2, 3, 4].map((l) => <rect key={l} x={422} y={212 + l * 14} width={l % 2 ? 56 : 76} height={5} rx={2.5} className="fill-muted" opacity={0.4} />)}
        </g>
        <text x={460} y={314} textAnchor="middle" className="fade fill-muted font-sans" fontSize={12} style={d(2300)}>Analyst use case</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── BlueBridge: two audiences, four channels, one event ───────────────────────── */

function BlueBridgeFlow() {
  const [ref, play] = useInView<HTMLDivElement>(0.35);
  const aud = [
    { t: "Sponsors", s: "pay to present", y: 40, accent: true },
    { t: "Shipping companies", s: "attend free", y: 200, accent: false },
  ];
  const ch = ["Email", "LinkedIn + ads", "Speaker invites", "Print + screens"].map((t, i) => ({ t, y: 20 + i * 76 }));
  const ev = { x: 400, y: 112, w: 150, h: 76 };
  const chX = 200, chW = 140, chH = 36;
  const toCh = (a: (typeof aud)[number], c: (typeof ch)[number]) => curve(150, a.y + 30, chX, c.y + chH / 2);
  const toEv = (c: (typeof ch)[number]) => curve(chX + chW, c.y + chH / 2, ev.x, ev.y + ev.h / 2);
  return (
    <div ref={ref}>
      <svg viewBox="0 0 560 320" className={`dv ${play ? "play" : ""} h-auto w-full`} role="img" aria-label="Diagram: sponsors and shipping companies are reached through email, LinkedIn and ads, speaker invitations, and print and stage screens, all leading to the Athens and Istanbul events.">
        {aud.flatMap((a, ai) => ch.map((c, ci) => <Line key={`${ai}${ci}`} path={toCh(a, c)} delay={400 + ai * 150 + ci * 60} />))}
        {ch.map((c, ci) => <Line key={c.t} path={toEv(c)} accent delay={1000 + ci * 90} />)}
        {aud.map((a, i) => <Node key={a.t} x={0} y={a.y} w={150} h={60} title={a.t} sub={a.s} accent={a.accent} delay={i * 150} size={14} />)}
        {ch.map((c, i) => (
          <g key={c.t} className="pop" style={d(700 + i * 90)}>
            <rect x={chX} y={c.y} width={chW} height={chH} rx={18} className="fill-surface stroke-rule" />
            <text x={chX + chW / 2} y={c.y + 23} textAnchor="middle" className="fill-paper font-sans" fontSize={14}>{c.t}</text>
          </g>
        ))}
        <g className="pop" style={d(1300)}>
          <rect x={ev.x - 8} y={ev.y - 8} width={ev.w + 16} height={ev.h + 16} rx={14} className="pulse fill-none stroke-marigold" />
          <rect x={ev.x} y={ev.y} width={ev.w} height={ev.h} rx={8} className="fill-marigold" />
          <text x={ev.x + 14} y={ev.y + 34} className="fill-ink font-serif" fontSize={19}>Two events</text>
          <text x={ev.x + 14} y={ev.y + 56} className="fill-ink font-sans" fontSize={12} opacity={0.75}>Athens + Istanbul</text>
        </g>
        {aud.map((a, ai) => ch.map((c, ci) => (
          <Packet key={`${ai}-${ci}`} path={`${toCh(a, c)} L${chX + chW} ${c.y + chH / 2} ${toEv(c).replace(/^M[^C]+/, "")}`} play={play}
            delay={1800 + (ai * 4 + ci) * 380} dur={3.2} r={3} className={a.accent ? "fill-marigold" : "fill-paper"} />
        )))}
      </svg>
    </div>
  );
}

/* ───────────────────────── Zenwrath: the content loop ───────────────────────── */

function ZenLoop() {
  const [ref, play] = useInView<HTMLDivElement>(0.35);
  const reduced = useReducedMotion();
  // Total views count up when the diagram arrives; the final value is rendered on the server.
  const [views, setViews] = useState(10);
  useEffect(() => {
    if (!play || reduced) return;
    let raf = 0;
    const start = performance.now() + 900;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / 1600));
      setViews(Math.round(10 * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setViews(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced]);
  const cx = 280, cy = 158, rx = 205, ry = 116;
  const steps = [
    { t: "Spot the trend", s: "what fans are discussing" },
    { t: "Research the scene", s: "context and lore" },
    { t: "Write the hook", s: "one line on screen" },
    { t: "Produce the reel", s: "same frame, every time" },
    { t: "Read Insights", s: "what held attention" },
  ];
  const orbit = `M ${cx} ${cy - ry} A ${rx} ${ry} 0 1 1 ${cx - 0.01} ${cy - ry} Z`;
  return (
    <div ref={ref}>
      <svg viewBox="0 0 560 320" className={`dv ${play ? "play" : ""} h-auto w-full`} role="img" aria-label="Diagram: the Zenwrath content loop, which has drawn 10M+ views in 30 days. Spot the trend, research the scene, write the hook, produce the reel, read Insights, then start again.">
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} pathLength={1} fill="none" className="draw stroke-rule" strokeWidth={1.25} style={d(200)} />
        <g className="pop" style={d(900)}>
          <circle cx={cx} cy={cy} r={66} className="pulse fill-none stroke-marigold" />
          <circle cx={cx} cy={cy} r={58} className="fill-marigold" />
          <text x={cx} y={cy - 22} textAnchor="middle" className="fill-ink font-serif" fontSize={13} fontStyle="italic" opacity={0.85}>Zenwrath</text>
          <text x={cx} y={cy + 8} textAnchor="middle" className="fill-ink font-serif" fontSize={30} aria-label="10M+">{views}M+</text>
          <text x={cx} y={cy + 26} textAnchor="middle" className="fill-ink font-sans" fontSize={10.5} opacity={0.85}>views in 30 days</text>
        </g>
        {steps.map((st, i) => {
          const ang = (-90 + i * 72) * (Math.PI / 180);
          const x = cx + rx * Math.cos(ang), y = cy + ry * Math.sin(ang);
          const w = 146, h = 46;
          return (
            <g key={st.t} className="pop" style={d(400 + i * 160)}>
              <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={6} className={`fill-surface ${i === 2 ? "stroke-marigold" : "stroke-rule"}`} strokeWidth={i === 2 ? 1.5 : 1} />
              <text x={x - w / 2 + 10} y={y - 3} className="fill-paper font-sans" fontSize={13} fontWeight={500}>{st.t}</text>
              <text x={x - w / 2 + 10} y={y + 13} className="fill-muted font-sans" fontSize={10.5}>{st.s}</text>
            </g>
          );
        })}
        <Packet path={orbit} play={play} delay={1600} dur={9} r={4.5} />
        <Packet path={orbit} play={play} delay={6100} dur={9} r={3} className="fill-muted" />
      </svg>
    </div>
  );
}

const visuals: Record<string, { el: ComponentType; caption: string }> = {
  "analyst-relations": { el: ARCycle, caption: "How an evaluation cycle runs: teams feed the RFI and demo, which shape where the platform lands. Generic matrix, not any firm’s chart." },
  marketplace: { el: MarketplaceSort, caption: "From a pile of solutions to a catalog: five types, then filters that surface the right listings." },
  enablement: { el: EnablementBuild, caption: "The three assets: a one-page battlecard, a pitch deck and an analyst use case." },
  bluebridge: { el: BlueBridgeFlow, caption: "Two audiences with opposite motives, reached through four channels, converging on two events." },
  zenwrath: { el: ZenLoop, caption: "The loop every reel goes through. Each pass through Insights shapes the next trend I pick and the next hook I write." },
};

/** The bare diagram for a case study, used inside the home-page work stack. */
export function DiagramFor({ slug }: { slug: string }) {
  const v = visuals[slug];
  if (!v) return null;
  const El = v.el;
  return <El />;
}

export function CaseVisual({ slug }: { slug: string }) {
  const v = visuals[slug];
  if (!v) return null;
  const El = v.el;
  return (
    <figure className="-mx-5 border-y border-rule bg-ink px-2 py-6 sm:mx-0 sm:border sm:p-8 lg:p-12">
      <div className="mx-auto max-w-3xl"><El /></div>
      <figcaption className="mx-auto mt-6 max-w-3xl px-3 text-sm text-muted sm:px-0">{v.caption}</figcaption>
    </figure>
  );
}

/**
 * Diagram panel for an experience entry. With several diagrams it becomes a
 * switcher that advances on its own while in view, pausing on hover or focus.
 */
export function RoleVisual({ slugs, interval = 8000 }: { slugs: string[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const multi = slugs.length > 1;
  const labels: Record<string, string> = { "analyst-relations": "Analyst relations", marketplace: "Marketplace", enablement: "Enablement", bluebridge: "Event marketing", zenwrath: "Content" };

  useEffect(() => {
    if (!multi || !inView || paused || reduced) return;
    const t = setTimeout(() => { setActive((a) => (a + 1) % slugs.length); setRun((r) => r + 1); }, interval);
    return () => clearTimeout(t);
  }, [multi, inView, paused, reduced, active, interval, slugs.length]);

  const pick = (i: number) => { setActive(i); setRun((r) => r + 1); };

  return (
    <div
      ref={ref}
      data-switch={interval}
      className="border border-rule bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {multi && (
        <div role="tablist" aria-label="Diagrams for this role" className="flex border-b border-rule">
          {slugs.map((sl, i) => (
            <button
              key={sl}
              type="button"
              role="tab"
              aria-selected={active === i}
              data-switch-btn={i}
              onClick={() => pick(i)}
              className={`relative flex-1 px-3 py-3 text-left text-sm transition-colors ${active === i ? "text-paper" : "text-muted hover:text-paper"}`}
            >
              {labels[sl] ?? sl}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-rule" />
              {active === i && (
                <span
                  key={run}
                  aria-hidden
                  data-switch-bar=""
                  className="switch-bar absolute bottom-0 left-0 h-[2px] w-full bg-marigold"
                  style={{ animationDuration: `${interval}ms`, animationPlayState: paused || !inView || reduced ? "paused" : "running" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
      {slugs.map((sl, i) => {
        const v = visuals[sl];
        if (!v) return null;
        const El = v.el;
        return (
          <div key={active === i ? `${sl}-${run}` : sl} data-switch-panel={i} hidden={active !== i} className="p-4 sm:p-6">
            <El />
            <p className="mt-4 text-sm text-muted">{v.caption}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Small glyphs for the contributions band ───────────────────────── */

export function Glyph({ kind }: { kind: "research" | "positioning" }) {
  const [ref, play] = useInView<HTMLSpanElement>(0.6);
  return (
    <span ref={ref} className="block h-[3.75rem] lg:h-[4.5rem]">
      <svg viewBox="0 0 72 72" className={`dv ${play ? "play" : ""} h-full w-auto`} aria-hidden>
        {kind === "research" ? (
          <>
            {[[8, 46, 14], [22, 32, 28], [36, 40, 20]].map(([x, y, h], i) => (
              <rect key={i} x={x} y={y} width={9} height={h} rx={1.5} className="pop fill-marigold" style={d(i * 120)} />
            ))}
            <circle cx={46} cy={28} r={14} pathLength={1} className="draw fill-none stroke-marigold" strokeWidth={2.5} style={d(400)} />
            <path d="M56 38 L66 48" pathLength={1} className="draw stroke-marigold" strokeWidth={3} strokeLinecap="round" style={d(900)} />
          </>
        ) : (
          <>
            <path d="M8 8 V64 H66" pathLength={1} className="draw fill-none stroke-marigold" strokeWidth={2} style={d(0)} />
            <path d="M37 8 V64 M8 36 H66" pathLength={1} className="draw fill-none stroke-marigold" strokeWidth={1} strokeDasharray="1" opacity={0.5} style={d(300)} />
            <circle cx={22} cy={50} r={3.5} className="pop fill-marigold" opacity={0.4} style={d(500)} />
            <circle cx={30} cy={44} r={3.5} className="pop fill-marigold" opacity={0.4} style={d(580)} />
            <circle cx={54} cy={20} r={6} className="pop fill-marigold" style={d(800)} />
          </>
        )}
      </svg>
    </span>
  );
}
