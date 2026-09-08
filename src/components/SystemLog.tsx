"use client";

import { useEffect, useRef, useState } from "react";
import { useSystemLog } from "@/hooks/useSystemLog";

export default function SystemLog() {
  const { logs, logEvent } = useSystemLog();
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wasDragging = useRef(false);

  useEffect(() => {
    const onDrag = (e: Event) => {
      const detail = (e as CustomEvent).detail as { dragging: boolean };
      if (detail.dragging && !wasDragging.current) {
        wasDragging.current = true;
        logEvent("core rotated");
      } else if (!detail.dragging && wasDragging.current) {
        wasDragging.current = false;
        logEvent("core released");
      }
    };
    window.addEventListener("core-drag", onDrag);
    return () => window.removeEventListener("core-drag", onDrag);
  }, [logEvent]);

  useEffect(() => {
    if (expanded && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, expanded]);

  return (
    <div
      aria-label="System log"
      className="fixed bottom-5 left-5 z-50 hidden md:block"
    >
      {expanded && (
        <div className="bg-panel border border-steel rounded-sm mb-2 w-[280px] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-steel">
            <span className="font-mono text-[0.62rem] tracking-widest text-fog uppercase">
              System Log
            </span>
            <span className="font-mono text-[0.62rem] text-fog/40">
              {logs.length}/{8}
            </span>
          </div>
          <div
            ref={scrollRef}
            className="max-h-[180px] overflow-y-auto px-3 py-2 space-y-1"
          >
            {logs.length === 0 && (
              <p className="font-mono text-[0.62rem] text-fog/40 italic">
                Awaiting events...
              </p>
            )}
            {logs.map((entry) => (
              <div key={entry.id} className="font-mono text-[0.62rem] leading-relaxed">
                <span className="text-fog/40">{entry.timestamp}</span>{" "}
                <span className="text-fog">{entry.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        aria-label={expanded ? "Collapse system log" : "Expand system log"}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 bg-panel border border-steel rounded-sm px-3 py-2 font-mono text-[0.7rem] tracking-wide text-fog hover:border-copper hover:text-bone transition-colors"
      >
        <span
          className={`inline-block transition-transform ${expanded ? "rotate-90" : ""}`}
        >
          &#9654;
        </span>
        log
        {logs.length > 0 && (
          <span className="ml-1 w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
        )}
      </button>
    </div>
  );
}
