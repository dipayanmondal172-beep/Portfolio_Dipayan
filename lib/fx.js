/**
 * Effects engine, framework-free so the site and the single-file preview share it.
 * Every effect checks prefers-reduced-motion and cleans up after itself.
 */

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function cssRgb(name) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(",");
  return v || "128,128,128";
}

/** Drifting nodes that link up when close, and reach toward the pointer. */
export function networkField(canvas) {
  const ctx = canvas.getContext("2d");
  const host = canvas.parentElement;
  let w = 0, h = 0, dpr = 1, pts = [], raf = 0, visible = false;
  let pointer = null;
  let rule = cssRgb("--rule"), accent = cssRgb("--accent"), muted = cssRgb("--muted");
  const still = reducedMotion();

  function seed() {
    const n = Math.max(26, Math.min(90, Math.round((w * h) / 15000)));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.8,
    }));
  }
  function resize() {
    const r = host.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (still) draw();
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const link = Math.min(150, Math.max(90, w / 9));
    for (const p of pts) {
      if (!still) {
        if (pointer) {
          const dx = pointer.x - p.x, dy = pointer.y - p.y, d = Math.hypot(dx, dy);
          if (d < 200 && d > 1) { p.vx += (dx / d) * 0.012; p.vy += (dy / d) * 0.012; }
        }
        p.vx *= 0.985; p.vy *= 0.985;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < 0.12) { p.vx += (Math.random() - 0.5) * 0.05; p.vy += (Math.random() - 0.5) * 0.05; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${muted},${(1 - d / link) * 0.42})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const p of pts) {
      let near = 0;
      if (pointer) {
        const d = Math.hypot(pointer.x - p.x, pointer.y - p.y);
        if (d < 190) {
          near = 1 - d / 190;
          ctx.strokeStyle = `rgba(${accent},${near * 0.7})`;
          ctx.beginPath(); ctx.moveTo(pointer.x, pointer.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
      }
      ctx.fillStyle = near > 0 ? `rgba(${accent},${0.5 + near * 0.5})` : `rgba(${muted},0.75)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r + near * 1.6, 0, Math.PI * 2); ctx.fill();
    }
  }
  function loop() { draw(); raf = visible ? requestAnimationFrame(loop) : 0; }

  const onMove = (e) => { const r = canvas.getBoundingClientRect(); pointer = { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onLeave = () => { pointer = null; };
  const ro = new ResizeObserver(resize); ro.observe(host);
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf && !still) raf = requestAnimationFrame(loop);
  });
  io.observe(canvas);
  const mo = new MutationObserver(() => { rule = cssRgb("--rule"); accent = cssRgb("--accent"); muted = cssRgb("--muted"); if (still) draw(); });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  if (finePointer()) { host.addEventListener("pointermove", onMove); host.addEventListener("pointerleave", onLeave); }
  resize();
  return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); };
}

/** Sticky card stack: each card recedes as the next one slides over it. */
export function stackCards(container) {
  const cards = Array.from(container.querySelectorAll("[data-stack-card]"));
  const wide = window.matchMedia("(min-width: 768px)");
  let raf = 0;
  function update() {
    raf = 0;
    cards.forEach((card, i) => {
      const inner = card.querySelector("[data-stack-inner]");
      if (!inner) return;
      const next = cards[i + 1];
      if (!wide.matches || reducedMotion() || !next) { inner.style.transform = ""; inner.style.setProperty("--dim", "0"); return; }
      const r = card.getBoundingClientRect(), n = next.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (r.bottom - n.top) / r.height));
      inner.style.transform = `scale(${1 - t * 0.07})`;
      inner.style.setProperty("--dim", (t * 0.55).toFixed(3));
    });
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
  return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
}

/** Elements drift toward the pointer, then spring back. */
export function magnetic(el, strength = 0.3) {
  if (!finePointer() || reducedMotion()) return () => {};
  const move = (e) => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength * 1.2}px)`;
  };
  const leave = () => { el.style.transform = ""; };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
}
