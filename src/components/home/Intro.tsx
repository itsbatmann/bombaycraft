"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Words flashed during the preloader. The last one stays on screen.
const words = ["Websites", "MERN apps", "CRMs", "CMS", "Media & video", "bombaycraft"];

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

      if (reduced) {
        gsap.set(".preloader", { display: "none" });
        return;
      }

      html.style.overflow = "hidden";
      const count = { value: 0 };
      const step = LOAD / words.length;

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

      words.forEach((_, i) => {
        if (i === 0) return;
        tl.to(".pl-words", { yPercent: (-100 * i) / words.length, duration: 0.45 }, 0.2 + i * step);
      });

      // Exit: content fades, then the curtain lifts in columns.
      tl.to(".pl-content", { opacity: 0, y: -24, duration: 0.5, ease: "power2.in" }, "+=0.4")
        .to(".pl-col", {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          stagger: { each: 0.06, from: "center" },
        }, "-=0.1")
        .set(".preloader", { display: "none" })
        .call(() => {
          html.style.overflow = "";
        })
        // Hero entrance
        .from(".hero-line", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.09 }, "-=0.55")
        .from(".hero-fade", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "<0.35")
        .fromTo(
          ".hero-video",
          { clipPath: "inset(14% 8% 0% 8% round 48px)" },
          { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.3, ease: "power4.inOut" },
          "<",
        );

      // Ambient motion inside the showreel placeholder
      gsap.to(".blob-a", { xPercent: 40, yPercent: 20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".blob-b", { xPercent: -35, yPercent: -25, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".blob-c", { xPercent: 25, yPercent: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".rec-dot", { opacity: 0.15, duration: 0.6, repeat: -1, yoyo: true, ease: "steps(1)" });
      gsap.to(".play-ring", { rotation: 360, duration: 14, repeat: -1, ease: "none", transformOrigin: "50% 50%" });

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
            <div className="h-[1.15em] overflow-hidden font-display text-5xl font-semibold md:text-8xl">
              <div className="pl-words">
                {words.map((w, i) =>
                  i === words.length - 1 ? (
                    <div key={w} className="h-[1.15em] text-center">
                      bombay<span className="text-accent">craft</span>
                    </div>
                  ) : (
                    <div key={w} className="h-[1.15em] text-center">
                      {w}
                    </div>
                  ),
                )}
              </div>
            </div>

            <svg viewBox="0 0 600 120" className="mt-8 w-full max-w-xl overflow-visible">
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

      {/* Hero */}
      <section className="container-x pt-14 md:pt-20">
        <p className="hero-fade eyebrow">Digital studio · Made in Bombay</p>
        <h1 className="mt-5 font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl md:text-8xl">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">We build websites,</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">CRMs, CMS</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">
              &amp; media that <em className="text-accent">moves</em>.
            </span>
          </span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-xl text-lg text-muted md:text-xl">
            Creative websites, MERN stack web apps, custom CRMs and CMS platforms, plus the
            films and media that bring your brand to life.
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-6 py-3 text-base">
              Start a project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-ink px-6 py-3 font-medium hover:bg-ink hover:text-paper"
            >
              What we do
            </Link>
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section aria-label="Showreel" className="container-x pt-12 pb-16 md:pt-16">
        <div className="hero-video relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink text-paper sm:aspect-video lg:aspect-[21/9]">
          {/*
            Drop the showreel in here when it's ready:
            <video className="absolute inset-0 h-full w-full object-cover"
              src="/showreel.mp4" poster="/showreel.jpg" autoPlay muted loop playsInline />
          */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="blob-a absolute -top-1/4 -left-1/4 h-3/4 w-3/4 rounded-full bg-accent/50 blur-3xl" />
            <div className="blob-b absolute -right-1/4 -bottom-1/3 h-3/4 w-3/4 rounded-full bg-sea/70 blur-3xl" />
            <div className="blob-c absolute top-1/3 left-1/3 h-1/2 w-1/2 rounded-full bg-glow/30 blur-3xl" />
            <div className="grain absolute inset-0 opacity-25 mix-blend-overlay" />
          </div>

          <div className="relative flex h-full flex-col justify-between p-5 md:p-8">
            <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase">
              <span className="flex items-center gap-2">
                <span className="rec-dot h-2 w-2 rounded-full bg-accent" />
                Showreel 2026
              </span>
              <span className="text-paper/60">Bombay, IN</span>
            </div>

            <div className="text-center">
              <p className="text-xs tracking-[0.3em] text-paper/60 uppercase">Our showreel</p>
              <p className="mt-3 font-display text-5xl font-semibold italic md:text-8xl">Coming soon</p>
            </div>

            <div className="flex items-end justify-between gap-4">
              <p className="max-w-xs text-sm text-paper/70">
                Websites, apps, CRMs and films from the city that never stops.
              </p>
              <div className="relative grid h-24 w-24 shrink-0 place-items-center md:h-28 md:w-28" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="play-ring absolute inset-0 h-full w-full">
                  <defs>
                    <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="fill-paper text-[10px] tracking-[0.25em] uppercase">
                    <textPath href="#ring">Play reel · Coming soon · </textPath>
                  </text>
                </svg>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
