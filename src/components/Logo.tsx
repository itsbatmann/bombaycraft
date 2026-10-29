import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Brand mark. "dark" = terracotta for light backgrounds,
// "light" = cream for dark backgrounds and over video.
export function Logo({
  tone = "dark",
  className = "h-12 w-auto",
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-block">
      <Image
        src={tone === "dark" ? "/brand/logo.png" : "/brand/logo-light.png"}
        alt={site.name}
        width={1000}
        height={453}
        priority={priority}
        className={className}
      />
    </Link>
  );
}
