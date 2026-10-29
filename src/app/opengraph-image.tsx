import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

// Social share preview (WhatsApp, LinkedIn, X, etc).
export const alt = `${site.name} | ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function logoDataUrl() {
  "use cache";
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export default async function Image() {
  const logoSrc = await logoDataUrl();

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={300} height={136} />
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 950 }}>
          We build websites, CRMs &amp; media.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#6b645b" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
