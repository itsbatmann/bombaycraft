"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const principles = [
  { name: "By hand", text: "Every layout, line of code and frame is made by people, for your brand alone." },
  { name: "On time", text: "We run like the city's trains: a clear timetable and no surprises." },
  { name: "Built to last", text: "Fast, accessible and easy to change, long after the launch party." },
];

// The atelier: who we are, read as you scroll.
export function Manifesto({ label = "I — The atelier" }: { label?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = SplitText.create(".manifesto", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".manifesto", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="atelier-heading" className="frame bg-bg py-28 md:py-44">
      <div className="caps rule flex justify-between gap-6 border-b pb-4">
        <span>{label}</span>
        <span className="text-dim">Est. Bombay</span>
      </div>

      <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12">
        <h2 id="atelier-heading" data-reveal className="heading lg:col-span-12">
          Made by hand,
          <span className="script mt-2 block pl-[12%] text-[1.15em] whitespace-nowrap">in Bombay</span>
        </h2>
        <p className="manifesto lede lg:col-span-7 lg:col-start-6 lg:text-[clamp(1.75rem,2.6vw,3rem)]">
          We design and build websites, web apps, CRMs and CMS platforms, and shoot the films that
          bring them to life, with the patience of a Bombay sign painter.
        </p>
      </div>

      <ul className="mt-24 grid gap-12 md:mt-32 md:grid-cols-3">
        {principles.map((p, i) => (
          <li key={p.name} data-reveal className="rule border-t pt-6">
            <p className="font-serif text-6xl text-gold italic [font-variation-settings:'opsz'_96]">{["i", "ii", "iii"][i]}</p>
            <h3 className="mt-6 font-serif text-3xl italic">{p.name}</h3>
            <p className="mt-3 max-w-[34ch] text-sm text-dim">{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
