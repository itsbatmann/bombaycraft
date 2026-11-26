import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Preloader />
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
