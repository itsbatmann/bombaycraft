import type { CSSProperties } from "react";
import { steps } from "@/lib/content";

/* How a project runs: four verbs in a quiet row, each with one sentence. */
export function Process() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <h2 id="process-title" data-reveal>
        How a project runs
      </h2>
      <ol className="process__row">
        {steps.map((s, i) => (
          <li key={s.verb} data-reveal style={{ "--d": `${i * 70}ms` } as CSSProperties}>
            <h3>{s.verb}</h3>
            <p>{s.line}</p>
          </li>
        ))}
      </ol>
      <figure className="process__band" data-reveal>
        <img src="/archive/akeley-motion-picture-camera-new-york-1922.jpg" alt="Inside an Akeley motion picture camera, photographed in 1922" width={1264} height={1600} loading="eager" decoding="async" data-parallax />
        <img src="/archive/single-lens-bell-and-howell-eyemo-35mm.jpg" alt="A Bell and Howell Eyemo 35mm camera against a brick wall" width={1281} height={1600} loading="eager" decoding="async" data-parallax />
        <video muted loop playsInline autoPlay preload="metadata" poster="/archive/film-reels-poster.jpg" aria-hidden="true" data-parallax>
          <source src="/archive/film-reels.webm" type="video/webm" />
        </video>
      </figure>
    </section>
  );
}
