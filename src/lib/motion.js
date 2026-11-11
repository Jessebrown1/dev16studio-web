// Shared easing curves so every animation feels like part of one system.
export const EASE_OUT = [0.16, 1, 0.3, 1]; // expo-out: reveals, entrances
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]; // curtains, wipes
export const EASE_SOFT = [0.2, 0.7, 0.2, 1];

export const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
