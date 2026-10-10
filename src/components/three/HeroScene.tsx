"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ReactElement, RefObject } from "react";
import type { WebGLRendererParameters } from "three";

import { useColorScheme } from "@/hooks/useColorScheme";

import { getScenePalette, type PointerState } from "./sceneConfig";
import { SignalShape } from "./SignalShape";
import { WaveField } from "./WaveField";

const CAMERA_POSITION: [number, number, number] = [0, 1.5, 6.2];
const CAMERA = { position: CAMERA_POSITION, fov: 42 };
const GL_OPTIONS: WebGLRendererParameters = {
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
};
const CAMERA_EASING = 0.035;

interface HeroSceneProps {
  paused: boolean;
}

interface SceneRigProps {
  pointer: RefObject<PointerState>;
  reduce: boolean;
}

// Eases the camera toward the pointer. Motion values stay outside React state, so this costs no re-renders.
function SceneRig({ pointer, reduce }: SceneRigProps): null {
  useFrame((state) => {
    const { camera } = state;
    const targetX = reduce ? 0 : pointer.current.x * 0.6;
    const targetY = reduce
      ? CAMERA_POSITION[1]
      : CAMERA_POSITION[1] + pointer.current.y * 0.25;

    camera.position.x += (targetX - camera.position.x) * CAMERA_EASING;
    camera.position.y += (targetY - camera.position.y) * CAMERA_EASING;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene({ paused }: HeroSceneProps): ReactElement {
  const reduce = useReducedMotion() ?? false;
  const scheme = useColorScheme();
  const palette = getScenePalette(scheme);
  const pointer = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;

    function handlePointerMove(event: PointerEvent): void {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduce]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={CAMERA}
      gl={GL_OPTIONS}
      frameloop={paused ? "never" : "always"}
    >
      <SceneRig pointer={pointer} reduce={reduce} />
      <WaveField pointer={pointer} palette={palette} reduce={reduce} />
      <SignalShape color={palette.accent} reduce={reduce} />
    </Canvas>
  );
}
