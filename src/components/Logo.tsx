import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Brand mark. "auto" follows the theme (terracotta by day, ivory by night);
// "light" is for use over photographs and video.
export function Logo({
  tone = "auto",
  className = "h-12 w-auto",
  priority = false,
}: {
  tone?: "auto" | "light";
  className?: string;
  priority?: boolean;
}) {
  const mark = (src: string, extra = "") => (
    <Image src={src} alt={site.name} width={1000} height={453} priority={priority} className={`${className} ${extra}`} />
  );
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-block">
      {tone === "light" ? (
        mark("/brand/logo-light.png")
      ) : (
        <>
          {mark("/brand/logo.png", "logo-day")}
          {mark("/brand/logo-light.png", "logo-night")}
        </>
      )}
    </Link>
  );
}
