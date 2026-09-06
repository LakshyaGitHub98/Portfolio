"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const Scene = dynamic(() => import("@/three/Scene"), { ssr: false });

export default function SceneWrapper() {
  const { progress } = useScrollProgress();
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return <Scene scrollProgress={progress} />;
}
