"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "light" | "dark") || "dark");
  }, []);

  const toggle = () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <button
      type="button"
      data-theme-toggle=""
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-rule text-paper transition-colors hover:border-paper"
    >
      <Sun size={16} aria-hidden className="icon-sun absolute" />
      <Moon size={16} aria-hidden className="icon-moon absolute" />
    </button>
  );
}
