import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Touch icon in the HUD palette: navy field, cyan "AP" monogram over a crimson
// underline rail — the same monogram + accent language as the favicon, scaled up.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #0a1120 0%, #070b16 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#63d3ea",
          }}
        >
          AP
        </div>
        <div
          style={{
            display: "flex",
            width: 76,
            height: 5,
            marginTop: 14,
            borderRadius: 2,
            background: "#e8244b",
          }}
        />
      </div>
    ),
    size
  );
}
