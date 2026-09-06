"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useViewportSize } from "@/hooks/useViewportSize";
import BackgroundParticles from "./BackgroundParticles";
import Core from "./Core";
import Lights from "./Lights";
import Modules from "./Modules";

function DemandTrigger({ progress }: { progress: number }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [progress, invalidate]);
  useEffect(() => {
    const onPointerMove = () => invalidate();
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [invalidate]);
  return null;
}

function CameraRig({ progress }: { progress: number }) {
  const { camera, invalidate } = useThree();
  const targetZ = useRef(5);
  const reducedMotion = useRef(false);

  if (typeof window !== "undefined") {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  useFrame(() => {
    if (reducedMotion.current) {
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      return;
    }
    const p = progress;
    let z: number;
    if (p < 0.15) z = THREE.MathUtils.lerp(5, 2, p / 0.15);
    else if (p < 0.45) z = 2;
    else if (p < 0.75) z = THREE.MathUtils.lerp(2, 4, (p - 0.45) / 0.3);
    else z = THREE.MathUtils.lerp(4, 5, (p - 0.75) / 0.25);
    const y = p < 0.25 ? THREE.MathUtils.lerp(0, -0.3, p / 0.25) : p < 0.5 ? THREE.MathUtils.lerp(-0.3, 0, (p - 0.25) / 0.25) : 0;
    const prevZ = targetZ.current;
    const prevY = camera.position.y;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, z, 0.06);
    camera.position.z = targetZ.current;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.06);
    camera.lookAt(0, 0, 0);
    if (Math.abs(targetZ.current - prevZ) > 0.0001 || Math.abs(camera.position.y - prevY) > 0.0001) {
      invalidate();
    }
  });
  return null;
}

type Props = {
  scrollProgress?: number;
};

export default function Scene({ scrollProgress = 0 }: Props) {
  const { particleCount, bgParticleCount, dpr } = useViewportSize();
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#050505" }}
        frameloop="demand"
      >
        <DemandTrigger progress={scrollProgress} />
        <CameraRig progress={scrollProgress} />
        <Lights />
        <BackgroundParticles count={bgParticleCount} />
        <Core scrollProgress={scrollProgress} particleCount={particleCount} />
        <Modules scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
