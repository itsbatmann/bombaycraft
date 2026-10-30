import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { pageMetadata } from "@/lib/seo";
import { services, site } from "@/lib/site";

const description =
  "Creative websites, MERN stack web apps, custom CRMs, CMS platforms and films from Bombaycraft, a digital studio in Bombay.";

export const metadata: Metadata = pageMetadata({ title: "Services", description, path: "/services" });

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.summary,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "IN",
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <PageHero
        label="I — Services"
        title="Five crafts"
        flourish="one atelier"
        intro="The website people see, the software your team runs on, and the films that tell your story."
      />
      <ServiceDetails />
    </>
  );
}
