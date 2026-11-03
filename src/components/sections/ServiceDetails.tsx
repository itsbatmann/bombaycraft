import { mailto, services } from "@/lib/site";

const ROMAN = ["I", "II", "III", "IV", "V"];

// Each craft in full: the name stays pinned on the left while what you get
// scrolls past on the right.
export function ServiceDetails() {
  return (
    <section aria-labelledby="details-heading" className="frame bg-bg pb-28 md:pb-44">
      <div className="caps rule flex justify-between gap-6 border-b pb-4">
        <h2 id="details-heading">II — In detail</h2>
        <span className="text-dim">What each craft includes</span>
      </div>

      {services.map((s, i) => (
        <article key={s.slug} className="grid gap-10 pt-20 md:pt-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="font-serif text-3xl text-gold italic">{ROMAN[i]}</p>
              <h3 className="heading mt-4">{s.title}</h3>
              <p className="script mt-4 text-4xl">{s.tagline}</p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal className="max-w-[46ch] text-xl leading-snug text-dim">
              {s.summary}
            </p>
            <h4 className="caps mt-12 text-dim">What you get</h4>
            <ul className="mt-6 space-y-4">
              {s.deliverables.map((item) => (
                <li key={item} data-reveal className="flex items-baseline gap-4 font-serif text-2xl">
                  <span className="mt-[0.9em] block size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <p className="caps text-dim">{s.stack}</p>
              <a href={mailto(`${s.title} with Bombaycraft`)} className="pill">
                {s.action}
              </a>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
