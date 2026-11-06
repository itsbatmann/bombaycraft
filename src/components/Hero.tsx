import Link from "next/link";
import { Nav } from "./Nav";
import { services } from "@/lib/site";

/*
  A deliberate typographic first screen. The studio has no reel to show
  yet, and a borrowed clip would say nothing true about it, so the type
  carries the screen: the statement at display size across the full
  width, the sentence and the action under it, and the five things the
  studio makes listed along the foot where a strip of thumbnails would
  otherwise run.
*/
export function Hero() {
  return (
    <section className="flex min-h-svh flex-col bg-bg">
      <Nav eager />

      <div className="frame mt-auto pt-20">
        <h1 className="display">
          <span data-hero-line className="block">
            We shoot
          </span>
          <span data-hero-line className="block">
            and build
          </span>
        </h1>

        <div className="mt-10 grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <p data-hero-sub className="lede lg:col-span-6">
            A studio making video, cinematic shots, and the websites and
            systems they live on.
          </p>

          <div
            data-hero-sub
            className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end"
          >
            <Link href="#brief" className="button">
              Start a brief
            </Link>
            <Link href="/work" className="small link uppercase">
              See the work
            </Link>
          </div>
        </div>
      </div>

      {/* The foot of the screen: what the studio makes, in one line. */}
      <div className="frame mt-auto border-0 pt-16 pb-[var(--margin)]">
        <ul
          data-hero-sub
          className="flex flex-wrap items-baseline gap-x-8 gap-y-2"
        >
          {services.map((craft) => (
            <li key={craft.slug}>
              <Link
                href={`/services#${craft.slug}`}
                className="link text-[length:var(--step-lead)] leading-none font-black tracking-[-0.03em] text-muted uppercase transition-colors duration-200 hover:text-ink"
              >
                {craft.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
