import { useSyncExternalStore } from "react";

export type ColorScheme = "dark" | "light";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(DARK_SCHEME_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): ColorScheme {
  return window.matchMedia(DARK_SCHEME_QUERY).matches ? "dark" : "light";
}

function getServerSnapshot(): ColorScheme {
  return "dark";
}

// Tracks the system colour scheme so client-only visuals can match the page theme.
export function useColorScheme(): ColorScheme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
