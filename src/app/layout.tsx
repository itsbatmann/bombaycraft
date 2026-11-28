import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, The_Nautigal, Urbanist } from "next/font/google";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Intro } from "@/components/Intro";
import "./globals.css";

/* The two faces of the site: The Nautigal for display, Urbanist for everything read. Both open (Google Fonts). */
const nautigal = The_Nautigal({
  variable: "--font-nautigal",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* The intro reel's two voices: a tight display serif and a typewriter mono. */
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "626 | Films, and the websites they play in",
  description:
    "626 is a studio that writes, shoots and finishes films, then builds the real-time websites, web apps and CRMs they play in. One team, camera to code.",
};

export const viewport: Viewport = { themeColor: "#f2f3fa" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nautigal.variable} ${urbanist.variable} ${serif.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Intro />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Motion />
      </body>
    </html>
  );
}
