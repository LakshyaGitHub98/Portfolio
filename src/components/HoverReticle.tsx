"use client";

import { useEffect, useRef, useState } from "react";

const SELECTOR = "a, button, [role='tab'], input, textarea, select";

interface ReticleState {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function HoverReticle() {
  const [reticle, setReticle] = useState<ReticleState | null>(null);
  const [isFine, setIsFine] = useState(false);
  const rafRef = useRef<number>(0);
  const reticleRef = useRef<ReticleState | null>(null);

  // Keep ref in sync
  reticleRef.current = reticle;

  // Only enable on pointer: fine devices
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isFine) return;

    const onEnter = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (!el?.closest) return;
      const target = el.closest(SELECTOR);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      setReticle({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
    };

    const onLeave = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (!el?.closest) return;
      const target = el.closest(SELECTOR);
      if (target) setReticle(null);
    };

    const onMove = (e: PointerEvent) => {
      if (!reticleRef.current) return;
      const el = e.target as HTMLElement;
      if (!el?.closest) return;
      const target = el.closest(SELECTOR);
      if (target) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const rect = target.getBoundingClientRect();
          setReticle({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
        });
      }
    };

    document.addEventListener("pointerenter", onEnter, true);
    document.addEventListener("pointerleave", onLeave, true);
    document.addEventListener("pointermove", onMove, true);
    return () => {
      document.removeEventListener("pointerenter", onEnter, true);
      document.removeEventListener("pointerleave", onLeave, true);
      document.removeEventListener("pointermove", onMove, true);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isFine]);

  if (!isFine || !reticle) return null;

  const cornerLen = Math.min(12, reticle.w / 3, reticle.h / 3);
  const offset = 4;

  return (
    <div
      className="fixed inset-0 z-[70] pointer-events-none"
      aria-hidden="true"
      style={{ contain: "layout" }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Top-left */}
        <path
          d={`M ${reticle.x - offset},${reticle.y - offset + cornerLen} L ${reticle.x - offset},${reticle.y - offset} L ${reticle.x - offset + cornerLen},${reticle.y - offset}`}
          fill="none"
          stroke="#BF5B2E"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Top-right */}
        <path
          d={`M ${reticle.x + reticle.w + offset - cornerLen},${reticle.y - offset} L ${reticle.x + reticle.w + offset},${reticle.y - offset} L ${reticle.x + reticle.w + offset},${reticle.y - offset + cornerLen}`}
          fill="none"
          stroke="#BF5B2E"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Bottom-left */}
        <path
          d={`M ${reticle.x - offset},${reticle.y + reticle.h + offset - cornerLen} L ${reticle.x - offset},${reticle.y + reticle.h + offset} L ${reticle.x - offset + cornerLen},${reticle.y + reticle.h + offset}`}
          fill="none"
          stroke="#BF5B2E"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Bottom-right */}
        <path
          d={`M ${reticle.x + reticle.w + offset - cornerLen},${reticle.y + reticle.h + offset} L ${reticle.x + reticle.w + offset},${reticle.y + reticle.h + offset} L ${reticle.x + reticle.w + offset},${reticle.y + reticle.h + offset - cornerLen}`}
          fill="none"
          stroke="#BF5B2E"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
