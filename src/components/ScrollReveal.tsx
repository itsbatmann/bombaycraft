"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Parts marked `data-reveal` rise in turn as their section enters.
// Elements marked `data-speed` drift with the scroll (below 1 is slower).
// Content is visible without JS.
export function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>("section, footer").forEach((section) => {
        const parts = section.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!parts.length) return;
        gsap.from(parts, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed) || 1;
        gsap.fromTo(
          el,
          { y: (1 - speed) * -160 },
          {
            y: (1 - speed) * 160,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
