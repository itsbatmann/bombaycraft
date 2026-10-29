import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/lib/site";

const description =
  "Selected websites, web apps, CRMs and video projects by Bombaycraft for businesses across India.";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Brands we've helped shape."
        intro="A few projects we're proud of. Case studies coming soon."
      />
      <section className="container-x pb-10">
        <ul className="grid gap-10 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.title} data-reveal>
              <article>
                <div className="aspect-[4/3] rounded-3xl bg-line" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-semibold">{p.title}</h2>
                <p className="text-muted">
                  {p.category} · {p.year}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
