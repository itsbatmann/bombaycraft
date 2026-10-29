import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold">This page wandered off.</h1>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}
