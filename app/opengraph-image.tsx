import { ImageResponse } from "next/og";

export const alt = "Alan Pipko — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card in the HUD palette: deep navy field, a crimson-diamond
// kicker, cyan-accented name, and muted-blue tagline — mirroring the on-site
// hero so a shared link reads as the same interface.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #070b16 0%, #0a1224 55%, #0b1020 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Crimson status rail down the left edge — HUD chrome. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            display: "flex",
            background: "#e8244b",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            color: "#93a4c4",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              marginRight: 18,
              transform: "rotate(45deg)",
              background: "#ff2f9e",
            }}
          />
          Software Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#e7effb",
            marginBottom: 24,
          }}
        >
          Alan Pipko
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#93a4c4",
            maxWidth: 900,
          }}
        >
          Real-time systems, ML tooling, and automation.
        </div>
      </div>
    ),
    size
  );
}
