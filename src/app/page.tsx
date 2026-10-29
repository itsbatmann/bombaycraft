import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { VideoBlock } from "@/components/VideoBlock";
import { Intro } from "@/components/home/Intro";
import { Marquee } from "@/components/home/Marquee";
import { projects, services } from "@/lib/site";

const process = [
  { step: "01", title: "Discover", text: "We learn your business, your users and what success looks like." },
  { step: "02", title: "Design", text: "We map the experience and design every screen, frame and flow." },
  { step: "03", title: "Build", text: "We develop, shoot and edit with regular check-ins along the way." },
  { step: "04", title: "Launch", text: "We go live, measure what works and keep improving with you." },
];

export default function Home() {
  return (
    <>
      <Intro />

      {/* Statement */}
      <section className="bg-ink text-paper">
        <div className="container-x py-24 md:py-40">
          <p data-reveal className="eyebrow text-glow">Digital studio · Made in Bombay</p>
          <h1
            data-reveal
            className="mt-6 max-w-6xl font-display text-5xl leading-[1.02] font-semibold tracking-tight md:text-8xl"
          >
            We build websites, CRMs, CMS &amp; media that <em className="font-normal text-glow">moves</em>.
          </h1>
          <div data-reveal className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg text-paper/70 md:text-xl">
              Creative websites, MERN stack web apps, custom CRMs and CMS platforms, plus the
              films and media that bring your brand to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center rounded-full border border-paper/40 px-7 py-3.5 font-medium hover:border-glow hover:bg-glow hover:text-ink"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <Marquee items={services.map((s) => s.short)} />

      {/* Services */}
      <section aria-labelledby="services-heading" className="container-x py-20 md:py-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 id="services-heading" className="mt-3 font-display text-4xl font-semibold md:text-6xl">
              Built in Bombay,
              <br />
              made for everywhere.
            </h2>
          </div>
          <Link href="/services" className="font-medium underline underline-offset-4 hover:text-accent">
            All services
          </Link>
        </div>
        <ul data-reveal className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} className="bg-paper p-8 md:p-10">
              <span className="font-display text-accent">0{i + 1}</span>
              <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted">{s.summary}</p>
            </li>
          ))}
          <li className="bg-ink p-8 text-paper md:p-10">
            <h3 className="font-display text-2xl font-semibold">Something else in mind?</h3>
            <p className="mt-3 text-paper/70">If it lives on a screen, we can probably build it.</p>
            <Link href="/contact" className="mt-6 inline-flex font-medium text-glow underline underline-offset-4">
              Let&apos;s talk
            </Link>
          </li>
        </ul>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work-heading" className="container-x pb-20 md:pb-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading" className="mt-3 font-display text-4xl font-semibold md:text-6xl">
              Recent projects
            </h2>
          </div>
          <Link href="/work" className="font-medium underline underline-offset-4 hover:text-accent">
            All work
          </Link>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.slice(0, 2).map((p) => (
            <li key={p.title} data-reveal>
              <VideoBlock
                src={p.video}
                poster={p.poster}
                label={`${p.title} preview`}
                className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ink"
              >
                <div className="grid h-full place-items-center text-xs tracking-[0.3em] text-paper/50 uppercase">
                  Film coming soon
                </div>
              </VideoBlock>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="text-muted">
                {p.category} · {p.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="bg-ink text-paper">
        <div className="container-x py-20 md:py-28">
          <div data-reveal>
            <p className="eyebrow">How we work</p>
            <h2 id="process-heading" className="mt-3 font-display text-4xl font-semibold md:text-6xl">
              From brief to launch
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.step} data-reveal className="border-t border-paper/20 pt-6">
                <span className="font-display text-glow">{p.step}</span>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-paper/70">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
