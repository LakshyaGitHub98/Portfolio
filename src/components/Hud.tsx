"use client";

export default function Hud() {
  return (
    <div
      aria-label="System readout"
      className="fixed bottom-5 right-5 z-50 hidden md:block pointer-events-none select-none"
    >
      <div className="bg-panel border border-steel rounded-sm px-3.5 py-2.5 min-w-[148px]">
        <div className="flex flex-col gap-1 font-mono text-[0.7rem] leading-none tracking-wide">
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">SECTION</span>
            <span className="text-bone">01 / 08</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">STATUS</span>
            <span className="text-ember">ONLINE</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">CORE</span>
            <span className="text-bone">IDLE</span>
          </div>
        </div>
        <div className="mt-2 h-px bg-steel/60" />
        <div className="mt-2 font-mono text-[0.62rem] leading-none tracking-widest text-fog/60">
          SYS READOUT — PHASE 04
        </div>
      </div>
    </div>
  );
}
