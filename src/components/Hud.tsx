"use client";

import dynamic from "next/dynamic";

const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  activeSection?: number;
  total?: number;
  coreState?: string;
};

export default function Hud({ activeSection = 0, total = 7, coreState = "IDLE" }: Props) {
  const cur = String(activeSection + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  return (
    <div
      aria-label="System readout"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 hidden md:block pointer-events-none select-none"
    >
      <div className="bg-panel border border-steel rounded-sm px-3.5 py-2.5 min-w-[148px]">
        <div className="flex flex-col gap-1 font-mono text-[0.7rem] leading-none tracking-wide">
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">SECTION</span>
            <span className="text-bone">
              {cur} / {tot}
            </span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">STATUS</span>
            <span className="text-ember">ONLINE</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">CORE</span>
            <span className="text-bone">{coreState}</span>
          </div>
        </div>
        <div className="mt-2 h-px bg-steel/60" />
        <div className="mt-2 font-mono text-[0.62rem] leading-none tracking-widest text-fog/60">
          SYS READOUT | PHASE 09
        </div>
      </div>
      <div className="pointer-events-auto">
        <GitHubStats />
      </div>
    </div>
  );
}
