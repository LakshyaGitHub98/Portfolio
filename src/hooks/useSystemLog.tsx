"use client";

import { createContext, useCallback, useContext, useReducer } from "react";

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
}

interface SystemLogContextValue {
  logs: LogEntry[];
  logEvent: (message: string) => void;
}

const SystemLogContext = createContext<SystemLogContextValue | null>(null);

const MAX_ENTRIES = 8;

let nextId = 0;

function reducer(state: LogEntry[], message: string): LogEntry[] {
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const entry: LogEntry = { id: nextId++, timestamp: ts, message };
  const next = [...state, entry];
  return next.length > MAX_ENTRIES ? next.slice(next.length - MAX_ENTRIES) : next;
}

export function SystemLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, dispatch] = useReducer(reducer, []);
  const logEvent = useCallback((message: string) => {
    dispatch(message);
  }, []);

  return (
    <SystemLogContext.Provider value={{ logs, logEvent }}>
      {children}
    </SystemLogContext.Provider>
  );
}

export function useSystemLog(): SystemLogContextValue {
  const ctx = useContext(SystemLogContext);
  if (!ctx) return { logs: [], logEvent: () => {} };
  return ctx;
}
