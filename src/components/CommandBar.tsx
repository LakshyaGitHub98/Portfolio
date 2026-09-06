"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = ["hero", "about", "engineering", "stack", "projects", "experience", "contact"] as const;

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (e.key === "/" && !open && !isInput) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = query ? SECTIONS.filter((s) => s.includes(query.toLowerCase())) : SECTIONS;

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      {!open && (
        <button
          aria-label="Open command bar"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 left-5 z-50 hidden md:flex items-center gap-2 bg-panel border border-steel rounded-sm px-3 py-2 font-mono text-[0.7rem] tracking-wide text-fog hover:border-copper hover:text-bone transition-colors"
        >
          <span className="border border-steel rounded-sm px-1.5 py-0.5 text-[0.62rem] leading-none">/</span>
          jump
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[22vh] px-6">
          <button aria-label="Close command bar" className="absolute inset-0 bg-void/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[420px] bg-panel border border-steel rounded-sm overflow-hidden">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filtered[0]) jump(filtered[0]);
              }}
              placeholder="Jump to section..."
              className="w-full bg-transparent px-4 py-3 font-mono text-sm text-bone placeholder:text-fog/60 outline-none border-b border-steel"
              aria-label="Jump to section"
            />
            <ul className="max-h-48 overflow-auto py-1">
              {filtered.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => jump(s)}
                    className="w-full text-left px-4 py-2 font-mono text-sm text-fog hover:bg-steel/40 hover:text-bone transition-colors capitalize"
                  >
                    {s}
                  </button>
                </li>
              ))}
              {!filtered.length && <li className="px-4 py-3 font-mono text-sm text-fog/50">No match</li>}
            </ul>
            <div className="px-3 py-1.5 border-t border-steel font-mono text-[0.62rem] tracking-wide text-fog/40">
              <span className="text-fog/60">/</span> to open · <span className="text-fog/60">ESC</span> to close · <span className="text-fog/60">↵</span> to jump
            </div>
          </div>
        </div>
      )}
    </>
  );
}
