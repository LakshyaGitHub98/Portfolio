"use client";

import { useEffect, useState } from "react";

type Viewport = {
  isMobile: boolean;
  isTablet: boolean;
  particleCount: number;
  bgParticleCount: number;
  dpr: [number, number];
};

export function useViewportSize(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    isMobile: false,
    isTablet: false,
    particleCount: 900,
    bgParticleCount: 120,
    dpr: [1, 2],
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const dpr = window.devicePixelRatio || 1;
      if (w < 640) {
        setViewport({
          isMobile: true,
          isTablet: false,
          particleCount: 300,
          bgParticleCount: 40,
          dpr: [1, Math.min(dpr, 1.5)],
        });
      } else if (w < 1024) {
        setViewport({
          isMobile: false,
          isTablet: true,
          particleCount: 500,
          bgParticleCount: 80,
          dpr: [1, Math.min(dpr, 2)],
        });
      } else {
        setViewport({
          isMobile: false,
          isTablet: false,
          particleCount: 900,
          bgParticleCount: 120,
          dpr: [1, Math.min(dpr, 2)],
        });
      }
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}
