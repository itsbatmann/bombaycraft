import type { Metadata } from "next";
import { site } from "./site";

// Per-page metadata. Next.js replaces (not merges) nested objects like
// openGraph, so the shared fields are repeated here for every page.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: fullTitle };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
