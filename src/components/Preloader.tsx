"use client";

import { useEffect, useRef } from "react";

/*
  The name arrives out of code. A field of source tokens flickers, the
  twelve cells in the middle settle one by one into KALA & CODES while a
  count runs to 100, then the sheet lifts and the page is there. Finished
  by about 2.2 seconds, skipped under reduced motion.
*/
const WORD = "KALA & CODES";
const POOL = "{}[]()<>=/;:+-*&|!?#$%01";
const CODE = [
  "const studio = { film, stills, web, systems }",
  "camera.lookAt(scene.position)",
  "export default function Site()",
  "lenis.on('scroll', ScrollTrigger.update)",
  "await video.play()",
  "renderer.render(scene, camera)",
  "return <Reel src={cut} />",
  "if (focus < 1) rack(focus + delta)",
];

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const finish = () => {
      html.classList.add("is-loaded");
      el.remove();
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    html.classList.add("is-loading");

    const cells = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-cell]"));
    const count = el.querySelector<HTMLElement>("[data-count]");
    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-code]"));
    const start = performance.now();
    const DURATION = 800;
    const settled = new Set<number>();
    let timer = 0;
    let ready = false;
    // Fonts only: the 3D assets stream in behind the page and must not hold the title back.
    document.fonts.ready.then(() => {
      ready = true;
    });

    const tick = () => {
      const t = performance.now() - start;
      const p = Math.min(1, t / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      if (count) count.textContent = String(Math.round(eased * 100));
      cells.forEach((c, i) => {
        if (settled.has(i)) return;
        const ch = WORD[i];
        if (ch === " ") {
          settled.add(i);
          return;
        }
        if (t > 240 + i * 60) {
          c.textContent = ch;
          c.classList.add("is-set");
          settled.add(i);
        } else {
          c.textContent = POOL[Math.floor(Math.random() * POOL.length)];
        }
      });
      lines.forEach((l, i) => {
        if (Math.random() < 0.08) l.style.opacity = String(0.25 + Math.random() * 0.5);
        l.style.transform = `translateY(${(-t * (0.012 + i * 0.002)) % 40}px)`;
      });
      const done = p >= 1 && settled.size === WORD.length && (ready || t > 2400);
      if (done) {
        el.classList.add("is-done");
        html.classList.add("is-loaded");
        el.addEventListener("transitionend", finish, { once: true });
        window.setTimeout(finish, 1000);
        return;
      }
      timer = window.setTimeout(tick, 48);
    };
    timer = window.setTimeout(tick, 48);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="loader__code">
        {CODE.concat(CODE).map((l, i) => (
          <span key={i} data-code>
            {l}
          </span>
        ))}
      </div>
      <p className="loader__word">
        {WORD.split("").map((ch, i) => (
          <span key={i} data-cell className={ch === " " ? "is-space" : ""}>
            {ch === " " ? " " : POOL[i % POOL.length]}
          </span>
        ))}
      </p>
      <p className="loader__count" data-count>
        0
      </p>
    </div>
  );
}
