import Link from "next/link";
import { site } from "@/lib/site";

// Placeholder wordmark. Swap for the real logo, e.g.
// <Image src="/logo.svg" alt={site.name} width={140} height={32} priority />
export function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className="font-display text-2xl font-semibold tracking-tight"
    >
      bombay<span className="text-accent">craft</span>
    </Link>
  );
}
