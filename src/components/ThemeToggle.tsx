"use client";

import { useSyncExternalStore } from "react";

type Theme = "day" | "night";

// The theme lives on <html data-theme>, set before paint by the script in
// the layout. Every toggle on the page reads it from there.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const readTheme = (): Theme => (document.documentElement.dataset.theme === "day" ? "day" : "night");

// Switches between Day in Bombay and Night in Bombay, and remembers it.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  const toggle = () => {
    const next: Theme = readTheme() === "day" ? "night" : "day";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("bc-theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "day" ? "Switch to night in Bombay" : "Switch to day in Bombay"}
      className={`caps inline-flex items-center gap-2 transition-colors hover:text-gold ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        {theme === "day" ? (
          <>
            <circle cx="12" cy="12" r="4.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line key={a} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${a} 12 12)`} />
            ))}
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        )}
      </svg>
      {theme === "day" ? "Day in Bombay" : "Night in Bombay"}
    </button>
  );
}
