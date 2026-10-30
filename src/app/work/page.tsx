import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Attractions } from "@/components/sections/Attractions";
import { pageMetadata } from "@/lib/seo";

const description =
  "Selected websites, web apps, CRMs, CMS platforms and films by Bombaycraft, a digital studio in Bombay.";

export const metadata: Metadata = pageMetadata({ title: "Our Work", description, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="I — Work"
        title="The work"
        flourish="from the atelier"
        intro="Websites, software and films made in Bombay. Full case studies and footage are on their way."
      />
      <Attractions />
    </>
  );
}
