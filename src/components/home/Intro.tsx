"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/Logo";
import { VideoBlock } from "@/components/VideoBlock";
import { showreel, site } from "@/lib/site";

gsap.registerPlugin(useGSAP);

// Words flashed during the preloader, ending on the logo.
const words = ["Websites", "MERN apps", "CRMs", "CMS", "Media & video"];

// Marine Drive's "Queen's Necklace": streetlights along a curved bay,
// lit one by one as the page loads.
const LIGHTS = 28;
const lights = Array.from({ length: LIGHTS }, (_, i) => {
  const t = i / (LIGHTS - 1);
  const x = (1 - t) ** 2 * 20 + 2 * (1 - t) * t * 300 + t ** 2 * 580;
  const y = (1 - t) ** 2 * 20 + 2 * (1 - t) * t * 170 + t ** 2 * 20;
  return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
});

const LOAD = 2.4; // seconds the counter takes to reach 100
const COLUMNS = 6;

export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Ambient motion in the "coming soon" backdrop
      if (!reduced) {
        gsap.to(".blob-a", { xPercent: 40, yPercent: 20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".blob-b", { xPercent: -35, yPercent: -25, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".blob-c", { xPercent: 25, yPercent: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".rec-dot", { opacity: 0.15, duration: 0.6, repeat: -1, yoyo: true, ease: "steps(1)" });
        gsap.fromTo(".scroll-line", { scaleY: 0, transformOrigin: "top" }, {
          scaleY: 1, duration: 1.2, repeat: -1, ease: "power2.inOut", yoyo: true,
        });
      }

      if (reduced) {
        gsap.set(".preloader", { display: "none" });
        return;
      }

      html.style.overflow = "hidden";
      const count = { value: 0 };
      const steps = words.length + 1; // words + logo
      const step = LOAD / steps;

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.from(".pl-meta", { opacity: 0, y: 12, stagger: 0.08, duration: 0.6 }, 0)
        .to(
          count,
          {
            value: 100,
            duration: LOAD,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(Math.round(count.value)).padStart(3, "0");
              }
            },
          },
          0.2,
        )
        .to(".pl-light", { opacity: 1, duration: 0.25, stagger: LOAD / LIGHTS, ease: "power1.out" }, 0.2);

      for (let i = 1; i < steps; i++) {
        tl.to(".pl-words", { yPercent: (-100 * i) / steps, duration: 0.45 }, 0.2 + i * step);
      }

      // Exit: content fades, the curtain lifts in columns onto the showreel.
      tl.to(".pl-content", { opacity: 0, y: -24, duration: 0.5, ease: "power2.in" }, "+=0.5")
        .to(".pl-col", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          stagger: { each: 0.06, from: "center" },
        }, "-=0.1")
        .from(".hero-media", { scale: 1.25, duration: 2, ease: "power3.out" }, "<0.1")
        .set(".preloader", { display: "none" })
        .call(() => {
          html.style.overflow = "";
        })
        .from(".hero-fade", { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.1 }, "-=1.2");

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* Preloader. Server-rendered so there is no flash of content before it. */}
      <div className="preloader fixed inset-0 z-[100] text-paper" aria-hidden="true">
        <div className="absolute inset-0 flex">
          {Array.from({ length: COLUMNS }, (_, i) => (
            <div key={i} className="pl-col -mx-px h-full flex-1 bg-ink" />
          ))}
        </div>

        <div className="pl-content relative flex h-full flex-col justify-between p-5 md:p-10">
          <div className="flex justify-between text-xs tracking-[0.2em] text-paper/60 uppercase">
            <span className="pl-meta">Est. Bombay</span>
            <span className="pl-meta">19.0760° N, 72.8777° E</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-28 overflow-hidden font-display text-5xl font-semibold md:h-44 md:text-8xl">
              <div className="pl-words">
                {words.map((w) => (
                  <div key={w} className="flex h-28 items-center justify-center md:h-44">
                    {w}
                  </div>
                ))}
                <div className="flex h-28 items-center justify-center md:h-44">
                  <Image
                    src="/brand/logo-light.png"
                    alt=""
                    width={1000}
                    height={453}
                    priority
                    className="h-full w-auto py-1"
                  />
                </div>
              </div>
            </div>

            <svg viewBox="0 0 600 120" className="mt-6 w-full max-w-xl overflow-visible">
              <defs>
                <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {lights.map((l, i) => (
                <g key={i}>
                  <circle cx={l.x} cy={l.y} r="2.5" className="fill-paper/15" />
                  <circle cx={l.x} cy={l.y} r="3.5" filter="url(#glow)" className="pl-light fill-glow opacity-0" />
                </g>
              ))}
            </svg>
            <p className="pl-meta mt-4 text-xs tracking-[0.25em] text-paper/50 uppercase">
              Lighting up Marine Drive
            </p>
          </div>

          <div className="flex items-end justify-between">
            <span className="pl-meta max-w-[12rem] text-xs tracking-[0.2em] text-paper/60 uppercase">
              Websites · MERN · CRM · CMS · Media
            </span>
            <span ref={counter} className="pl-meta font-display text-6xl leading-none tabular-nums md:text-9xl">
              000
            </span>
          </div>
        </div>
      </div>

      {/* Full-screen showreel. No navbar, nothing in the way of the film. */}
      <section aria-label="Showreel" className="relative h-svh min-h-[560px] overflow-hidden bg-ink text-paper">
        <div className="hero-media absolute inset-0">
          <VideoBlock
            src={showreel.src}
            poster={showreel.poster}
            label={`${site.name} showreel`}
            priority
            className="h-full w-full"
          >
            <div className="absolute inset-0" aria-hidden="true">
              <div className="blob-a absolute -top-1/4 -left-1/4 h-3/4 w-3/4 rounded-full bg-accent/60 blur-3xl" />
              <div className="blob-b absolute -right-1/4 -bottom-1/3 h-3/4 w-3/4 rounded-full bg-sea/70 blur-3xl" />
              <div className="blob-c absolute top-1/3 left-1/3 h-1/2 w-1/2 rounded-full bg-glow/25 blur-3xl" />
              <div className="grain absolute inset-0 opacity-25 mix-blend-overlay" />
            </div>
          </VideoBlock>
        </div>
        {/* Soft vignette keeps overlay text readable on any footage */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/60" aria-hidden="true" />

        <div className="relative flex h-full flex-col justify-between p-5 md:p-10">
          <div className="flex items-start justify-between">
            <div className="hero-fade">
              <Logo tone="light" priority className="h-14 w-auto md:h-20" />
            </div>
            <span className="hero-fade flex items-center gap-2 text-xs tracking-[0.25em] uppercase">
              <span className="rec-dot h-2 w-2 rounded-full bg-accent" />
              Showreel ’26
            </span>
          </div>

          {!showreel.src && (
            <p className="hero-fade text-center font-display text-6xl font-light italic md:text-[9rem] md:leading-none">
              Coming soon
            </p>
          )}

          <div className="hero-fade flex flex-col items-center gap-3 text-[0.7rem] tracking-[0.3em] text-paper/70 uppercase">
            Scroll
            <span className="scroll-line block h-10 w-px bg-paper/70" />
          </div>
        </div>
      </section>
    </div>
  );
}
