import { ImageResponse } from "next/og";

export const alt = "Luminaris Code — Software That Solves Real Business Problems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030712 0%, #111827 55%, #1e1b4b 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "white" }}>
          Luminaris<span style={{ color: "#a5b4fc" }}>Code</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#d1d5db",
            marginTop: 28,
            textAlign: "center",
            maxWidth: 880,
          }}
        >
          Software That Solves Real Business Problems
        </div>
        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 48,
            fontSize: 20,
            color: "#818cf8",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          <span style={{ display: "flex" }}>Enterprise Ready</span>
          <span style={{ display: "flex" }}>AI Powered Development</span>
          <span style={{ display: "flex" }}>Long-term Support</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
