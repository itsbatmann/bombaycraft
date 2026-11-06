import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Bombay } from "@/components/sections/Bombay";
import { Founders } from "@/components/sections/Founders";
import { pageMetadata } from "@/lib/seo";

const description =
  "Meet Bombaycraft: a crew who shoot and a team who build, in one room in Bombay.";

export const metadata: Metadata = pageMetadata({ title: "Studio", description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="The studio"
        intro="A crew who shoot and a team who build, in one room."
      />
      <Founders />
      <Bombay />
    </>
  );
}
