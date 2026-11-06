"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  The motion layer, in four parts:

  1. The signature move: the headline's lines rise out of their own masks
     on load, then the sentence and the action follow.
  2. An entrance for the parts of every section, choreographed by kind:
     headings settle, text rises, lists arrive row by row, pictures open
     from a slight scale.
  3. Feedback under the hand, which lives in CSS on the controls.
  4. One moving picture: the hero clip, plus a scroll-linked drift on the
     hero plate and on the painted title card.

  One rule governs all of it: nothing below the fold is ever made
  invisible. Scroll-triggered entrances move on transform alone, so every
  heading, paragraph and picture is on the page and readable whether or
  not the script has run, the trigger has fired, or the animation has
  finished. Opacity is used only in the hero's load sequence, which fires
  immediately. Under `prefers-reduced-motion` the whole layer is skipped
  and the page is already in its finished state.
*/
export function Motion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // 1. The masked headline: the one loud moment.
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      if (lines.length) {
        const inners: HTMLElement[] = [];
        for (const line of lines) {
          line.style.overflow = "hidden";
          line.style.paddingBottom = "0.09em";
          line.style.marginBottom = "-0.09em";
          const span = document.createElement("span");
          span.style.display = "block";
          while (line.firstChild) span.appendChild(line.firstChild);
          line.appendChild(span);
          inners.push(span);
        }
        gsap.from(inners, {
          yPercent: 112,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.11,
        });
      }

      // The hero's supporting parts may fade: they are on screen at once.
      gsap.from("[data-hero-sub]", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.4,
      });

      gsap.from("[data-hero-plate]", {
        yPercent: 8,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        delay: 0.2,
      });

      // 4. Scroll-linked drift on the hero plate.
      const plate = document.querySelector<HTMLElement>("[data-hero-plate]");
      if (plate) {
        gsap.to(plate, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: plate,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Section entrances. Transform only: nothing is ever hidden.
      for (const section of gsap.utils.toArray<HTMLElement>("section, footer")) {
        if (section.querySelector("[data-hero-line]")) continue;

        const heads = section.querySelectorAll<HTMLElement>("h2, h3");
        const parts = section.querySelectorAll<HTMLElement>("[data-reveal]");
        const rows = section.querySelectorAll<HTMLElement>("li");

        const trigger: ScrollTrigger.Vars = {
          trigger: section,
          start: "top 88%",
          once: true,
        };

        if (heads.length) {
          gsap.from(heads, {
            y: 26,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: trigger,
          });
        }

        if (parts.length) {
          gsap.from(parts, {
            y: 30,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: trigger,
          });
        }

        // A list arrives row by row, quicker than a block.
        if (rows.length && rows.length < 40) {
          gsap.from(rows, {
            y: 12,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.045,
            scrollTrigger: { ...trigger, start: "top 82%" },
          });
        }
      }

      // Pictures settle from a slight scale as they arrive.
      for (const fig of gsap.utils.toArray<HTMLElement>("figure")) {
        const img = fig.querySelector("img");
        if (!img) continue;
        gsap.from(img, {
          scale: 1.07,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: fig, start: "top 92%", once: true },
        });
      }

      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
