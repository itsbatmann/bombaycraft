import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col bg-bg">
      <Nav eager />

      <div className="frame mt-auto grid gap-y-8 pt-24 pb-[var(--gap)] lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <h1 data-hero-line className="display lg:col-span-7">
          Cut
          <br />
          here
        </h1>

        <div className="lg:col-span-4 lg:col-start-9">
          <p data-hero-sub className="lede">
            This page is not in the edit. The home page is one click away.
          </p>
          <Link href="/" className="button mt-7">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
