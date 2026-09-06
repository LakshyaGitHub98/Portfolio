"use client";

import { useEffect } from "react";
import { buildScrollAnimations } from "@/animations/scroll";

export default function ScrollAnimations() {
  useEffect(() => {
    const cleanup = buildScrollAnimations();
    return cleanup;
  }, []);
  return null;
}
