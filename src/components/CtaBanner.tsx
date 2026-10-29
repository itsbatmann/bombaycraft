import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="container-x py-20">
      <div className="rounded-3xl bg-accent px-8 py-14 text-accent-ink md:px-16 md:py-20">
        <h2 className="max-w-3xl font-display text-4xl leading-tight font-semibold md:text-5xl">
          Got a website, CRM or film in mind? Let&apos;s build it together.
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-paper hover:bg-ink/85"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
}
