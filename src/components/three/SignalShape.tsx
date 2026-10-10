"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { ReactElement } from "react";
import type * as THREE from "three";

interface SignalShapeProps {
  color: string;
  reduce: boolean;
}

// A slowly turning wireframe that floats above the wave field and adds depth to the hero.
export function SignalShape({ color, reduce }: SignalShapeProps): ReactElement {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (reduce || !mesh) return;

    mesh.rotation.x += delta * 0.12;
    mesh.rotation.y += delta * 0.18;
  });

  return (
    <mesh ref={meshRef} position={[2.1, 1.25, -0.4]}>
      <icosahedronGeometry args={[0.95, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  );
}
