"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export default function Core() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
    const s = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.02;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#BF5B2E"
          emissive="#BF5B2E"
          emissiveIntensity={0.15}
          roughness={0.32}
          metalness={0.78}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.115, 1]} />
        <meshStandardMaterial
          color="#E8541D"
          wireframe
          transparent
          opacity={0.14}
          emissive="#E8541D"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}
