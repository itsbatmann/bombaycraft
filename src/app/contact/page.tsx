import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { pageMetadata } from "@/lib/seo";

const description =
  "Contact Bombaycraft about a website, CRM, CMS, web app or film. A digital studio in Bombay working with brands across India.";

export const metadata: Metadata = pageMetadata({ title: "Contact", description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="I — Contact"
        title="Namaskar"
        flourish="let us talk"
        intro="Tell us what you want made and when. A few lines are enough; we reply within one working day."
      />
      <ContactDetails />
    </>
  );
}
