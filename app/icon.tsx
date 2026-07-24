import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon in the site's HUD palette: navy field (--background), a cyan-white
// "AP" monogram, and a crimson status rail flush along the bottom edge echoing
// the tab-bar accent. `overflow: hidden` clips the rail to the rounded corners.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#070b16",
          borderRadius: 7,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -0.5,
          color: "#e7effb",
          fontFamily: "sans-serif",
        }}
      >
        AP
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            display: "flex",
            background: "#e8244b",
          }}
        />
      </div>
    ),
    size
  );
}
