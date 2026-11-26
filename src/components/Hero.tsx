"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScene, type Scene3D } from "@/lib/three-scene";

gsap.registerPlugin(ScrollTrigger);

/*
  The first screen: one sentence, then the studio's optics in a rounded
  panel inset from the page edges. The camera leans with the pointer; the
  cluster turns and the panel drifts a little as the page scrolls.
*/
export function Hero() {
  const panel = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = panel.current;
    const cv = canvas.current;
    if (!host || !cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      host.classList.add("is-static");
      return;
    }
    let scene: Scene3D | null = null;
    try {
      scene = createScene(cv, { ground: 0xdfe2f3 });
      host.classList.add("is-live");
    } catch {
      host.classList.add("is-static");
      return;
    }
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      scene?.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const st = ScrollTrigger.create({
      trigger: host,
      start: "top 80%",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => scene?.setScroll(self.progress),
    });
    const io = new IntersectionObserver(([e]) => scene?.setVisible(e.isIntersecting), { rootMargin: "10% 0px" });
    io.observe(host);
    return () => {
      st.kill();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene?.dispose();
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title lines">
          <span className="line">
            <span data-line style={{ "--i": 0 } as CSSProperties}>
              Films, and the websites
            </span>
          </span>
          <span className="line">
            <span data-line style={{ "--i": 1 } as CSSProperties}>
              they play in.
            </span>
          </span>
        </h1>
        <p className="hero__lead" data-load style={{ "--d": "520ms" } as CSSProperties}>
          A studio that writes, shoots and finishes films, then builds the real-time sites and the systems behind them. One team, camera to code.
        </p>
      </div>

      <div ref={panel} className="hero__panel" data-load style={{ "--d": "300ms" } as CSSProperties}>
        <canvas ref={canvas} aria-hidden="true" />
        <img className="hero__still" src="/photos/p338.jpg" alt="A figure in a hooded coat facing a misty sea" width={1200} height={1500} fetchPriority="high" />
      </div>
    </section>
  );
}
