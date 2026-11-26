"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Entrances that fire once and pictures that drift a few percent inside
  their frames. Rendered last inside the page, so it runs only after the
  page's own markup has hydrated and never writes styles React is about
  to compare.
*/
export function PageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const ctx = gsap.context(() => {
      if (reduced) return;
      for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      }
    });

    // The work cards lean a few degrees toward the pointer, and settle back when it leaves.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
    const onMove = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", `${x * 6}deg`);
      card.style.setProperty("--rx", `${-y * 6}deg`);
    };
    const onLeave = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    };
    if (fine && !reduced) {
      cards.forEach((c) => {
        c.addEventListener("pointermove", onMove);
        c.addEventListener("pointerleave", onLeave);
      });
    }

    return () => {
      reveal.disconnect();
      ctx.revert();
      cards.forEach((c) => {
        c.removeEventListener("pointermove", onMove);
        c.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return null;
}
