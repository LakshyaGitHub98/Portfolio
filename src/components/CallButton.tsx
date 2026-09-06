"use client";

import { useEffect, useState } from "react";

export default function CallButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(pointer: coarse)");
    setIsMobile(m.matches);
    const onChange = () => setIsMobile(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded transition-colors duration-200";
  const secondary =
    "border border-steel text-bone hover:border-copper hover:text-copper";

  if (isMobile) {
    return (
      <a href="tel:+919839953414" className={`${base} ${secondary}`}>
        Call me
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setShowNumber((v) => !v)}
        aria-expanded={showNumber}
        className={`${base} ${secondary}`}
      >
        Call me
      </button>
      {showNumber && (
        <a
          href="tel:+919839953414"
          className="font-mono text-sm text-bone hover:text-copper transition-colors"
        >
          +91 9839953414
        </a>
      )}
    </div>
  );
}
