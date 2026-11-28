"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/*
  The postcard. Full-bleed footage behind, a perforated stamp in the
  middle holding its own clip, the name split either side. Both layers
  cut to a new shot every couple of seconds, the way the reference does.
  The intro reel lands its last frame in .hero__panel, so that element
  keeps its name.
*/
const BACK = ["pier", "road", "grass", "runway", "dusk", "peaks"];
const STAMP = ["drive", "muse", "neon", "station", "tokyo", "shades"];
const CUT_MS = 1700;

function Layer({ clips, className }: { clips: string[]; className: string }) {
  return (
    <div className={className}>
      {clips.map((c, i) => (
        <video key={c} src={`/intro/${c}.mp4`} muted loop playsInline preload={i < 2 ? "auto" : "metadata"} aria-hidden="true" />
      ))}
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = root.current;
    if (!sec) return;
    const html = document.documentElement;
    const layers = [sec.querySelector(".hero__bg"), sec.querySelector(".hero__panel")].filter(Boolean) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (layer: HTMLElement, i: number) => {
      const vids = Array.from(layer.querySelectorAll("video"));
      vids.forEach((v, k) => {
        const on = k === i;
        v.classList.toggle("is-on", on);
        if (on) {
          if (v.preload !== "auto") v.preload = "auto";
          if (!reduced) v.play().catch(() => {});
        } else v.pause();
      });
    };
    const idx = [0, 1];
    layers.forEach((l, k) => show(l, idx[k]));

    let timer = 0;
    if (!reduced) {
      timer = window.setInterval(() => {
        layers.forEach((l, k) => {
          const n = l.querySelectorAll("video").length;
          idx[k] = (idx[k] + 1) % n;
          show(l, idx[k]);
        });
      }, CUT_MS);
    }

    // Pause the footage and restore the header's ink once the postcard has scrolled away.
    const io = new IntersectionObserver(
      ([e]) => {
        html.dataset.ink = e.isIntersecting ? "light" : "dark";
        if (!e.isIntersecting) layers.forEach((l) => l.querySelectorAll("video").forEach((v) => v.pause()));
        else if (!reduced) layers.forEach((l, k) => show(l, idx[k]));
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0.05 },
    );
    io.observe(sec);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      delete html.dataset.ink;
    };
  }, []);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <Layer clips={BACK} className="hero__bg" />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__centre">
        <div className="hero__stamp" data-load style={{ "--d": "200ms" } as CSSProperties}>
          <Layer clips={STAMP} className="hero__panel" />
        </div>
      </div>

      <h1 id="hero-title" className="hero__title">
        <span className="hero__word hero__word--l lines">
          <span className="line">
            <span data-line style={{ "--i": 0 } as CSSProperties}>626</span>
          </span>
        </span>
        <span className="hero__word hero__word--r lines">
          <span className="line">
            <span data-line style={{ "--i": 1 } as CSSProperties}>studio</span>
          </span>
          <span className="hero__handle" data-load style={{ "--d": "600ms" } as CSSProperties}>
            films, and the websites they play in
          </span>
        </span>
      </h1>
    </section>
  );
}
