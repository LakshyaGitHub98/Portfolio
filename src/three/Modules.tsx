"use client";

import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

type Props = {
  scrollProgress: number;
};

const MODULES = [
  { label: "AI", geom: "octahedron" as const, color: "#BF5B2E", radius: 1.8, tilt: 0 },
  { label: "BACKEND", geom: "box" as const, color: "#E8541D", radius: 2.2, tilt: 0.21 },
  { label: "FRONTEND", geom: "tetra" as const, color: "#EDEDEF", radius: 2.6, tilt: -0.14 },
  { label: "SYSTEMS", geom: "dodeca" as const, color: "#9195A0", radius: 3.0, tilt: 0.09 },
];

function ModuleMesh({ geom, color }: { geom: string; color: string }) {
  const dim = color === "#EDEDEF" ? 0.35 : color === "#9195A0" ? 0.35 : 1;
  if (geom === "octahedron")
    return (
      <mesh>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.12} roughness={0.4} metalness={0.6} />
      </mesh>
    );
  if (geom === "box")
    return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.12} roughness={0.4} metalness={0.6} />
      </mesh>
    );
  if (geom === "tetra")
    return (
      <mesh>
        <tetrahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08 * dim} roughness={0.4} metalness={0.5} />
      </mesh>
    );
  return (
    <mesh>
      <dodecahedronGeometry args={[0.32, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08} roughness={0.5} metalness={0.5} />
    </mesh>
  );
}

export default function Modules({ scrollProgress }: Props) {
  const groupRef = useRef<Group>(null);
  const modRefs = [useRef<Group>(null), useRef<Group>(null), useRef<Group>(null), useRef<Group>(null)];
  const reducedMotion = useRef(false);

  if (typeof window !== "undefined") {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  useFrame(({ clock }) => {
    if (reducedMotion.current) return;
    const p = scrollProgress;
    let t = 0;
    if (p < 0.25) t = 0;
    else if (p < 0.35) t = (p - 0.25) / 0.1;
    else if (p < 0.45) t = 1;
    else if (p < 0.55) t = 1 - (p - 0.45) / 0.1;
    else t = 0;

    const smooth = THREE.MathUtils.smootherstep(t, 0, 1);
    if (groupRef.current) {
      groupRef.current.visible = smooth > 0.01;
      groupRef.current.scale.setScalar(smooth);
    }

    modRefs.forEach((r, i) => {
      if (!r.current) return;
      const delay = i * 0.08;
      const local = THREE.MathUtils.clamp((t - delay) / (1 - delay), 0, 1);
      const s = THREE.MathUtils.smootherstep(local, 0, 1);
      const angle = clock.elapsedTime * 0.3 * (i % 2 === 0 ? 1 : -1) * (0.6 + i * 0.2);
      const radius = MODULES[i].radius * s;
      r.current.position.x = Math.cos(angle) * radius;
      r.current.position.z = Math.sin(angle) * radius;
      r.current.position.y = Math.sin(angle * 0.7) * 0.3 * s;
      r.current.rotation.y += 0.004 * (i % 2 === 0 ? 1 : -1);
      r.current.rotation.x += 0.002;
      r.current.scale.setScalar(s);
    });

    if (groupRef.current) groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef} visible={false}>
      {MODULES.map((m, i) => (
        <group key={m.label} ref={modRefs[i]} rotation={[m.tilt, 0, 0]}>
          <ModuleMesh geom={m.geom} color={m.color} />
          <Html center position={[0, 0.62, 0]} style={{ pointerEvents: "none" }}>
            <span
              style={{
                color: m.color,
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                textShadow: "0 0 6px #050505",
              }}
            >
              {m.label}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}
