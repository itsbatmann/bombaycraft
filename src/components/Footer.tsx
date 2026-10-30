import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LiveClock } from "./sections/LiveClock";
import { site } from "@/lib/site";

// The close: details in small capitals, then the name across the page.
export function Footer() {
  return (
    <footer className="frame overflow-hidden bg-bg pt-20 pb-[var(--margin)] text-fg">
      <div className="caps rule grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo className="h-14 w-auto" />
        </div>
        <div>
          <p className="text-dim">Studio</p>
          <p className="mt-3">
            {site.address.locality} {site.address.postalCode}, India
            <br />
            {site.hours}
          </p>
          <p className="mt-2 text-gold">
            <LiveClock />
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-dim">Pages</p>
          <ul className="mt-3 space-y-1">
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
          <p className="text-dim">Elsewhere</p>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={`mailto:${site.email}`} className="link">
                Email
              </a>
            </li>
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
        <div className="lg:text-right">
          <p className="text-dim">Mood</p>
          <ThemeToggle className="mt-3" />
        </div>
      </div>

      <p className="mt-24 text-center font-serif text-[18.5vw] leading-[0.8] tracking-[-0.045em] [font-variation-settings:'opsz'_96]" aria-hidden="true">
        Bombay<span className="script text-[0.82em]">craft</span>
      </p>

      <div className="caps mt-10 flex flex-wrap justify-between gap-4 text-dim">
        <p>© {site.name} 2026. Made by hand in Bombay.</p>
        <p>
          Hero footage from Wikimedia Commons.{" "}
          <Link href="/credits" className="link text-fg">
            Credits
          </Link>
        </p>
      </div>
    </footer>
  );
}
