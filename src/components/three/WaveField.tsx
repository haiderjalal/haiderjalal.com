"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { ReactElement, RefObject } from "react";
import * as THREE from "three";

import type { PointerState, ScenePalette } from "./sceneConfig";
import { waveFragmentShader, waveVertexShader } from "./waveShaders";

const GRID_SIZE = 84;
const FIELD_WIDTH = 9.6;
const FIELD_DEPTH = 6.4;
const POINTER_EASING = 0.08;

type WaveUniforms = {
  uTime: THREE.IUniform<number>;
  uPixelRatio: THREE.IUniform<number>;
  uPointer: THREE.IUniform<THREE.Vector2>;
  uExtent: THREE.IUniform<THREE.Vector2>;
  uColorLow: THREE.IUniform<THREE.Color>;
  uColorHigh: THREE.IUniform<THREE.Color>;
  uOpacity: THREE.IUniform<number>;
};

interface WaveFieldProps {
  pointer: RefObject<PointerState>;
  palette: ScenePalette;
  reduce: boolean;
}

// Hash-based variation keeps each point's size stable between renders without using Math.random.
function seedFor(index: number): number {
  const hash = Math.sin(index * 12.9898) * 43758.5453;
  return hash - Math.floor(hash);
}

function createGridGeometry(): THREE.BufferGeometry {
  const count = GRID_SIZE * GRID_SIZE;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let column = 0; column < GRID_SIZE; column += 1) {
      const index = row * GRID_SIZE + column;
      positions[index * 3] = (column / (GRID_SIZE - 1) - 0.5) * FIELD_WIDTH;
      positions[index * 3 + 1] = (row / (GRID_SIZE - 1) - 0.5) * FIELD_DEPTH;
      seeds[index] = seedFor(index);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

// A tilted field of points that swells in layered sine waves and ripples toward the pointer.
// Uniform changes go through the live material, so React never mutates memoised state.
export function WaveField({ pointer, palette, reduce }: WaveFieldProps): ReactElement {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => createGridGeometry(), []);
  const uniforms = useMemo<WaveUniforms>(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uPointer: { value: new THREE.Vector2() },
      uExtent: { value: new THREE.Vector2(FIELD_WIDTH / 2, FIELD_DEPTH / 2) },
      uColorLow: { value: new THREE.Color() },
      uColorHigh: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    }),
    [],
  );

  // Layout effect so the palette is applied before the first painted frame.
  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    const shader = material.uniforms as WaveUniforms;
    shader.uColorLow.value.set(palette.low);
    shader.uColorHigh.value.set(palette.high);
    shader.uOpacity.value = palette.opacity;
    material.blending = palette.blending;
  }, [palette]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const shader = material.uniforms as WaveUniforms;
    if (!reduce) {
      shader.uTime.value += delta;
    }
    shader.uPixelRatio.value = state.gl.getPixelRatio();

    const targetX = reduce ? 0 : (pointer.current.x * state.viewport.width) / 2;
    const targetY = reduce ? 0 : (pointer.current.y * state.viewport.height) / 2;
    shader.uPointer.value.x += (targetX - shader.uPointer.value.x) * POINTER_EASING;
    shader.uPointer.value.y += (targetY - shader.uPointer.value.y) * POINTER_EASING;
  });

  return (
    <points geometry={geometry} position={[0, -1.25, 0]} rotation={[-0.78, 0, 0]}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        transparent
        depthWrite={false}
        blending={palette.blending}
      />
    </points>
  );
}
