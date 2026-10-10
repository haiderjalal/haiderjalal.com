"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { Component, useRef } from "react";
import type { ReactElement, ReactNode } from "react";

// The scene needs WebGL and browser APIs, so it loads only on the client, after the text has painted.
const HeroScene = dynamic(
  () => import("./HeroScene").then((module) => module.HeroScene),
  { ssr: false, loading: () => null },
);

interface SceneBoundaryProps {
  children: ReactNode;
}

interface SceneBoundaryState {
  failed: boolean;
}

// WebGL can be unavailable (disabled GPU, older devices). The hero keeps its gradient backdrop
// instead of breaking the page, so the scene is treated as optional decoration.
class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true };
  }

  render(): ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

// Pauses the render loop while the hero is off screen, saving battery and GPU time.
export function HeroBackdrop(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 -z-10">
      <SceneBoundary>
        <HeroScene paused={!isVisible} />
      </SceneBoundary>
    </div>
  );
}
