"use client";

import { Canvas } from "@react-three/fiber";
import Core from "./Core";
import Lights from "./Lights";

export default function Scene() {
  return (
    <div className="w-[320px] h-[320px] lg:w-[380px] lg:h-[380px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#050505" }}
      >
        <Lights />
        <Core />
      </Canvas>
    </div>
  );
}
