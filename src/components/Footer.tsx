import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-paper">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-paper/70">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-paper/50">
            Explore
          </h2>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-2 text-sm not-italic">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-paper/50">
            Get in touch
          </h2>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>
          </p>
          <p>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">
              {site.phone}
            </a>
          </p>
          <p className="text-paper/70">
            {site.address.locality}, {site.address.region}, India
          </p>
          <p className="flex gap-4 pt-2">
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              Instagram
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              LinkedIn
            </a>
          </p>
        </address>
      </div>
      <div className="border-t border-paper/10">
        <p className="container-x py-6 text-xs text-paper/50">
          © {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
