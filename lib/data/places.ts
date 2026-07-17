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
  { src: "/places/Mormon_Row.jfif" },
  { src: "/places/bears.jfif" },
  { src: "/places/moose.jfif" },
  { src: "/places/Grand_Prismatic.jfif" },
  { src: "/places/Stars.jfif" },
];
