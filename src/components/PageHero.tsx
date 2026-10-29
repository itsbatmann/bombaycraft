import { Logo } from "./Logo";

// Shared top section for inner pages. Each page gets exactly one <h1>.
// No navbar: just the mark, which links home.
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="container-x pt-8 pb-12 md:pt-10">
      <Logo priority className="h-14 w-auto md:h-16" />
      <p className="eyebrow mt-16 md:mt-24">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] font-semibold tracking-tight md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
    </section>
  );
}
