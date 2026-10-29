import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <div className="mb-16 flex justify-center">
        <Logo className="h-16 w-auto" />
      </div>
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold">This page wandered off.</h1>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}
