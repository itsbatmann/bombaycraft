"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createDive, type Scene3D } from "@/lib/three-scene";

gsap.registerPlugin(ScrollTrigger);

/*
  Going deeper: a panel that holds for three screens while a diver
  descends with the scroll, from a bright surface to the seabed where the
  ring waits. A depth readout and five captions mark the stages of a
  project on the way down.
*/
const stages = [
  { at: 0, depth: "0 m", line: "The brief. What it is for, who it is for, and when it has to be live." },
  { at: 0.2, depth: "10 m", line: "The script and the sitemap, written in the same meeting." },
  { at: 0.42, depth: "20 m", line: "The shoot. Cinema camera, motion control, grade and sound." },
  { at: 0.64, depth: "30 m", line: "The build. Real-time, around the footage, fast on a phone." },
  { at: 0.86, depth: "40 m", line: "Launch. Hosting, analytics and the CRM, handed over with the training." },
];

export function Dive() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sec = section.current;
    const host = panel.current;
    const cv = canvas.current;
    if (!sec || !host || !cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      host.classList.add("is-static");
      return;
    }
    let scene: Scene3D | null = null;
    try {
      scene = createDive(cv);
      host.classList.add("is-live");
    } catch {
      host.classList.add("is-static");
    }
    const onMove = (e: PointerEvent) => scene?.setPointer((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
    window.addEventListener("pointermove", onMove, { passive: true });
    let last = -1;
    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scene?.setScroll(self.progress);
        const q = Math.round(self.progress * 40);
        if (q !== last) {
          last = q;
          setProgress(self.progress);
        }
      },
    });
    const io = new IntersectionObserver(([e]) => scene?.setVisible(e.isIntersecting), { rootMargin: "10% 0px" });
    io.observe(sec);
    return () => {
      st.kill();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene?.dispose();
    };
  }, []);

  const metres = Math.round(progress * 40);
  const stage = [...stages].reverse().find((s) => progress >= s.at) ?? stages[0];

  return (
    <section ref={section} className="dive" aria-labelledby="dive-title">
      <div className="dive__stage">
        <div ref={panel} className="dive__panel">
          <canvas ref={canvas} aria-hidden="true" />
          <h2 id="dive-title" className="dive__title">
            Going deeper
          </h2>
          <p className="dive__depth" aria-live="off">
            {metres} m
          </p>
          <div className="dive__caption">
            <p key={stage.depth} className="dive__line">
              {stage.line}
            </p>
            <p className="dive__count">
              {stages.indexOf(stage) + 1} of {stages.length}
            </p>
          </div>
          <ol className="dive__static">
            {stages.map((s) => (
              <li key={s.depth}>
                <strong>{s.depth}</strong> {s.line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
