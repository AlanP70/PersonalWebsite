import type { MetadataRoute } from "next";

// Web app manifest — installability + on-brand chrome. Colours track the dark
// HUD palette (--background navy) in globals.css; icons reuse the generated
// icon/apple-icon routes so there is a single source for the monogram.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alan Pipko — Software Developer",
    short_name: "Alan Pipko",
    description:
      "Computer Science student & software developer — real-time systems, ML tooling, and automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#070b16",
    theme_color: "#070b16",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
