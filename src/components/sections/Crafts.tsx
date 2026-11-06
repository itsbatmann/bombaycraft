import Link from "next/link";
import { comingSoon, services } from "@/lib/site";

/*
  What the studio makes: the camera first, then the things that carry
  what it shoots. The heading holds at the left while the rows travel,
  and the held column carries its own content so that half of the screen
  is never bare.
*/
export function Crafts() {
  return (
    <section
      aria-labelledby="crafts-heading"
      className="bg-surface py-[var(--gap)]"
    >
      <div className="frame lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <h2 id="crafts-heading" className="heading">
              What we
              <br />
              make
            </h2>

            <p className="lede mt-7">
              Five things, one team. Most projects are two or three of them at
              once.
            </p>

            <ul className="mt-8 space-y-2">
              {services.map((craft) => (
                <li key={craft.slug}>
                  <a
                    href={`#craft-${craft.slug}`}
                    className="link text-[length:var(--step-lead)] leading-tight font-black tracking-[-0.03em] uppercase"
                  >
                    {craft.title}
                  </a>
                </li>
              ))}
            </ul>

            <Link href="/services" className="button mt-8">
              Every service in full
            </Link>
          </div>
        </div>

        <div className="mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {services.map((craft, i) => (
            <article
              key={craft.slug}
              id={`craft-${craft.slug}`}
              data-reveal
              className={i === 0 ? "scroll-mt-8" : "mt-14 scroll-mt-8 lg:mt-20"}
            >
              <h3 className="text-[length:var(--step-lead)] leading-none font-black tracking-[-0.04em] uppercase">
                {craft.title}
              </h3>
              <p className="mt-3 max-w-[44ch] leading-[1.5]">{craft.summary}</p>

              <ul className="mt-6 space-y-3">
                {craft.deliverables.map((item) => (
                  <li key={item} className="leading-tight text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>

              <p className="small mt-6 text-accent uppercase">{craft.stack}</p>
            </article>
          ))}

          {/* Said plainly rather than implied. */}
          <article data-reveal className="mt-14 bg-surface-2 p-7 lg:mt-20">
            <h3 className="text-[length:var(--step-lead)] leading-none font-black tracking-[-0.04em] uppercase">
              {comingSoon.title}
            </h3>
            <p className="mt-3 max-w-[44ch] leading-[1.5]">{comingSoon.line}</p>
            <p className="small mt-5 text-accent uppercase">From 2027</p>
          </article>
        </div>
      </div>
    </section>
  );
}
