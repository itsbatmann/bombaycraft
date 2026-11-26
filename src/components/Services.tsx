"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";
import { createOrbit, type Scene3D } from "@/lib/three-scene";

gsap.registerPlugin(ScrollTrigger);

/*
  Camera to code: one lens element holds on the left and turns as the
  page scrolls, while the four crafts pass on the right, each lit as it
  reaches the middle of the screen. The second and last 3D moment.
*/
export function Services() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = root.current;
    const cv = canvas.current;
    const host = stage.current;
    if (!sec || !cv || !host) return;
    const items = Array.from(sec.querySelectorAll<HTMLElement>(".services__item"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) items.forEach((it) => it.classList.toggle("is-active", it === e.target));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((it) => io.observe(it));
    items[0]?.classList.add("is-active");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => io.disconnect();
    let scene: Scene3D | null = null;
    try {
      scene = createOrbit(cv, 0xf2f3fa);
      host.classList.add("is-live");
    } catch {
      return () => io.disconnect();
    }
    const onMove = (e: PointerEvent) => scene?.setPointer((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
    window.addEventListener("pointermove", onMove, { passive: true });
    const st = ScrollTrigger.create({ trigger: sec, start: "top bottom", end: "bottom top", scrub: true, onUpdate: (s) => scene?.setScroll(s.progress) });
    const vis = new IntersectionObserver(([e]) => scene?.setVisible(e.isIntersecting), { rootMargin: "10% 0px" });
    vis.observe(sec);
    return () => {
      io.disconnect();
      vis.disconnect();
      st.kill();
      window.removeEventListener("pointermove", onMove);
      scene?.dispose();
    };
  }, []);

  return (
    <section ref={root} id="studio" className="services" aria-labelledby="services-title">
      <div ref={stage} className="services__stage">
        <canvas ref={canvas} aria-hidden="true" />
        <img className="services__still" src="/archive/blackmagic-cinema-camera-with-lens.jpg" alt="The lens of a cinema camera, focus scale facing up" width={1600} height={1072} loading="lazy" decoding="async" />
      </div>
      <div className="services__list">
        <h2 id="services-title" data-reveal>
          Camera to code
        </h2>
        <p className="services__intro" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          The people who light the shot build the site it plays on, and the system that runs behind it.
        </p>
        <ol>
          {services.map((s) => (
            <li key={s.name} className="services__item">
              <h3>{s.name}</h3>
              <p>{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
