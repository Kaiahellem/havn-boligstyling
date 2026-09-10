import type { MetadataRoute } from "next";

const baseUrl = "https://styling.havnbolig.no";

const routes = ["", "/tjenester", "/prosjekter", "/om", "/kontakt"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
