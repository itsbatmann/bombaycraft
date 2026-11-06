import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Work } from "@/components/sections/Work";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/lib/site";

const description =
  "Selected video, cinematic shots, websites and systems by Bombaycraft, a creative studio in Bombay.";

export const metadata: Metadata = pageMetadata({ title: "Work", description, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHero
        title="The work"
        intro="Film, cinematic shots, websites and the systems behind them."
      />
      <Work
        heading="Film and cinematic"
        lede="Two recent shoots, cut for cinema, social and the site hero."
        items={projects.slice(0, 2)}
        id="film"
      />
      <Work
        heading="Websites and systems"
        lede="The sites that carry the footage, and the systems that run behind them."
        items={projects.slice(2, 4)}
        id="digital"
      />
      <Work
        heading="This year"
        lede="A campaign cut six ways, and a wholesale floor running on Node."
        items={projects.slice(4)}
        id="recent"
      />
    </>
  );
}
