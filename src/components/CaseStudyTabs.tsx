"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

const TABS = ["Problem", "Approach", "Result", "Stack"] as const;
type Tab = (typeof TABS)[number];

export default function CaseStudyTabs({ project }: { project: Project }) {
  const [active, setActive] = useState<Tab>("Problem");

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = TABS.indexOf(active);
    if (e.key === "ArrowRight") setActive(TABS[(idx + 1) % TABS.length]);
    if (e.key === "ArrowLeft") setActive(TABS[(idx - 1 + TABS.length) % TABS.length]);
  };

  return (
    <div className="mt-5">
      <div role="tablist" aria-label={`Case study tabs for ${project.name}`} onKeyDown={onKeyDown} className="flex gap-1 border-b border-steel">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`px-3 py-2 text-xs font-mono tracking-wide border-b-2 -mb-px transition-colors ${active === tab ? "border-copper text-copper" : "border-transparent text-fog hover:text-bone"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pt-4 min-h-[96px]">
        {active === "Problem" && <p className="text-fog leading-relaxed text-sm">{project.problem}</p>}
        {active === "Approach" && <p className="text-fog leading-relaxed text-sm">{project.approach}</p>}
        {active === "Result" && <p className="text-fog leading-relaxed text-sm">{project.result}</p>}
        {active === "Stack" && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="px-2.5 py-0.5 text-xs text-fog border border-steel rounded bg-panel">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
