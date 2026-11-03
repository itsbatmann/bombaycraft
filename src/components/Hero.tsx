"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ambientClip, showreel, site } from "@/lib/site";
import { scrollToElement } from "@/lib/scroll";

gsap.registerPlugin(useGSAP);

// The film fills the first screen edge to edge. It plays once; when it
// ends the page glides down to the work by itself.
export function Hero({ nextId }: { nextId: string }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [blocked, setBlocked] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // The one loud moment: the film opens from the top edge and settles.
      gsap
        .timeline()
        .fromTo(".hero-film", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.inOut" })
        .fromTo(".hero-film video", { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.2)
        .from(".hero-corner", { opacity: 0, y: 10, duration: 0.8, ease: "power3.out", stagger: 0.1 }, 0.9);
    },
    { scope: root },
  );

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // Browsers only allow muted autoplay; if even that is refused (data
    // saver, some phones), offer a tap to play.
    v.play().catch(() => setBlocked(true));
  }, []);

  const onTime = () => {
    const v = video.current;
    if (v && bar.current && v.duration) bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
  };

  const onEnded = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = document.getElementById(nextId);
    if (next) scrollToElement(next, 2);
  };

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative h-svh min-h-[560px] w-full overflow-hidden bg-night text-ivory">
      <div className="hero-film absolute inset-0">
        <video
          ref={video}
          className="h-full w-full object-cover"
          poster={showreel.poster ?? ambientClip.poster}
          muted
          playsInline
          autoPlay
          preload="auto"
          onTimeUpdate={onTime}
          onEnded={onEnded}
          aria-label={showreel.src ? `${site.name} showreel: the two founders` : "Marine Drive, Bombay, at dusk"}
        >
          {showreel.src ? (
            <source src={showreel.src} />
          ) : (
            <>
              <source src={ambientClip.mp4} type="video/mp4" />
              <source src={ambientClip.webm} type="video/webm" />
            </>
          )}
        </video>
        <div className="absolute inset-0 bg-night/15" aria-hidden="true" />
      </div>

      {blocked && (
        <button
          type="button"
          onClick={() => video.current?.play().then(() => setBlocked(false))}
          className="pill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-ivory text-ivory"
        >
          Play
        </button>
      )}

      <div className="frame absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 pb-[var(--margin)]">
        <h1 id="hero-title" className="hero-corner caps max-w-[30ch]">
          {site.name}
          <span className="block text-ivory/65">Websites, apps and films, made in Bombay</span>
        </h1>
        <p className="hero-corner caps flex items-center gap-3 text-ivory/80">
          Scroll
          <span className="relative block h-px w-14 bg-ivory/30" aria-hidden="true">
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-ivory" />
          </span>
        </p>
      </div>
    </section>
  );
}
