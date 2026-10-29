"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// An endless strip of services, like a local train rolling past.
export function Marquee({ items }: { items: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".marquee-track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    },
    { scope: root },
  );

  // Two identical halves; sliding by -50% loops seamlessly.
  const half = [...items, ...items].map((item, i) => (
    <span key={i} className="flex items-center gap-8 pr-8">
      <span>{item}</span>
      <span className="text-accent" aria-hidden="true">
        ✦
      </span>
    </span>
  ));

  return (
    <div ref={root} className="overflow-hidden border-y border-ink bg-glow py-5 text-ink">
      <div className="marquee-track flex w-max font-display text-3xl font-semibold whitespace-nowrap md:text-5xl">
        <div className="flex">{half}</div>
        <div className="flex" aria-hidden="true">{half}</div>
      </div>
    </div>
  );
}
