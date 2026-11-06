import Link from "next/link";
import { Frame } from "@/components/Frame";
import { comingSoon, mailto, services } from "@/lib/site";

/*
  Each service on its own panel, alternating one tone step so neighbours
  never share a ground. Two of them carry a frame, so the page is not
  five text blocks in a row.
*/
const TONE = ["bg-bg", "bg-surface", "bg-bg", "bg-surface", "bg-bg"];
const WITH_FRAME = new Set([0, 1]);

export function ServiceDetails() {
  return (
    <>
      {services.map((craft, i) => (
        <section
          key={craft.slug}
          id={craft.slug}
          aria-labelledby={`${craft.slug}-heading`}
          className={`${TONE[i % TONE.length]} py-[var(--gap)]`}
        >
          <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-8">
            <div className="md:col-span-6">
              <h2 id={`${craft.slug}-heading`} className="heading">
                {craft.title}
              </h2>
              <p className="lede mt-7">{craft.summary}</p>
              <a
                href={mailto(`${craft.action} — Bombaycraft`)}
                className="button mt-8"
              >
                {craft.action}
              </a>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <h3 className="text-[length:var(--step-lead)] leading-none font-black tracking-[-0.03em] uppercase">
                What you get
              </h3>
              <ul className="mt-5 space-y-3.5">
                {craft.deliverables.map((item) => (
                  <li key={item} className="leading-tight text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-bold text-accent">{craft.stack}</p>
            </div>

            {WITH_FRAME.has(i) ? (
              <div className="md:col-span-12">
                <Frame
                  slate={craft.title}
                  meta="Coming soon"
                  ratio="aspect-[5/2]"
                  note={`A ${craft.title.toLowerCase()} frame, reserved for the studio’s own work.`}
                />
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section
        aria-labelledby="coming-heading"
        className="bg-surface-2 py-[var(--gap)]"
      >
        <div className="frame grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-8">
          <h2 id="coming-heading" className="heading md:col-span-6">
            {comingSoon.title}
          </h2>
          <div className="md:col-span-5 md:col-start-8">
            <p className="lede">{comingSoon.line}</p>
            <p className="small mt-5 text-accent uppercase">From 2027</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="all-crafts-heading" className="bg-bg py-[var(--gap)]">
        <div className="frame grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-8">
          <h2 id="all-crafts-heading" className="heading md:col-span-6">
            Need more
            <br />
            than one?
          </h2>
          <div className="md:col-span-5 md:col-start-8">
            <p className="lede">
              Most projects are two or three of these at once. One team, one
              timeline, one invoice.
            </p>
            <Link href="/contact" className="button mt-7">
              Start a brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
