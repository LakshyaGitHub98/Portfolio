"use client";

import { Canvas } from "@react-three/fiber";
import BackgroundParticles from "./BackgroundParticles";
import Core from "./Core";
import Lights from "./Lights";

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
        <Lights />
        <BackgroundParticles />
        <Core scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
