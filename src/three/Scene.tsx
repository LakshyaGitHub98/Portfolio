"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import BackgroundParticles from "./BackgroundParticles";
import Core from "./Core";
import Lights from "./Lights";

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const targetZ = useRef(5);

  useFrame(() => {
    const p = progress;
    let z: number;
    if (p < 0.15) z = THREE.MathUtils.lerp(5, 2, p / 0.15);
    else if (p < 0.45) z = 2;
    else if (p < 0.75) z = THREE.MathUtils.lerp(2, 4, (p - 0.45) / 0.3);
    else z = THREE.MathUtils.lerp(4, 5, (p - 0.75) / 0.25);
    const y = p < 0.25 ? THREE.MathUtils.lerp(0, -0.3, p / 0.25) : p < 0.5 ? THREE.MathUtils.lerp(-0.3, 0, (p - 0.25) / 0.25) : 0;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, z, 0.06);
    camera.position.z = targetZ.current;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.06);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

type Props = {
  scrollProgress?: number;
};

export default function Scene({ scrollProgress = 0 }: Props) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#050505" }}
        frameloop="always"
      >
        <CameraRig progress={scrollProgress} />
        <Lights />
        <BackgroundParticles />
        <Core scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
