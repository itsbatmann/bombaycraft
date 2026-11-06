import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

// A plain bar: the mark, four links, one action. No chrome, no blur, no
// floating pill. On a phone the links wrap to their own row rather than
// hiding behind a hamburger.
export function Nav({ eager = false }: { eager?: boolean }) {
  return (
    <header className="frame flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-[var(--margin)]">
      <Logo eager={eager} />

      <Link
        href="/contact"
        className="button order-2 h-12 min-h-12 px-5 md:order-3 md:h-14 md:min-h-14 md:px-7"
      >
        Start a brief
      </Link>

      <nav
        aria-label="Main"
        className="order-3 flex w-full flex-wrap items-center gap-x-7 gap-y-2 md:order-2 md:w-auto md:gap-x-8"
      >
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} className="small link uppercase">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
