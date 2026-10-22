import { useSyncExternalStore } from 'react';

// Shared state for the floating page player and the hero play button.
// PlayerBar owns all scroll and tour logic and registers a small controller
// here; Hero only reads state and calls the controller.
let state = {
  born: false, // started from the hero: the bar stays visible even at the top
  touring: false,
  // Published by the Projects section: { title, index, count, filterLabel, goTo } or null
  projects: null,
  // 'project' steps through the Projects carousel, 'section' skips whole sections.
  // Memory only, no browser storage.
  skipMode: 'project',
};
const listeners = new Set();

export const playerStore = {
  get: () => state,
  set(patch) {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  // Set by PlayerBar while mounted: { isOn, getBar, arrive, startTour, refresh }
  controller: null,
};

export const usePlayerState = (selector) =>
  useSyncExternalStore(playerStore.subscribe, () => selector(playerStore.get()));

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
