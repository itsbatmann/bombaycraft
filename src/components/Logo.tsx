import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// The mark: "Bombay" in Latin over "क्राफ्ट्स" in Devanagari. The light
// version is the one that reads on the black ground.
export function Logo({
  tone = "light",
  className = "h-9 w-auto md:h-11",
  eager = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  eager?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className="inline-block transition-opacity duration-200 hover:opacity-70"
    >
      <Image
        src={tone === "light" ? "/brand/logo-light.png" : "/brand/logo.png"}
        alt={site.name}
        width={1000}
        height={453}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={className}
      />
    </Link>
  );
}
