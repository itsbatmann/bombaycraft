import type { CSSProperties } from "react";

/*
  The manifesto: two lines of light display type stepped across the
  width, two pale discs behind them, and a short paragraph in each
  opposite corner. The reveal observer sits on each line's mask, never
  on the clipped text inside it.
*/
export function Statement() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="manifesto__stage">
        <span className="manifesto__disc manifesto__disc--a" aria-hidden="true" data-reveal />
        <span className="manifesto__disc manifesto__disc--b" aria-hidden="true" data-reveal style={{ "--d": "120ms" } as CSSProperties} />
        <h2 id="manifesto-title" className="manifesto__title lines">
          <span className="line" data-reveal>
            <span className="manifesto__l1">make it like,</span>
          </span>
          <span className="line" data-reveal style={{ "--d": "110ms" } as CSSProperties}>
            <span className="manifesto__l2">really good.</span>
          </span>
        </h2>
      </div>
      <p className="manifesto__left" data-reveal style={{ "--d": "220ms" } as CSSProperties}>
        We make films with soul and websites with heart. Every build has a purpose, a plan and (we&rsquo;ll say it) a proper finish.
      </p>
      <p className="manifesto__right" data-reveal style={{ "--d": "260ms" } as CSSProperties}>
        We bring film and real-time web to everyone, everywhere. A brand film, a product launch or the CRM behind it, we turn a brief into a stop-everything moment.
      </p>
    </section>
  );
}
