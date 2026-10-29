import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { VideoBlock } from "@/components/VideoBlock";
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
