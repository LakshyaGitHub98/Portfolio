"use client";

import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const Scene = dynamic(() => import("@/three/Scene"), { ssr: false });

export default function SceneWrapper() {
  const { progress } = useScrollProgress();
  return <Scene scrollProgress={progress} />;
}
