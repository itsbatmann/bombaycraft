import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="btn-primary hidden md:inline-flex">
          Start a project
        </Link>

        {/* Mobile menu: no JS needed */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-line px-4 py-2 text-sm font-medium">
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-paper p-2 shadow-lg"
          >
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 hover:bg-line/50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
