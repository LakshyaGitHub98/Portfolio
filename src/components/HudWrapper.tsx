"use client";

import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const Hud = dynamic(() => import("@/components/Hud"), { ssr: false });

const CORE_STATE: Record<number, string> = {
  0: "IDLE",
  1: "MOVING",
  2: "SPLITTING",
  3: "ASSEMBLING",
  4: "ACTIVE",
  5: "REASSEMBLING",
  6: "READY",
};

export default function HudWrapper() {
  const { activeSection, total } = useScrollProgress();
  const coreState = CORE_STATE[activeSection] ?? "IDLE";
  return <Hud activeSection={activeSection} total={total} coreState={coreState} />;
}
