import Link from "next/link";

// A small live-looking piece of each craft, sitting inside the sentence.
const slot = "mx-[0.15em] inline-flex h-[1em] w-[1.9em] translate-y-[0.12em] items-center justify-center overflow-hidden rounded-[0.18em] align-baseline";

const Browser = () => (
  <span className={`${slot} bg-night`} aria-hidden="true">
    <span className="flex h-[0.55em] w-[1.5em] items-center gap-[0.08em] rounded-[2px] bg-ivory px-[0.1em]">
      <span className="size-[0.16em] rounded-full bg-night/30" />
      <span className="h-[0.14em] flex-1 rounded-full bg-night/15" />
    </span>
  </span>
);
const Toggle = () => (
  <span className={`${slot} bg-sand`} aria-hidden="true">
    <span className="flex h-[0.5em] w-[1.3em] items-center rounded-full bg-night p-[0.05em]">
      <span className="ml-auto aspect-square h-full rounded-full bg-ivory" />
    </span>
  </span>
);
const Pipeline = () => (
  <span className={`${slot} items-end gap-[0.06em] bg-night px-[0.25em] pb-[0.16em]`} aria-hidden="true">
    <span className="h-[0.3em] w-[0.22em] bg-sand" />
    <span className="h-[0.5em] w-[0.22em] bg-sand" />
    <span className="h-[0.7em] w-[0.22em] bg-ivory" />
  </span>
);
const Rec = () => (
  <span className={`${slot} gap-[0.1em] bg-night text-ivory`} aria-hidden="true">
    <span className="size-[0.22em] rounded-full bg-terracotta" />
    <span className="font-sans text-[0.3em] font-medium tracking-[0.1em]">REC</span>
  </span>
);

// One paragraph does the work of a feature grid.
export function WhatWeDo() {
  return (
    <section aria-labelledby="do-heading" className="frame bg-bg pt-28 pb-24 md:pt-40 md:pb-32">
      <h2 id="do-heading" className="sr-only">
        What we do
      </h2>
      <p className="font-serif text-[clamp(1.3rem,2.5vw,2.25rem)] leading-[1.2] tracking-[-0.01em] [font-variation-settings:'opsz'_72] lg:max-w-none lg:pr-[8%]">
        We design websites
        <Browser /> people remember, build the web apps
        <Toggle /> and CRMs
        <Pipeline /> your team runs on, and shoot films
        <Rec /> that bring a brand to life.
      </p>
      <div className="mt-16 grid gap-8 lg:grid-cols-12">
        <p className="text-dim lg:col-span-5 lg:col-start-7">
          One studio in Bombay for the whole job: strategy, design, code, content and film, with the
          same people from the first call to launch.
        </p>
        <Link href="/services" className="pill self-start lg:col-span-2 lg:justify-self-end">
          Every service
        </Link>
      </div>
    </section>
  );
}
