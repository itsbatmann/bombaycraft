import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { pageMetadata } from "@/lib/seo";
import { services, site } from "@/lib/site";

const description =
  "Video, cinematic shots, websites, web apps, CRM and CMS from Bombaycraft, a creative studio in Bombay.";

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
        title="Services"
        intro="The camera first, then everything that carries what it shoots."
      />
      <ServiceDetails />
    </>
  );
}
