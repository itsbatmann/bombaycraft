import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="frame flex min-h-svh flex-col justify-between bg-bg py-[var(--margin)]">
      <div className="caps flex items-start justify-between gap-6">
        <Logo className="h-12 w-auto md:h-16" />
        <p className="text-dim">404</p>
      </div>
      <div className="pb-[10svh] text-center">
        <h1 className="heading">
          Wrong platform
          <span className="script mt-3 block text-[0.9em]">this train has left</span>
        </h1>
        <p className="lede mx-auto mt-10 max-w-[26ch]">The page you wanted is not here. The home page is one stop away.</p>
        <Link href="/" className="pill mt-12">
          Back to home
        </Link>
      </div>
      <p className="caps text-center text-dim">Bombay</p>
    </section>
  );
}
