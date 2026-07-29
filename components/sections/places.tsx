"use client";

import { useState } from "react";
import { photos } from "@/lib/data/places";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";
import { HudImageFrame } from "@/components/hud/image-frame";

export function Places() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section
      aria-label="Photography"
      className="section-container-gallery section-pad"
    >
      <SectionHeading sub="My favourite photos as a beginner photographer.">
        Photography
      </SectionHeading>

      {/* Masonry via CSS columns — portrait and landscape shots keep their
          natural aspect ratio (no cropping) and flow into balanced columns.
          Collapses to a single column on mobile with no horizontal overflow. */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <figure key={photo.src} className="group relative mb-4 break-inside-avoid">
            {/* The shared HUD image frame supplies the chamfer, steel hairline,
                IMG NN label and hover/focus edge — the button stays the
                accessible control that opens the lightbox, and the content
                caption stays a <figcaption> below (see the reveal on hover). */}
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={
                photo.caption ? `View photo: ${photo.caption}` : "View photograph"
              }
              className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <HudImageFrame id={index + 1} interactive>
                {/* eslint-disable-next-line @next/next/no-img-element -- gallery;
                    natural dimensions aren't known ahead of time, and next/image
                    needs width/height or a fill parent. */}
                <img
                  src={photo.src}
                  alt={photo.caption ?? "Photograph"}
                  loading="lazy"
                  className="block h-auto w-full transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </HudImageFrame>
            </button>
            {photo.caption && (
              // Caption fades in over a bottom gradient on hover. Touch devices
              // have no hover, so `(hover: none)` reveals it permanently.
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
