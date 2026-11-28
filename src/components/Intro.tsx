"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

/*
  The opening reel. A 3x3 film grid that cuts like an edit suite: cells
  open column by column, a poem builds over two-frame cuts, the frame
  breaks into nine live screens, then a slit, a takeover, a row wipe, a
  slit-scan smear, mono title cards, a portrait run with flipped grades,
  a collage, and one rounded frame that flies into the hero panel.

  Every beat is timed against a frame-by-frame read of the reference
  (seconds noted beside each block). Footage: Mixkit, free licence,
  trimmed and re-encoded into /public/intro.
*/

type Shot = { id: string; src?: string; g: string; cls?: string };

const SHOTS: Shot[] = [
  { id: "eye", src: "eye", g: "moss" },
  { id: "sleeve", src: "sleeve", g: "sage" },
  { id: "makeup", src: "makeup", g: "warm" },
  { id: "dj", src: "dj", g: "ember" },
  { id: "board", src: "board", g: "cream" },
  { id: "cream", g: "flat" },
  { id: "lips", src: "lips", g: "wine" },
  { id: "coffee", src: "coffee", g: "cream" },
  { id: "grass", src: "grass", g: "moss" },
  { id: "blob", src: "reel", g: "blob" },
  { id: "muse", src: "muse", g: "sage" },
  { id: "guitar", src: "guitar", g: "cream" },
  { id: "pier", src: "pier", g: "mist" },
  { id: "road", src: "road", g: "teal" },
  { id: "mist", src: "mist", g: "mono" },
  { id: "smear", src: "road", g: "smear", cls: "ix-shot--smear" },
  { id: "leader", src: "leader", g: "acid" },
  { id: "negative", src: "makeup", g: "invert" },
  { id: "runway", src: "runway", g: "night" },
  { id: "dusk", src: "dusk", g: "moss" },
  { id: "model", src: "model", g: "moss" },
  { id: "neon", src: "neon", g: "moss" },
  { id: "shades", src: "shades", g: "rust" },
  { id: "sky", src: "peaks", g: "mist" },
  { id: "poster", g: "poster" },
  { id: "drive", src: "drive", g: "sage", cls: "ix-shot--final" },
];

/* The shots cut in the first two seconds: the reel waits for these. */
const OPENING = [
  "eye",
  "sleeve",
  "makeup",
  "dj",
  "board",
  "lips",
  "coffee",
  "grass",
];

type Cell = {
  clips: { src: string; g: string }[];
  kind?: "site" | "type" | "air" | "mono" | "word";
};

const CELLS: Cell[] = [
  { clips: [{ src: "wing", g: "cream" }], kind: "site" },
  {
    clips: [
      { src: "reels", g: "ember" },
      { src: "piano", g: "cream" },
    ],
  },
  { clips: [{ src: "wingblue", g: "sage" }] },
  { clips: [{ src: "shadows", g: "teal" }] },
  {
    clips: [
      { src: "keys", g: "acid" },
      { src: "peaks", g: "invert" },
    ],
    kind: "type",
  },
  { clips: [{ src: "reel", g: "cream" }] },
  { clips: [{ src: "station", g: "cream" }], kind: "mono" },
  { clips: [{ src: "tokyo", g: "rust" }], kind: "word" },
  { clips: [{ src: "wingpink", g: "ember" }], kind: "air" },
];

const PLATE = [
  { src: "espresso", g: "cream" },
  { src: "coffee", g: "warm" },
  { src: "lips", g: "wine" },
  { src: "board", g: "ember" },
];

const POEM = [
  ["it", "was", "never"],
  ["about", "the"],
  ["big", "things"],
].map((line, li, all) =>
  line.map((word, k) => ({ word, idx: all.slice(0, li).flat().length + k })),
);

const v = (name: string) => `/intro/${name}.mp4`;

/* Only the opening shots preload up front; the rest wait their turn (see warm()). */
function Clip({ src, eager = false }: { src: string; eager?: boolean }) {
  return (
    <video
      src={v(src)}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}

/* Show only the listed grid cells of an element (0..8, row-major). null = whole frame. */
function setCells(el: HTMLElement, cells: number[] | null) {
  const s = el.style;
  if (!cells) {
    for (const p of ["mask-image", "-webkit-mask-image"]) s.removeProperty(p);
    return;
  }
  const img =
    cells.map(() => "linear-gradient(#000,#000)").join(",") ||
    "linear-gradient(transparent,transparent)";
  const pos =
    cells.map((c) => `${(c % 3) * 50}% ${Math.floor(c / 3) * 50}%`).join(",") ||
    "0 0";
  for (const pre of ["", "-webkit-"]) {
    s.setProperty(`${pre}mask-image`, img);
    s.setProperty(`${pre}mask-position`, pos);
    s.setProperty(`${pre}mask-size`, "33.34% 33.34%");
    s.setProperty(`${pre}mask-repeat`, "no-repeat");
  }
}

function play(el: Element | null) {
  const vid = el?.querySelector("video");
  if (vid && vid.paused) vid.play().catch(() => {});
}
function pause(el: Element | null) {
  el?.querySelectorAll("video").forEach((vid) => vid.pause());
}

export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const done = () => {
      html.classList.remove("is-loading");
      html.classList.add("is-loaded");
      // Hide rather than detach: React owns this node, and removing it
      // breaks the next reconciliation (insertBefore/removeChild errors).
      el.querySelectorAll("video").forEach((v) => v.pause());
      el.style.display = "none";
      el.setAttribute("aria-hidden", "true");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }
    html.classList.add("is-loading");
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const q = <T extends Element = HTMLElement>(s: string) =>
      el.querySelector<T>(s)!;
    const qa = <T extends Element = HTMLElement>(s: string) =>
      Array.from(el.querySelectorAll<T>(s));
    const shot = (id: string) => q(`[data-shot="${id}"]`);
    const cells = qa("[data-cell]");
    const plates = qa("[data-plate]");
    const words = qa("[data-w]");

    let z = 1;
    const live = new Set<string>();
    const on = (id: string, area: number[] | null = null, g?: string) => {
      const s = shot(id);
      s.style.zIndex = String(++z);
      s.style.visibility = "visible";
      setCells(s, area);
      if (g) s.dataset.g = g;
      play(s);
      live.add(id);
    };
    const off = (...ids: string[]) =>
      ids.forEach((id) => {
        const s = shot(id);
        s.style.visibility = "hidden";
        pause(s);
        live.delete(id);
      });
    const solo = (id: string, g?: string) => {
      on(id, null, g);
      [...live].filter((x) => x !== id).forEach((x) => off(x));
    };
    const grade = (id: string, g: string) => (shot(id).dataset.g = g);
    const showWords = (n: number) =>
      words.forEach((w, i) => w.classList.toggle("is-on", i < n));
    const cellOn = (i: number, k = 0, g?: string) => {
      const c = cells[i];
      c.classList.add("is-on");
      c.querySelectorAll<HTMLElement>("[data-k]").forEach((m, j) => {
        const active = j === k;
        m.classList.toggle("is-on", active);
        if (active) {
          if (g) m.dataset.g = g;
          play(m);
        } else pause(m);
      });
    };
    const cellGrade = (i: number, g: string, k = 0) => {
      const m = cells[i].querySelectorAll<HTMLElement>("[data-k]")[k];
      if (m) m.dataset.g = g;
    };
    const plateOn = (k: number) =>
      plates.forEach((p, j) => {
        p.classList.toggle("is-on", j === k);
        if (j === k) play(p);
        else pause(p);
      });
    const typeInto = (
      target: HTMLElement,
      text: string,
      at: number,
      dur: number,
    ) => {
      const o = { n: 0 };
      tl.to(
        o,
        {
          n: text.length,
          duration: dur,
          ease: "none",
          onUpdate: () => (target.textContent = text.slice(0, Math.round(o.n))),
        },
        at,
      );
    };

    const tag = q(".ix-tag");
    const poem = q(".ix-poem");
    const sub = q(".ix-sub");
    const mosaic = q(".ix-mosaic");
    const plate = q(".ix-plate");
    const lines = q(".ix-lines");
    const bars = qa(".ix-bar");
    const typer = q(".ix-typer");
    const cards = qa("[data-card]");
    const cellType = q("[data-celltype]");
    const cellSub = q("[data-cellsub]");
    const cellMono = q("[data-cellmono]");
    const cellWord = q("[data-cellword]");
    const drive = shot("drive");

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
    });
    // Dev only: lets a recorder read and seek the reel's own clock.
    if (process.env.NODE_ENV !== "production")
      (window as unknown as { __ix?: gsap.core.Timeline }).__ix = tl;
    const at = (t: number, fn: () => void) => tl.call(fn, undefined, t);

    /* A · 0.00–0.33  black, then the frame opens column by column */
    at(0.08, () => on("eye", [0, 3, 6]));
    at(0.17, () => on("sleeve", [0, 3, 6]));
    at(0.25, () => {
      off("sleeve");
      on("eye", [0, 1, 3, 4, 6, 7]);
      tag.classList.add("is-on");
    });
    at(0.33, () => on("eye"));

    /* B · 0.42–2.05  two- and three-frame cuts while the poem builds */
    at(0.42, () => {
      tag.classList.remove("is-on");
      solo("sleeve");
    });
    at(0.5, () => {
      solo("makeup");
      showWords(2);
    });
    at(0.58, () => solo("dj"));
    at(0.67, () => solo("board", "cream"));
    at(0.75, () => {
      grade("board", "ember");
      showWords(3);
    });
    at(0.83, () => grade("board", "dark"));
    at(0.92, () => grade("board", "ember"));
    at(1.0, () => {
      solo("cream");
      showWords(5);
    });
    at(1.12, () => solo("lips"));
    at(1.25, () => {
      solo("coffee");
      showWords(6);
    });
    at(1.42, () => {
      solo("grass");
      showWords(7);
    });
    tl.fromTo(
      q(".ix-poem [data-w='6']"),
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power1.inOut" },
      1.42,
    );
    tl.fromTo(
      shot("grass"),
      { scale: 1.08 },
      { scale: 1, duration: 0.7, ease: "power3.out" },
      1.42,
    );

    /* C · 2.05–2.60  the frame breaks: corners pop in around a cycling plate */
    at(2.05, () => {
      solo("blob");
      lines.classList.add("is-off");
      mosaic.classList.add("is-on");
      plate.classList.add("is-on");
      cellOn(0);
      plateOn(0);
    });
    at(2.13, () => {
      cellOn(2);
      plateOn(1);
    });
    at(2.21, () => {
      cellOn(6);
      plateOn(2);
    });
    at(2.29, () => {
      cellOn(8);
      plateOn(3);
    });
    at(2.37, () => plateOn(0));
    tl.fromTo(
      plate,
      { left: "17%", top: "27%", width: "49%", height: "46%" },
      {
        left: "33.6%",
        top: "33.6%",
        width: "32.8%",
        height: "32.8%",
        duration: 0.14,
        ease: "power3.in",
      },
      2.42,
    );
    at(2.5, () => poem.classList.add("is-off"));
    at(2.56, () => {
      [1, 3, 5, 7].forEach((i) => cellOn(i));
      plate.classList.remove("is-on");
      plateOn(-1);
      off("blob");
    });
    at(2.6, () => cellOn(4));

    /* D · 2.60–4.40  nine screens, each on its own clock */
    typeInto(cellType, "wake up", 2.68, 0.3);
    at(2.8, () => (cellSub.textContent = "a reel by 626"));
    typeInto(cellMono, "slt b", 2.78, 0.2);
    at(2.9, () => cellOn(1, 1));
    at(2.95, () => cellGrade(5, "invert"));
    at(3.03, () => cellGrade(5, "cream"));
    at(3.0, () => (cellWord.textContent = "frame"));
    at(3.2, () => cellGrade(3, "invert"));
    at(3.28, () => cellGrade(3, "teal"));
    typeInto(cellType, "wake up to", 3.22, 0.12);
    typeInto(cellMono, "slt b roll 04", 3.38, 0.3);
    at(3.45, () => cellOn(1, 0, "ember"));
    at(3.5, () => cellGrade(1, "invert"));
    at(3.58, () => cellGrade(1, "ember"));
    at(3.55, () => {
      cellOn(4, 1);
      cellType.innerHTML = "the <b>small</b> things";
      cellSub.textContent = "to happen";
    });
    at(3.6, () => (cellWord.textContent = "cut"));
    at(3.7, () => cellGrade(5, "invert"));
    at(3.78, () => cellGrade(5, "cream"));
    at(3.95, () => cellOn(4, 0, "rust"));
    at(4.1, () => cellGrade(8, "invert"));
    at(4.18, () => cellGrade(8, "ember"));

    /* E · 4.40–5.75  back to one frame; subtitles word by word */
    at(4.4, () => {
      mosaic.classList.remove("is-on");
      cells.forEach((c) => pause(c));
      lines.classList.remove("is-off");
      solo("muse");
    });
    tl.fromTo(
      shot("muse"),
      { scale: 1.04 },
      { scale: 1.1, duration: 1.4, ease: "none" },
      4.4,
    );
    at(4.85, () => {
      sub.textContent = "and";
      sub.classList.add("is-on");
    });
    at(5.1, () => (sub.textContent = "all the"));
    at(5.35, () => (sub.textContent = "way"));
    at(5.75, () => {
      sub.classList.remove("is-on");
      off("muse");
    });

    /* F · 5.83–6.75  one-frame flash, black, then a slit opens and drifts down */
    at(5.83, () => solo("guitar"));
    at(5.9, () => off("guitar"));
    at(6.0, () => on("guitar"));
    tl.fromTo(
      shot("guitar"),
      { clipPath: "inset(49.6% 0% 49.6% 0%)" },
      { clipPath: "inset(60% 0% 15% 0%)", duration: 0.8, ease: "power3.out" },
      6.0,
    );
    tl.fromTo(
      shot("guitar").querySelector("video"),
      { yPercent: -8 },
      { yPercent: 6, duration: 1.3, ease: "power1.out" },
      6.0,
    );

    /* G · 6.75–7.25  the next shot takes the grid cell by cell */
    at(6.75, () => on("pier", [2]));
    at(6.85, () => on("pier", [1, 2, 5]));
    at(6.95, () => on("pier", [0, 1, 2, 5, 8]));
    at(7.05, () => on("pier", [0, 1, 2, 4, 5, 7, 8]));
    at(7.15, () => on("pier", [0, 1, 2, 3, 4, 5, 7, 8]));
    at(7.25, () => {
      on("pier");
      off("guitar");
      gsap.set(shot("guitar"), { clipPath: "none" });
    });

    /* H · 7.25–8.25  a held breath */
    tl.fromTo(
      shot("pier"),
      { scale: 1 },
      { scale: 1.06, duration: 1.0, ease: "none" },
      7.25,
    );

    /* I · 8.25–8.60  the frame jumps, a new shot wipes down row by row */
    tl.set(shot("pier"), { yPercent: 7, scale: 1.12 }, 8.25);
    at(8.33, () => on("road", [0, 1, 2]));
    at(8.46, () => on("road", [0, 1, 2, 3, 4, 5]));
    at(8.6, () => {
      on("road");
      off("pier");
    });
    tl.fromTo(
      shot("road"),
      { scale: 1.12 },
      { scale: 1, duration: 0.8, ease: "power2.out" },
      8.33,
    );

    /* K · 9.10–9.80  letterbox and a typewriter line */
    at(9.1, () => solo("mist"));
    tl.fromTo(
      bars,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.22, ease: "power3.out" },
      9.1,
    );
    typeInto(typer, "this is the best part", 9.2, 0.55);

    /* L · 9.80–10.60  slit-scan smear, mono cards, a negative cell */
    at(9.8, () => on("smear", [2, 5, 8]));
    at(9.9, () => {
      on("smear");
      off("mist");
      typer.textContent = "";
      cards[0].classList.add("is-on");
    });
    tl.set(bars, { scaleY: 0 }, 9.9);
    tl.fromTo(
      shot("smear").querySelector("video"),
      { transformOrigin: "50% 30%" },
      { transformOrigin: "50% 70%", duration: 0.3, ease: "none" },
      9.8,
    );
    at(10.12, () => cards[0].classList.remove("is-on"));
    at(10.2, () => {
      solo("leader");
      on("negative", [4]);
      cards[1].classList.add("is-on");
    });
    at(10.36, () => {
      off("negative");
      grade("leader", "dark");
      cards[1].classList.remove("is-on");
      cards[2].classList.add("is-on");
    });

    /* N · 10.60–11.35  night runway */
    at(10.6, () => {
      cards[2].classList.remove("is-on");
      solo("runway");
    });
    tl.fromTo(
      shot("runway"),
      { scale: 1.02 },
      { scale: 1.09, duration: 0.75, ease: "none" },
      10.6,
    );

    /* O · 11.35–12.45  portraits; the grade flips on the cut, one punch-in */
    at(11.35, () => solo("dusk"));
    at(11.55, () => solo("model", "moss"));
    at(11.75, () => grade("model", "rust"));
    at(11.9, () => solo("neon", "moss"));
    tl.set(shot("neon"), { scale: 1.75, transformOrigin: "62% 40%" }, 11.9);
    tl.set(shot("neon"), { scale: 1 }, 12.05);
    at(12.05, () => grade("neon", "rust"));
    at(12.2, () => solo("shades", "moss"));

    /* P · 12.45–12.85  collage: an L of the turned shot, a centre cell, a poster */
    at(12.45, () => {
      off("shades");
      shot("model").classList.add("is-flip");
      on("model", [0, 1, 3, 6, 7], "rust");
      on("sky", [4]);
      on("poster", [2, 5, 8]);
    });
    at(12.65, () => grade("sky", "invert"));

    /* Q · 12.85–13.90  the last frame rounds off, then lands in the hero */
    at(12.85, () => {
      solo("drive");
      gsap.set(drive, {
        top: 0,
        left: 0,
        width: innerWidth,
        height: innerHeight,
        borderRadius: 0,
      });
      const m = Math.round(Math.min(innerWidth, innerHeight) * 0.018);
      gsap.to(drive, {
        top: m,
        left: m,
        width: innerWidth - m * 2,
        height: innerHeight - m * 2,
        borderRadius: Math.max(18, m * 2),
        duration: 0.22,
        ease: "power3.out",
      });
    });
    at(13.9, () => finale());

    let exiting = false;
    function finale() {
      if (exiting) return;
      exiting = true;
      tl.kill();
      el!.classList.add("is-exiting");
      const panel = document.querySelector<HTMLElement>(".hero__panel");
      const out = gsap.timeline({ onComplete: done });
      if (!panel) {
        html.classList.add("is-loaded");
        out.to(el, { autoAlpha: 0, duration: 0.6 });
        return;
      }
      const r = panel.getBoundingClientRect();
      const ty =
        new DOMMatrixReadOnly(getComputedStyle(panel).transform).m42 || 0;
      const radius =
        parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 24;
      out
        .to(
          q(".ix-bg"),
          { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" },
          0.15,
        )
        .to(
          [lines, q(".ix-grain"), q(".ix-wash"), q(".ix-skip")],
          { autoAlpha: 0, duration: 0.4 },
          0,
        )
        .to(
          drive,
          {
            top: r.top - ty,
            left: r.left,
            width: r.width,
            height: r.height,
            borderRadius: radius,
            duration: 1.15,
            ease: "expo.inOut",
          },
          0,
        )
        .call(() => html.classList.add("is-loaded"), undefined, 0.75)
        .to(drive, { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 1.35);
    }

    const skip = () => {
      if (exiting) return;
      tl.kill();
      [...live].forEach((x) => x !== "drive" && off(x));
      [tag, poem, sub, mosaic, plate, typer, ...cards].forEach((n) =>
        n.classList.remove("is-on"),
      );
      mosaic.classList.remove("is-on");
      cells.forEach((c) => pause(c));
      gsap.set(bars, { scaleY: 0 });
      if (!live.has("drive")) {
        solo("drive");
        const m = Math.round(Math.min(innerWidth, innerHeight) * 0.018);
        gsap.set(drive, {
          top: m,
          left: m,
          width: innerWidth - m * 2,
          height: innerHeight - m * 2,
          borderRadius: Math.max(18, m * 2),
        });
      }
      finale();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    q(".ix-skip").addEventListener("click", skip);
    window.addEventListener("keydown", onKey);

    /* Wait for the footage (and the type) before rolling, with a ceiling. */
    /* Roll once the first two seconds of footage can play; the rest keeps
       loading underneath and has seconds of headroom before its cue. */
    const vids = OPENING.map((id) => shot(id).querySelector("video")!);
    const count = q(".ix-count");
    let ready = 0;
    let started = false;
    let warmed = false;
    const warm = () => {
      if (warmed) return;
      warmed = true;
      qa<HTMLVideoElement>('video[preload="none"]').forEach((vid) => {
        vid.preload = "auto";
        vid.load();
      });
    };
    const start = () => {
      if (started) return;
      started = true;
      warm();
      count.classList.add("is-off");
      if (
        process.env.NODE_ENV !== "production" &&
        location.search.includes("ixhold")
      )
        return;
      tl.play(0);
    };
    const bump = () => {
      ready++;
      count.textContent = String(
        Math.round((ready / vids.length) * 100),
      ).padStart(2, "0");
      if (ready < vids.length) return;
      warm();
      document.fonts.ready.then(() => window.setTimeout(start, 180));
    };
    vids.forEach((vid) => {
      if (vid.readyState >= 3) return bump();
      let counted = false;
      const once = () => {
        if (counted) return;
        counted = true;
        bump();
      };
      vid.addEventListener("canplay", once, { once: true });
      vid.addEventListener("error", once, { once: true });
    });
    const ceiling = window.setTimeout(start, 4000);

    return () => {
      window.clearTimeout(ceiling);
      window.removeEventListener("keydown", onKey);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="ix">
      <div className="ix-stage" aria-hidden="true">
        <div className="ix-bg" />

        {SHOTS.map((s) => (
          <div
            key={s.id}
            data-shot={s.id}
            data-g={s.g}
            className={`ix-shot ix-media ${s.cls ?? ""}`}
          >
            {s.src ? <Clip src={s.src} eager={OPENING.includes(s.id)} /> : null}
            {s.id === "poster" ? (
              <div className="ix-poster">
                <span className="ix-poster__kicker">daily cut · no. 04</span>
                <span className="ix-poster__word">
                  626<i>&amp;</i>
                </span>
                <span className="ix-poster__small">
                  frame, grade, build, ship. camera to code, one team.
                </span>
              </div>
            ) : null}
          </div>
        ))}

        <div className="ix-mosaic">
          {CELLS.map((c, i) => (
            <div key={i} data-cell={i} className="ix-cell">
              {c.clips.map((m, k) => (
                <div
                  key={k}
                  data-k={k}
                  data-g={m.g}
                  className="ix-media ix-cell__clip"
                >
                  <Clip src={m.src} />
                </div>
              ))}
              <div className="ix-chrome">
                <span>K&amp;C</span>
                <span>Work</span>
                <span>Index</span>
              </div>
              {c.kind === "site" ? (
                <p className="ix-cell__title ix-cell__title--serif">
                  Field notes
                </p>
              ) : null}
              {c.kind === "air" ? (
                <p className="ix-cell__title ix-cell__title--bold">
                  Air-
                  <br />
                  port
                </p>
              ) : null}
              {c.kind === "type" ? (
                <div className="ix-cell__type">
                  <p data-celltype className="ix-cell__big" />
                  <p data-cellsub className="ix-cell__cap" />
                </div>
              ) : null}
              {c.kind === "mono" ? (
                <p data-cellmono className="ix-cell__mono" />
              ) : null}
              {c.kind === "word" ? (
                <p className="ix-cell__phrase">
                  <span>The</span>
                  <b data-cellword>shot</b>
                  <span>is</span>
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="ix-plate">
          {PLATE.map((m, k) => (
            <div
              key={k}
              data-plate={k}
              data-g={m.g}
              className="ix-media ix-plate__clip"
            >
              <Clip src={m.src} />
            </div>
          ))}
        </div>

        <div className="ix-wash" />
        <div className="ix-bar ix-bar--top" />
        <div className="ix-bar ix-bar--bottom" />
        <div className="ix-lines">
          <i />
          <i />
          <i />
          <i />
        </div>

        <p className="ix-tag">If you</p>
        <p className="ix-poem">
          {POEM.map((line, li) => (
            <span key={li} className={`ix-poem__line ix-poem__line--${li}`}>
              {line.map(({ word, idx }) => (
                <span
                  key={word}
                  data-w={idx}
                  data-text={word}
                  className={word === "things" ? "is-script" : undefined}
                  style={{ "--i": idx } as CSSProperties}
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </p>
        <p className="ix-sub" />
        <p className="ix-typer" />
        <p data-card className="ix-card">
          We keep the camera on the small things until they turn into the story
        </p>
        <p data-card className="ix-card">
          Freedom is the frame you choose, not the one you were handed
        </p>
        <p data-card className="ix-card">
          Camera to code. One team, one cut, one place to play it
        </p>

        <div className="ix-grain" />
        <p className="ix-count">00</p>
      </div>
      <button type="button" className="ix-skip">
        Skip intro
      </button>
    </div>
  );
}
