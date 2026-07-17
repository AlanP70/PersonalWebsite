import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #18181b 55%, #1c1c1e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#a1a1aa",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Software Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ededed",
            marginBottom: 24,
          }}
        >
          Alan Pipko
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#a1a1aa",
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
