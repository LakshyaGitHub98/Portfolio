"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export default function Core() {
  const groupRef = useRef<Group>(null);
  const ring1Ref = useRef<Group>(null);
  const ring2Ref = useRef<Group>(null);
  const ring3Ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      const s = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.scale.set(s, s, s);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.y += 0.001;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= 0.0008;
    if (ring3Ref.current) ring3Ref.current.rotation.y += 0.0012;
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
      <group ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.4, 0.008, 16, 120]} />
          <meshStandardMaterial color="#BF5B2E" emissive="#BF5B2E" emissiveIntensity={0.08} transparent opacity={0.9} />
        </mesh>
      </group>
      <group ref={ring2Ref} rotation={[Math.PI / 2 + 0.26, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.008, 16, 120]} />
          <meshStandardMaterial color="#BF5B2E" emissive="#BF5B2E" emissiveIntensity={0.06} transparent opacity={0.7} />
        </mesh>
      </group>
      <group ref={ring3Ref} rotation={[Math.PI / 2 - 0.175, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.0, 0.008, 16, 120]} />
          <meshStandardMaterial color="#BF5B2E" emissive="#BF5B2E" emissiveIntensity={0.05} transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}
