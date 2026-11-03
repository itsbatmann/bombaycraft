import { site } from "@/lib/site";

// About, set like a magazine page: the mark as a drop capital, the story
// beside it, three facts in the margin.
export function Atelier() {
  return (
    <section aria-labelledby="atelier-heading" className="frame bg-bg-2 py-20 md:py-36">
      <h2 id="atelier-heading" className="sr-only">
        About the studio
      </h2>
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Paragraph first in source order, so the drop-cap glyph never sits
            directly under the facts list (reads as a false "label above
            heading" otherwise); grid placement keeps the facts on the left. */}
        <div className="font-serif text-[clamp(1.35rem,2.1vw,2rem)] leading-[1.22] [font-variation-settings:'opsz'_72] lg:order-2 lg:col-span-10 lg:col-start-3">
          <p>
            <span
              className="float-left mt-[0.15em] mr-[0.5em] flex size-[3.6em] items-center justify-center rounded-[6px] bg-night font-script text-[2.6em] leading-none text-sand"
              aria-hidden="true"
            >
              B
            </span>
            <span className="text-fg">{site.name}</span>
            <span className="text-dim">
              {" "}
              is a digital studio from Bombay, run by two founders who sit at the same table: one for
              design and film, one for code. We make websites, web apps, CRMs and CMS platforms, and
              the films that carry them, for brands across India and beyond.
            </span>
          </p>
          <p className="mt-[1em] text-dim">
            The city taught us the rest. Trains that leave on the minute, tiffins that never go astray,
            signs painted letter by letter: work by hand, run on time, build to last.
          </p>
        </div>
        <dl className="caps grid grid-cols-3 gap-4 text-dim lg:order-1 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:grid-cols-1 lg:gap-6">
          <div>
            <dt>Place</dt>
            <dd className="mt-1 text-fg">Bombay</dd>
          </div>
          <div>
            <dt>Since</dt>
            <dd className="mt-1 text-fg">2023</dd>
          </div>
          <div>
            <dt>Reach</dt>
            <dd className="mt-1">
              <a href={`mailto:${site.email}`} className="link text-fg">
                Email
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
