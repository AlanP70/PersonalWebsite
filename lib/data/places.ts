export type Photo = {
  /** Path under /public, e.g. "/places/banff.jpg" */
  src: string;
  /** Optional caption shown under the photo. Omit to show the image alone. */
  caption?: string;
};

// Drop photos into public/places/ (e.g. public/places/banff.jpg) and add a
// matching entry here. The Photography section renders nothing until this
// array has at least one entry, so an empty gallery never breaks the build.
export const photos: Photo[] = [
  // { src: "/places/banff.jpg", caption: "Banff, AB — 2025" },
  // { src: "/places/no-caption.jpg" },
  { src: "/places/Mormon_Row.jfif", caption: "Mormon Row, Grand Teton National Park" },
  { src: "/places/moose.jfif", caption: "Grand Teton National Park, Wyoming" },
  { src: "/places/bears.jfif", caption: "Yellowstone National Park, Wyoming" },
  { src: "/places/Grand_Prismatic.jfif", caption: "Grand Prismatic Spring, Yellowstone National Park" },
  { src: "/places/Stars.jfif", caption: "Yellowstone National Park, Wyoming" },
  { src: "/places/Gondola.JPG", caption: "Grand Teton National Park , Wyoming" },
  { src: "/places/Waterfall.JPG", caption: "Yellowstone National Park, Wyoming" },
  { src: "/places/Waterfall2.jpeg", caption: "Skogafoss, Iceland" },
  { src: "/places/Tower.jpeg", caption: "Kyoto, Japan" },
  { src: "/places/Castle.jpeg", caption: "Neuschwanstein Castle, Germany" },
  { src: "/places/Big_Ben.jpg", caption: "London, United Kingdom" },
  { src: "/places/Bogota.jpeg", caption: "Bogotá, Colombia" },

];
