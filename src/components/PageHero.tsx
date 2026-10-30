import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

// Top of every inner page: the mark (which links home), a Bodoni title
// with a script flourish, and one sentence. Type only.
export function PageHero({
  label,
  title,
  flourish,
  intro,
}: {
  label: string;
  title: string;
  flourish: string;
  intro: string;
}) {
  return (
    <section className="frame flex min-h-[88svh] flex-col bg-bg pt-[var(--margin)] pb-24 md:pb-32">
      <div className="flex items-start justify-between gap-6">
        <Logo priority className="h-12 w-auto md:h-16" />
        <ThemeToggle />
      </div>

      <div className="mt-auto pt-24">
        <div className="caps rule flex justify-between gap-6 border-b pb-4">
          <span>{label}</span>
          <span className="text-dim">Est. Bombay</span>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h1 data-reveal className="display lg:col-span-8">
            {title}
            <span className="script mt-2 block pl-[12%] text-[0.62em]">{flourish}</span>
          </h1>
          <p data-reveal className="lede max-w-[24ch] lg:col-span-4 lg:justify-self-end lg:text-right">
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}
