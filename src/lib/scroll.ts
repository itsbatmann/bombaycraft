import type Lenis from "lenis";

// The page's smooth-scroll instance, shared so the preloader can pause it.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const lockScroll = (locked: boolean) => {
  if (locked) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
};
