"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useViewportSize } from "@/hooks/useViewportSize";

const Scene = dynamic(() => import("@/three/Scene"), { ssr: false });

export default function SceneWrapper() {
  const { progress } = useScrollProgress();
  const reduced = usePrefersReducedMotion();
  const { isMobile } = useViewportSize();
  if (reduced || isMobile) return null;
  return <Scene scrollProgress={progress} />;
}
