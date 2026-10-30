import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/services", "/work", "/about", "/contact", "/credits"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
