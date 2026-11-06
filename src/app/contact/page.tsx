import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Brief } from "@/components/sections/Brief";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { pageMetadata } from "@/lib/seo";

const description =
  "Contact Bombaycraft about a film, a cinematic shoot, a website or the system behind it.";

export const metadata: Metadata = pageMetadata({ title: "Contact", description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Say hello"
        intro="Tell us what you want made, and when. A few lines are enough."
      />
      <ContactDetails />
      <Brief />
    </>
  );
}
