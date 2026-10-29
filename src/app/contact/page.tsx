import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Contact Bombaycraft to discuss your website, CRM, CMS or video project. Based in Mumbai, working with clients across India.";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's make something great."
        intro="Tell us a little about your project and we'll get back to you within one working day."
      />
      <section className="container-x grid gap-6 pb-24 md:grid-cols-3">
        <a
          href={`mailto:${site.email}`}
          className="rounded-3xl border border-line p-8 hover:border-accent"
        >
          <h2 className="eyebrow">Email</h2>
          <p className="mt-3 text-xl font-semibold">{site.email}</p>
        </a>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="rounded-3xl border border-line p-8 hover:border-accent"
        >
          <h2 className="eyebrow">Phone</h2>
          <p className="mt-3 text-xl font-semibold">{site.phone}</p>
        </a>
        <address className="rounded-3xl border border-line p-8 not-italic">
          <h2 className="eyebrow">Studio</h2>
          <p className="mt-3 text-xl font-semibold">
            {site.address.locality}, {site.address.region}
          </p>
        </address>
      </section>
    </>
  );
}
