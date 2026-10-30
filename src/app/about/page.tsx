import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Founders } from "@/components/sections/Founders";
import { pageMetadata } from "@/lib/seo";

const description =
  "Meet Bombaycraft, a Bombay team of designers, developers and filmmakers building websites, software and films.";

export const metadata: Metadata = pageMetadata({ title: "About Us", description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="I — About"
        title="A studio"
        flourish="from Bombay"
        intro="Designers, developers and filmmakers under one roof, working with brands across India and beyond."
      />
      <Founders />
    </>
  );
}
