"use client";

import { useEffect, useState } from "react";

interface GitHubProfile {
  publicRepos: number;
  updatedAt: string | null;
}

export function useGitHubData(username: string) {
  const [data, setData] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchGitHub() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (!res.ok) throw new Error("GitHub API error");
        const json = await res.json();
        if (!cancelled) {
          setData({
            publicRepos: json.public_repos,
            updatedAt: json.updated_at,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchGitHub();
    return () => { cancelled = true; };
  }, [username]);

  return { data, isLoading, error };
}
