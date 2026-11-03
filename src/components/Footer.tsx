import Link from "next/link";
import { LiveClock } from "./sections/LiveClock";
import { site } from "@/lib/site";

// The close, on the inverse field: the name first, the ways to reach the
// studio under it, the small links beside them.
export function Footer() {
  return (
    <footer className="frame flex min-h-[90svh] flex-col bg-night pt-12 pb-[var(--margin)] text-ivory">
      <p className="font-serif text-[18vw] leading-[0.82] tracking-[-0.045em] [font-variation-settings:'opsz'_96]" aria-hidden="true">
        Bombay<span className="font-script text-[0.82em] tracking-normal text-sand">craft</span>
      </p>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <ul className="font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight text-sand lg:col-span-5">
          <li>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-ivory">
              {site.email}
            </a>
          </li>
          <li>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-ivory">
              {site.phone}
            </a>
          </li>
          <li className="text-ivory/70">
            {site.address.locality} {site.address.postalCode}, India
          </li>
        </ul>

        <div className="caps grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          <nav aria-label="Footer">
            <p className="text-ivory/55">Pages</p>
            <ul className="mt-3 space-y-1.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/credits" className="link">
                  Credits
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-ivory/55">Elsewhere</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="link">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-ivory/55">Studio</p>
            <p className="mt-3">{site.hours}</p>
            <p className="mt-1.5 text-sand">
              <LiveClock />
            </p>
          </div>
        </div>
      </div>

      <div className="caps mt-auto flex flex-wrap justify-between gap-4 pt-24 text-ivory/55">
        <p>© {site.name} 2026. Made by hand in Bombay.</p>
        <a href="#main" className="link text-ivory">
          Back to top
        </a>
      </div>
    </footer>
  );
}
