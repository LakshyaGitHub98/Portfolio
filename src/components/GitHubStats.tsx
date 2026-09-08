"use client";

import { useGitHubData } from "@/hooks/useGitHubData";

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function GitHubStats() {
  const { data, isLoading, error } = useGitHubData("LakshyaGitHub98");

  if (error) return null;

  return (
    <div className="mt-4 border border-steel rounded-sm bg-panel px-3.5 py-2.5" aria-label="GitHub stats" aria-live="polite">
      <div className="font-mono text-[0.62rem] tracking-widest text-fog/60 mb-2 uppercase">
        GitHub Profile
      </div>
      {isLoading ? (
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-steel/30 rounded animate-pulse" />
          <div className="h-3 w-32 bg-steel/30 rounded animate-pulse" />
        </div>
      ) : data ? (
        <div className="flex flex-col gap-1 font-mono text-[0.7rem] leading-none tracking-wide">
          <div className="flex items-center justify-between gap-6">
            <span className="text-fog">PUBLIC REPOS</span>
            <span className="text-bone">{data.publicRepos}</span>
          </div>
          {data.updatedAt && (
            <div className="flex items-center justify-between gap-6">
              <span className="text-fog">LAST PUSH</span>
              <span className="text-bone">{relativeDate(data.updatedAt)}</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
