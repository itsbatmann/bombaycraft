import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import credits from "@/lib/media-credits.json";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Credits",
  description: "Credits for the photographs and footage of Bombay used on the Bombaycraft website.",
  path: "/credits",
});

export default function CreditsPage() {
  return (
    <>
      <PageHero
        label="Credits"
        title="Thanks"
        flourish="to the makers"
        intro="The film behind our hero comes from Wikimedia Commons, shared by its maker."
      />
      <section aria-labelledby="credits-heading" className="frame bg-bg-2 py-28">
        <h2 data-reveal id="credits-heading" className="caps rule border-b pb-4">
          Footage
        </h2>
        <ul className="mt-14 grid gap-12 md:grid-cols-2">
          {credits.map((c) => (
            <li key={c.file} data-reveal>
              <div>
                <a href={c.page} target="_blank" rel="noopener noreferrer" className="font-serif text-xl italic underline decoration-1 underline-offset-4">
                  {c.title}
                </a>
                <p className="caps mt-3 text-dim">
                  {c.creator.replace(/^User:/, "")} ·{" "}
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    {c.license}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
