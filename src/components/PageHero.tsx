import { Nav } from "./Nav";

// The top of every inner page: the bar, the title in the page's one h1
// at display size, one sentence beside it, on the black field.
export function PageHero({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="flex min-h-[60svh] flex-col bg-bg">
      <Nav eager />

      <div className="frame mt-auto grid gap-y-8 pt-20 pb-24 lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <h1 data-hero-line className="display lg:col-span-7">
          {title}
        </h1>

        <p data-hero-sub className="lede lg:col-span-4 lg:col-start-9">
          {intro}
        </p>
      </div>
    </section>
  );
}
