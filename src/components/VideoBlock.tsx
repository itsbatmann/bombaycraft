"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Reusable video slot for showreels and project films.
// - Muted, looping, inline autoplay (the only kind browsers allow).
// - Only plays while on screen, so a page full of videos stays light.
// - Respects reduced-motion: shows the poster instead of playing.
// - With no `src` yet, renders `children` as a placeholder.
export function VideoBlock({
  src,
  poster,
  label,
  className = "",
  priority = false,
  children,
}: {
  src?: string | null;
  poster?: string | null;
  label: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  if (!src) return <div className={className}>{children}</div>;

  return (
    <video
      ref={ref}
      className={`object-cover ${className}`}
      poster={poster ?? undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
    >
      <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
}
