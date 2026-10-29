import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Meet Bombaycraft, a Mumbai-based team of designers, developers and filmmakers building websites, software and media with craft.";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description,
  path: "/about",
});

const values = [
  { title: "Craft first", text: "Every detail is considered, from type spacing to page speed." },
  { title: "Straight talk", text: "Clear timelines, honest advice and no jargon." },
  { title: "Built to grow", text: "Work that performs and scales with your business." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Mumbai studio with a maker's mindset."
        intro={`${site.name} brings together design, engineering and filmmaking under one roof. We build the websites, CRMs and content that help businesses look sharp and run smoothly.`}
      />
      <section aria-labelledby="values-heading" className="container-x py-10">
        <h2 id="values-heading" className="font-display text-4xl font-semibold">
          What we believe
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} data-reveal className="rounded-3xl border border-line p-8">
              <h3 className="font-display text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
