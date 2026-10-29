import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { services, site } from "@/lib/site";

const description =
  "Creative websites, MERN stack development, custom CRMs, CMS solutions and media & video production from Bombaycraft, a digital studio in Mumbai.";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description,
  path: "/services",
});

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
        eyebrow="Services"
        title="Everything your brand needs to run and stand out online."
        intro="From the website people see to the CRM your team runs on, and the films that tell your story."
      />
      <section className="container-x pb-10">
        <ul className="divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} data-reveal className="grid gap-4 py-10 md:grid-cols-[6rem_1fr_1.5fr]">
              <span className="font-display text-accent">0{i + 1}</span>
              <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
              <p className="text-lg text-muted">{s.summary}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
