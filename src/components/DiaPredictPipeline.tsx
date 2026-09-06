"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

export default function DiaPredictPipeline({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  if (!project.pipeline?.length) return null;

  return (
    <div className="mt-5 border border-steel rounded bg-void">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-mono text-xs tracking-wide text-bone">How the model works</span>
        <span className="font-mono text-xs text-fog">{open ? "Hide" : "View pipeline"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="h-px bg-steel mb-4" />
          <ol className="relative border-l border-steel ml-2 pl-6 space-y-4">
            {project.pipeline.map((step, i) => (
              <li key={step.step} className="relative">
                <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-copper border border-void" />
                <span className="font-mono text-xs tracking-wide text-bone">
                  {String(i + 1).padStart(2, "0")}. {step.step}
                </span>
                <p className="text-xs text-fog mt-1">{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-fog/70">Portfolio demonstration, not clinical or diagnostic guidance.</p>
        </div>
      )}
    </div>
  );
}
