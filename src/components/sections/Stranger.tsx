import { LiveClock } from "./LiveClock";
import { mailto, site } from "@/lib/site";

// The close: a sentence, a square, two links. Nothing else.
export function Stranger() {
  return (
    <section aria-labelledby="stranger-heading" className="frame bg-bg pt-32 pb-28 md:pt-40">
      <h2 id="stranger-heading" className="sr-only">
        Contact
      </h2>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <p className="font-serif text-[clamp(1.4rem,2.5vw,2.1rem)] leading-[1.15] italic [font-variation-settings:'opsz'_72] lg:col-span-5">
          Namaskar. A website, an app, a CRM or a film: if it needs making, we would like to hear
          about it.
        </p>
        <div className="flex size-44 flex-col justify-between rounded-[6px] bg-night p-4 text-ivory lg:col-span-2 lg:col-start-8">
          <span className="font-script text-4xl leading-none text-sand">Namaskar</span>
          <span className="caps text-ivory/85">
            <LiveClock />
          </span>
        </div>
        <div className="lg:col-span-3 lg:col-start-10">
          <p className="font-sans font-medium">Have something in mind?</p>
          <ul className="mt-5 space-y-2">
            <li>
              <a href={mailto("A new project with Bombaycraft")} className="underline decoration-1 underline-offset-4 hover:text-dim">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 hover:text-dim">
                Instagram
              </a>
            </li>
          </ul>
          <p className="mt-6 text-base text-dim">Bombay. We reply within one working day.</p>
        </div>
      </div>
    </section>
  );
}
