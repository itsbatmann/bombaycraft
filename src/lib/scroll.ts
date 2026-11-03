import type Lenis from "lenis";

// The page's smooth-scroll instance, shared so other parts of the page
// can drive it (the hero scrolls on when its film ends).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const lockScroll = (locked: boolean) => {
  if (locked) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
};

// Glides to an element; falls back to the browser's own smooth scroll.
export const scrollToElement = (el: Element, duration = 1.8) => {
  if (instance) instance.scrollTo(el as HTMLElement, { duration, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: "smooth" });
};
