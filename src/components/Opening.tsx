"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { VideoBlock } from "@/components/VideoBlock";
import { ambientClip, showreel, site } from "@/lib/site";
import { lockScroll } from "@/lib/scroll";

gsap.registerPlugin(useGSAP, SplitText);

// Opening titles, one replacing the next, like the start of a film.
const cards: { text: string; kind: "marathi" | "serif" | "script"; note?: string }[] = [
  { text: "आमची मुंबई", kind: "marathi", note: "Aamchi Mumbai · our Bombay" },
  { text: "Two founders", kind: "serif" },
  { text: "One city", kind: "serif" },
  { text: "Lights", kind: "serif" },
  { text: "Camera", kind: "serif" },
  { text: "Action", kind: "script" },
];
const START = 0.35;
// How long each card stays before the next: the Marathi card holds longer
// so its translation can be read; "Action" holds for the cut.
const holdFor = (kind: string) => (kind === "marathi" ? 1.2 : kind === "script" ? 1.2 : 0.72);
const starts = cards.reduce<number[]>((acc, c, i) => [...acc, i === 0 ? START : acc[i - 1] + holdFor(cards[i - 1].kind)], []);
const FPS = 24;

// Shared by the animated last card and the two halves it tears into, so
// they line up exactly.
const titleBox = "text-center font-serif tracking-[-0.03em] [font-variation-settings:'opsz'_96] text-[clamp(3.5rem,11vw,10rem)] leading-[1.1]";
const scriptLook = "font-script text-[1.2em] leading-none text-[#c9a45c]";

const timecode = (frames: number) => {
  const f = Math.floor(frames) % FPS;
  const s = Math.floor(frames / FPS);
  return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

export function Opening() {
  const root = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const [arrived, setArrived] = useState(false);

  useGSAP(
    () => {
      // `?nointro` skips the preloader (handy for previews and testing).
      const skip = new URLSearchParams(window.location.search).has("nointro");
      if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setArrived(true);
        return;
      }

      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      lockScroll(true);

      // Split each card. Letters (or Marathi words, whose vowel signs must
      // stay joined) sit in their own clipping slot; the slots get a little
      // room so tall letters and descenders are never cut.
      const parts = gsap.utils.toArray<HTMLElement>(".pl-card").map((card) => {
        const kind = card.dataset.kind;
        const text = card.querySelector<HTMLElement>(".pl-text")!;
        if (kind === "script") return { card, kind, text, pieces: [text] as HTMLElement[] };
        const split = SplitText.create(text, kind === "marathi" ? { type: "words", mask: "words" } : { type: "chars", mask: "chars" });
        gsap.set(split.masks, { paddingTop: "0.3em", paddingBottom: "0.3em", marginTop: "-0.3em", marginBottom: "-0.3em" });
        return { card, kind, text, pieces: (kind === "marathi" ? split.words : split.chars) as HTMLElement[] };
      });

      const seamAt = starts[cards.length - 1] + holdFor("script");
      const frames = { value: 0 };
      const tl = gsap.timeline();

      tl.from(".pl-chrome", { opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, 0)
        .fromTo(".pl-progress", { scaleX: 0 }, { scaleX: 1, duration: seamAt, ease: "power1.inOut" }, 0)
        .to(
          frames,
          {
            value: seamAt * FPS,
            duration: seamAt,
            ease: "none",
            onUpdate: () => {
              if (clock.current) clock.current.textContent = timecode(frames.value);
            },
          },
          0,
        );

      // Letters roll up out of their slots, the way a station's flap board
      // turns over. The previous word clears quickly, almost all at once,
      // just as the next one starts to rise.
      parts.forEach(({ card, kind, text, pieces }, i) => {
        const at = starts[i];
        tl.set(card, { autoAlpha: 1 }, at);
        if (kind === "script") {
          tl.fromTo(
            text,
            { clipPath: "inset(-30% 100% -30% 0%)" },
            { clipPath: "inset(-30% 0% -30% 0%)", duration: 1, ease: "power2.inOut" },
            at,
          );
        } else {
          tl.fromTo(pieces, { yPercent: 115 }, { yPercent: 0, duration: 0.8, ease: "power4.out", stagger: 0.03 }, at);
        }
        if (kind === "marathi") {
          tl.fromTo(".pl-note", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, at + 0.25);
        }

        const prev = parts[i - 1];
        if (prev) {
          tl.to(prev.pieces, { yPercent: -115, duration: 0.32, ease: "power3.in", stagger: 0.008, overwrite: "auto" }, at - 0.3).set(
            prev.card,
            { autoAlpha: 0 },
            at + 0.05,
          );
          if (prev.kind === "marathi") tl.to(".pl-note", { opacity: 0, y: -6, duration: 0.25, overwrite: "auto" }, at - 0.3);
        }
      });

      // The cut: a gold line slashes across the middle, the word tears in
      // two along it, and the halves part to reveal the film.
      tl.to(".pl-seam", { scaleX: 1, duration: 0.45, ease: "power3.inOut" }, seamAt)
        .to(".pl-chrome", { opacity: 0, duration: 0.3 }, seamAt)
        .set(".pl-card", { autoAlpha: 0 }, seamAt + 0.45)
        .set(".pl-half", { autoAlpha: 1 }, seamAt + 0.45)
        .to(".pl-top", { yPercent: -100, duration: 1.25, ease: "expo.inOut" }, seamAt + 0.5)
        .to(".pl-bottom", { yPercent: 100, duration: 1.25, ease: "expo.inOut" }, seamAt + 0.5)
        .to(".pl-seam", { opacity: 0, duration: 0.35 }, seamAt + 0.55)
        .fromTo(".hero-zoom", { scale: 1.2 }, { scale: 1, duration: 1.9, ease: "expo.out" }, seamAt + 0.55)
        .from(".hero-after", { opacity: 0, y: 14, duration: 0.9, ease: "power3.out", stagger: 0.08 }, seamAt + 1.2);

      tl.call(() => {
        lockScroll(false);
        setArrived(true);
      });

      return () => lockScroll(false);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {!arrived && (
        <div className="preloader fixed inset-0 z-[100] overflow-hidden text-ivory" aria-hidden="true">
          {/* The two halves of the screen, each holding its half of the last word */}
          <div className="pl-top absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-night">
            <div className={`pl-half invisible absolute inset-x-0 top-full -translate-y-1/2 ${titleBox}`}>
              <span className={`inline-block ${scriptLook}`}>Action</span>
            </div>
          </div>
          <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-night">
            <div className={`pl-half invisible absolute inset-x-0 top-0 -translate-y-1/2 ${titleBox}`}>
              <span className={`inline-block ${scriptLook}`}>Action</span>
            </div>
          </div>

          {/* The titles */}
          {cards.map((c) => (
            <div
              key={c.text}
              data-kind={c.kind}
              className={`pl-card invisible absolute inset-x-0 top-1/2 -translate-y-1/2 ${titleBox}`}
            >
              {c.kind === "marathi" ? (
                <span lang="mr" className="pl-text inline-block font-marathi text-[0.7em] text-[#c9a45c]">
                  {c.text}
                </span>
              ) : c.kind === "script" ? (
                <span className={`pl-text inline-block ${scriptLook}`}>{c.text}</span>
              ) : (
                <span className="pl-text inline-block whitespace-nowrap">{c.text}</span>
              )}
            </div>
          ))}
          <p className="pl-note caps absolute inset-x-0 top-1/2 mt-[clamp(3rem,7vw,6rem)] text-center text-ivory/60 opacity-0">
            {cards[0].note}
          </p>

          {/* The seam the screen tears along */}
          <div className="pl-seam absolute inset-x-0 top-1/2 h-px origin-center scale-x-0 bg-[#c9a45c]" />

          <div className="frame absolute inset-0 flex flex-col justify-between py-[var(--margin)]">
            <div className="pl-chrome caps flex justify-between gap-6 text-ivory/70">
              <span>{site.name} presents</span>
              <span>Reel 01</span>
            </div>
            <div className="pl-chrome">
              <div className="h-px w-full bg-ivory/15">
                <div className="pl-progress h-full origin-left scale-x-0 bg-[#c9a45c]" />
              </div>
              <div className="caps mt-4 flex justify-between gap-6 text-ivory/70">
                <span>Bombay, India</span>
                <span ref={clock} className="tabular-nums">
                  00:00:00:00
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The showreel, full screen. The film carries the brand, so the
          page adds only a quiet line in each bottom corner. */}
      <section aria-labelledby="hero-title" className="hero relative h-svh min-h-[560px] overflow-hidden bg-night text-ivory">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <VideoBlock
              src={showreel.src ?? ambientClip.src}
              poster={showreel.poster ?? ambientClip.poster}
              label={showreel.src ? `${site.name} showreel: the two founders` : "CST railway station in Bombay, lit at night"}
              priority
              className="h-full w-full"
            />
          </div>
          <div className="absolute inset-0 bg-night/20" aria-hidden="true" />
        </div>

        <div className="frame absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 pb-[var(--margin)]">
          <h1 id="hero-title" className="hero-after caps max-w-[34ch] text-ivory/90">
            {site.name}
            <span className="block text-ivory/60">Websites, apps and films, made in Bombay</span>
          </h1>
          <p className="hero-after caps flex items-center gap-3 text-ivory/70">
            Scroll
            <span className="block h-px w-10 bg-current" aria-hidden="true" />
          </p>
        </div>
      </section>
    </div>
  );
}
