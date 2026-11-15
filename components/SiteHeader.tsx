"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active-section indicator on the home page.
  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith("/work") ? "work" : "");
      return;
    }
    const ids = nav.map((n) => n.href.split("#")[1]);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome, pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock background scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled || open ? "border-b border-rule bg-ink/95 backdrop-blur" : "border-b border-transparent"}`}>
      <div className="page flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight" aria-label={`${profile.name}, home`}>
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="ml-auto mr-6 hidden md:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-1 transition-colors ${isActive ? "text-paper" : "text-muted hover:text-paper"}`}
                  >
                    {item.label}
                    <span aria-hidden className={`absolute -bottom-0.5 left-0 h-px bg-marigold transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="page h-[calc(100dvh-4rem)] overflow-y-auto bg-ink pb-10 md:hidden">
          <ul className="border-t border-rule">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-4 font-serif text-3xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={profile.resume} download>Download my resume</a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>Email me</a>
          </div>
        </nav>
      )}
    </header>
  );
}
