"use client";

import { useEffect, useRef, useState } from "react";

const SECTION_IDS = ["hero", "about", "engineering", "stack", "projects", "experience", "contact"] as const;

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionEls = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const cache = () => {
      sectionEls.current = SECTION_IDS.map((id) => document.getElementById(id));
    };
    cache();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));

      let active = 0;
      for (let i = 0; i < sectionEls.current.length; i++) {
        const el = sectionEls.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) active = i;
      }
      setActiveSection(active);
    };

    const onResize = () => {
      cache();
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { progress, activeSection, total: SECTION_IDS.length, ids: SECTION_IDS };
}
