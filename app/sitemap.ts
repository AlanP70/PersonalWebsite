import type { MetadataRoute } from "next";

// Single-page portfolio (the sections are hash-linked tabs of one route), so the
// sitemap is just the canonical home URL. Kept in sync with `siteUrl` in layout.
const siteUrl = "https://alanpipko.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
