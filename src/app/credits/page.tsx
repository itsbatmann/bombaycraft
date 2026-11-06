import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import credits from "../../../public/archive/credits.json";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Credits",
  description:
    "Credits for the archive photograph used on the Bombaycraft website.",
  path: "/credits",
});

type Credit = {
  file: string;
  title: string;
  creator: string | null;
  license: string;
  licenseUrl: string;
  page: string;
  via: string;
  media: string;
};

// The picture lives in public/archive; credits.json records where it
// came from, written by the tool that downloaded it.
const toSrc = (file: string) => file.replace(/^public/, "");

export default function CreditsPage() {
  const list = credits as Credit[];

  return (
    <>
      <PageHero
        title="Credits"
        intro="One borrowed photograph, and who made it. Everything else on this site is ours."
      />

      <section
        aria-labelledby="credits-heading"
        className="bg-surface py-[var(--gap)]"
      >
        <div className="frame grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <h2 id="credits-heading" className="heading">
              Borrowed
            </h2>
            <p className="lede mt-7">
              One photograph of the city the studio is named after.
            </p>
            <p className="mt-6 max-w-[48ch] leading-[1.5] text-ink/85">
              It shows the world Bombaycraft works in. It is not the
              studio&apos;s own work, room, team or client, and it is used
              unaltered under a share-alike licence. The wordmark, the
              lettering and every other mark on this site are ours.
            </p>
          </div>

          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {list.map((c) => (
              <li key={c.file} data-reveal>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
                  <Image
                    src={toSrc(c.file)}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    loading="eager"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 leading-tight font-black">
                  <a href={c.page} target="_blank" rel="noopener noreferrer" className="link">
                    {c.title}
                  </a>
                </h3>
                <p className="small mt-2 text-muted">
                  {c.creator ? `${c.creator.replace(/^Creator:/, "")} · ` : ""}
                  <a
                    href={c.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link font-bold text-ink"
                  >
                    {c.license}
                  </a>{" "}
                  · via {c.via}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ours-heading" className="bg-bg py-[var(--gap)]">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <h2 id="ours-heading" className="heading md:col-span-5">
            Ours
          </h2>
          <div className="md:col-span-6 md:col-start-7">
            <p className="lede">
              The wordmark, the lettering, the writing and the build.
            </p>
            <p className="mt-6 leading-[1.5] text-ink/85">
              Every empty frame on this site is a slot waiting for
              Bombaycraft&apos;s own footage and stills. None of them is
              filled with a picture from somewhere else, because a studio
              that shows other people&apos;s work is not showing you
              anything.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
