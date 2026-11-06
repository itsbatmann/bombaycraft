import Link from "next/link";
import { site } from "@/lib/site";

/*
  "Invitation over a cropped name": the close and the footer in one
  field. The wordmark fills the bottom, larger than the screen can hold,
  pushed down so the edge cuts through the letters.
*/
export function Footer() {
  return (
    <footer className="relative flex flex-col overflow-hidden bg-surface pt-[var(--gap)]">
      <div className="frame lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-7">
          <h2 className="heading">
            Let&apos;s roll
            <br />
            something
          </h2>
          <p className="lede mt-6">
            A film, a cinematic shoot, a website, or the system behind it.
            Tell us which, and when you need it.
          </p>
          <Link href="/contact" className="button mt-7">
            Start a brief
          </Link>
        </div>

        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-5 lg:col-start-8 lg:mt-0"
        >
          <div>
            <h3 className="small text-muted uppercase">Pages</h3>
            <ul className="mt-3 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link font-bold">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/credits" className="link font-bold">
                  Credits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="small text-muted uppercase">Reach us</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`mailto:${site.email}`} className="link font-bold break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link font-bold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link font-bold"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link font-bold"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* The credits row sits directly above the wordmark's cap line. */}
      <div className="frame mt-16 flex flex-wrap justify-between gap-x-8 gap-y-2 pt-8 text-[length:var(--step-small)] text-muted">
        <p>
          © {site.name} 2026 · {site.address.locality}, {site.address.region} ·{" "}
          {site.hours}
        </p>
        <p>
          Placeholder footage from Wikimedia Commons ·{" "}
          <Link href="/credits" className="link font-bold text-ink">
            credits
          </Link>
        </p>
      </div>

      {/* The name, larger than the viewport can hold, cropped by the edge. */}
      <p
        aria-hidden="true"
        className="frame mt-6 translate-y-[30%] font-black tracking-[-0.055em] whitespace-nowrap text-ink uppercase"
        style={{ fontSize: "var(--step-mega)", lineHeight: 0.8 }}
      >
        Bombaycraft
      </p>
    </footer>
  );
}
