import * as THREE from "three";

import type { ColorScheme } from "@/hooks/useColorScheme";

export interface PointerState {
  x: number;
  y: number;
}

export interface ScenePalette {
  low: string;
  high: string;
  accent: string;
  opacity: number;
  blending: THREE.Blending;
}

// Dark mode uses additive glow. Light mode uses normal blending so the points stay visible on pale backgrounds.
const palettes: Record<ColorScheme, ScenePalette> = {
  dark: {
    low: "#15392b",
    high: "#6ec49b",
    accent: "#6ec49b",
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  },
  light: {
    low: "#a9c9bb",
    high: "#137450",
    accent: "#137450",
    opacity: 0.85,
    blending: THREE.NormalBlending,
  },
};

export function getScenePalette(scheme: ColorScheme): ScenePalette {
  return palettes[scheme];
}
