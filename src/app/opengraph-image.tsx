import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Social share preview (WhatsApp, LinkedIn, X, etc). Replace with the
// real logo once it's ready.
export const alt = `${site.name} | ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f6f1e9",
          color: "#17130f",
        }}
      >
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700 }}>
          bombay<span style={{ color: "#e0522b" }}>craft</span>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 950 }}>
          We build websites, CRMs &amp; media.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#6b645b" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
