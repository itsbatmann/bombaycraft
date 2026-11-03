import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Brand mark: terracotta on the cream page, cream over video and brown blocks.
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
        src={tone === "light" ? "/brand/logo-light.png" : "/brand/logo.png"}
        alt={site.name}
        width={1000}
        height={453}
        priority={priority}
        className={className}
      />
    </Link>
  );
}
