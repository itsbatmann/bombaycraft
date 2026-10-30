"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Bambaiya words, and what each one means for your project.
const words = [
  { word: "Jhakaas", mr: "झकास", pos: "adj.", meaning: "brilliant, top-notch", use: "The standard every pixel and every frame is held to." },
  { word: "Bindaas", mr: "बिनधास्त", pos: "adj.", meaning: "fearless, carefree", use: "How we pitch ideas: boldly, without hesitation." },
  { word: "Ekdum", mr: "एकदम", pos: "adv.", meaning: "completely, totally", use: "Everything finished. Nothing left half-done." },
  { word: "Bhidu", mr: "भिडू", pos: "n.", meaning: "buddy, partner", use: "How we work with you: side by side, start to finish." },
  { word: "Waat lagli", mr: "वाट लागली", pos: "phr.", meaning: "it has all gone wrong", use: "What never happens to your launch." },
];

// On a desktop the section holds still and the words slide past sideways
// as you scroll down; on a phone they simply stack.
export function Glossary({ label = "IV — The Bambaiya dictionary" }: { label?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const hold = root.current!.querySelector<HTMLElement>(".gloss-hold")!;
        const track = root.current!.querySelector<HTMLElement>(".gloss-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        // The section is exactly as tall as the sideways distance it travels.
        const size = () => (hold.style.height = `${distance() + window.innerHeight}px`);
        size();
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: hold, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true, onRefreshInit: size },
        });
        return () => {
          hold.style.height = "";
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="glossary-heading" className="bg-bg">
      <div className="gloss-hold">
        <div className="flex flex-col justify-center gap-12 overflow-hidden py-28 md:sticky md:top-0 md:h-svh md:py-0">
          <div className="frame">
            <div className="caps rule flex justify-between gap-6 border-b pb-4">
              <span>{label}</span>
              <span className="text-dim">Words we work by</span>
            </div>
          </div>

          <div className="gloss-track frame flex flex-col gap-6 md:w-max md:flex-row md:items-stretch md:gap-8">
            <h2 id="glossary-heading" className="heading flex shrink-0 flex-col justify-end md:w-[34vw] md:pr-10">
              Words we
              <span className="script mt-2 block pl-[12%] text-[1.15em]">work by</span>
              <span className="caps mt-10 hidden text-dim md:block">Scroll to turn the pages</span>
            </h2>

            {words.map((w, i) => (
              <article
                key={w.word}
                className={`relative flex shrink-0 flex-col justify-between overflow-hidden p-8 md:h-[62svh] md:w-[min(46vw,620px)] md:p-12 ${
                  i % 2 ? "bg-night text-ivory" : "bg-bg-2"
                }`}
              >
                {/* The word in Devanagari, large and faint behind */}
                <span
                  lang="mr"
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -bottom-10 font-marathi text-[clamp(7rem,14vw,14rem)] leading-none whitespace-nowrap text-[#c9a45c] opacity-[0.12]"
                >
                  {w.mr}
                </span>
                <div className="relative flex items-baseline justify-between gap-4">
                  <span className="caps opacity-70">{w.pos}</span>
                  <span lang="mr" className="font-marathi text-2xl text-[#c9a45c]">
                    {w.mr}
                  </span>
                </div>
                <div className="relative mt-16 md:mt-0">
                  <h3 className="font-serif text-[clamp(3.25rem,6vw,6rem)] leading-none tracking-[-0.03em] [font-variation-settings:'opsz'_96]">
                    {w.word}
                  </h3>
                  <p className="mt-4 font-serif text-2xl italic">{w.meaning}</p>
                  <p className="mt-6 max-w-[32ch] text-sm opacity-75">{w.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
