import { mailto, services } from "@/lib/site";

const ROMAN = ["I", "II", "III", "IV", "V"];
const BULBS = 44;

// The five crafts, billed like a single-screen cinema programme.
export function NowShowing({ label = "II — Now showing" }: { label?: string }) {
  return (
    <section aria-labelledby="showing-heading" className="relative overflow-hidden bg-bg-2 py-28 md:py-44">
      <div className="frame">
        <div className="caps rule flex justify-between gap-6 border-b pb-4">
          <span>{label}</span>
          <span className="text-dim">Daily, Mon to Sat</span>
        </div>

        {/* Marquee bulbs */}
        <div className="mt-10 flex justify-between" aria-hidden="true">
          {Array.from({ length: BULBS }, (_, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-gold"
              style={{ animation: `bulb 1.6s ease-in-out ${(i % 4) * 0.4}s infinite` }}
            />
          ))}
        </div>

        <h2 id="showing-heading" data-reveal className="heading mt-14 text-center">
          Now showing
          <span className="script mt-3 block text-[0.9em]">five crafts, made in Bombay</span>
        </h2>

        <ul className="mt-20">
          {services.map((s, i) => (
            <li
              key={s.slug}
              data-reveal
              className="group rule relative grid gap-6 overflow-hidden border-t py-10 md:grid-cols-12 md:items-center md:py-12"
            >
              {/* A wash of gold that rises behind the row on hover */}
              <span
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gold/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="relative font-serif text-3xl text-gold italic md:col-span-1">{ROMAN[i]}</span>
              <h3 className="relative font-serif text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em] transition-all duration-500 [font-variation-settings:'opsz'_96] group-hover:pl-4 group-hover:italic md:col-span-6">
                {s.slide}
              </h3>
              <div className="relative md:col-span-4">
                <p className="script text-3xl">{s.tagline}</p>
                <p className="mt-3 text-sm text-dim">{s.summary}</p>
                <p className="caps mt-3">{s.stack}</p>
              </div>
              <a
                href={mailto(`${s.title} with Bombaycraft`)}
                className="caps link relative md:col-span-1 md:justify-self-end"
                aria-label={`${s.action}: email us`}
              >
                Book
              </a>
            </li>
          ))}
        </ul>
        <div className="rule border-t" />
      </div>
    </section>
  );
}
