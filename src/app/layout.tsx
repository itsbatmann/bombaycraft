import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif, JetBrains_Mono, Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Intro } from "@/components/Intro";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/*
  Display face. The brief asks for Biotif (Indian Type Foundry, licensed);
  Outfit is the closest open face until the licensed files are added. To
  switch: drop Biotif-Light/Regular/Medium .woff2 into src/fonts and
  replace this with next/font/local pointing at them.
*/
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
  title: "Kala & Codes | Films, and the websites they play in",
  description:
    "Kala & Codes is a studio that writes, shoots and finishes films, then builds the real-time websites, web apps and CRMs they play in. One team, camera to code.",
};

export const viewport: Viewport = { themeColor: "#f2f3fa" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${outfit.variable} ${serif.variable} ${mono.variable} h-full antialiased`}>
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
