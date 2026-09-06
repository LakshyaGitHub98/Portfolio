"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

type CoreProps = {
  particleCount?: number;
  scrollProgress?: number;
};

export default function Core({ particleCount = 750, scrollProgress = 0 }: CoreProps) {
  const groupRef = useRef<Group>(null);
  const ring1Ref = useRef<Group>(null);
  const ring2Ref = useRef<Group>(null);
  const ring3Ref = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const targetDrag = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const copper = new THREE.Color("#BF5B2E");
    const ember = new THREE.Color("#E8541D");
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.0;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() > 0.5 ? copper : ember;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [particleCount]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (isDragging.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        targetDrag.current.y = dx * 0.008;
        targetDrag.current.x = dy * 0.008;
      }
    };
    const onUp = () => {
      isDragging.current = false;
      targetDrag.current.x = 0;
      targetDrag.current.y = 0;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const handlePointerDown = (e: { clientX: number; clientY: number }) => {
    isDragging.current = true;
    dragStart.current.x = e.clientX;
    dragStart.current.y = e.clientY;
  };

  useFrame(({ clock }) => {
    dragOffset.current.x = THREE.MathUtils.lerp(dragOffset.current.x, targetDrag.current.x, isDragging.current ? 0.12 : 0.03);
    dragOffset.current.y = THREE.MathUtils.lerp(dragOffset.current.y, targetDrag.current.y, isDragging.current ? 0.12 : 0.03);
    if (groupRef.current) {
      if (!isDragging.current) groupRef.current.rotation.y += 0.002;
      else groupRef.current.rotation.y += dragOffset.current.y * 0.02;
      const parallaxX = mouse.current.y * -0.08;
      const parallaxZ = mouse.current.x * 0.08;
      const targetX = parallaxX + dragOffset.current.x;
      const targetZ = parallaxZ + dragOffset.current.y;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, isDragging.current ? 0.12 : 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, isDragging.current ? 0.12 : 0.05);
      const isSplit = scrollProgress >= 0.25 && scrollProgress < 0.55;
      const approachScale = scrollProgress < 0.18 ? 1 + scrollProgress * 0.6 : scrollProgress < 0.45 ? 1.11 : 1.11 - (scrollProgress - 0.45) * 0.3;
      const s = (1 + Math.sin(clock.elapsedTime * 0.5) * 0.02) * approachScale * (isSplit ? 0.32 : 1);
      groupRef.current.scale.set(s, s, s);
      [ring1Ref, ring2Ref, ring3Ref, particlesRef].forEach((r) => {
        if (r.current) r.current.visible = !isSplit;
      });
    }
    if (ring1Ref.current) ring1Ref.current.rotation.y += 0.001;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= 0.0008;
    if (ring3Ref.current) ring3Ref.current.rotation.y += 0.0012;
    if (particlesRef.current) particlesRef.current.rotation.y += 0.0004;
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        (e.target as unknown as { setPointerCapture?: (id: number) => void })?.setPointerCapture?.(e.pointerId);
        handlePointerDown({ clientX: e.clientX, clientY: e.clientY });
      }}
      onPointerUp={() => {
        isDragging.current = false;
        targetDrag.current.x = 0;
        targetDrag.current.y = 0;
      }}
    >
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
      <group ref={particlesRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.02} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
        </points>
      </group>
    </group>
  );
}
