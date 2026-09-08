"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = ["hero", "about", "engineering", "stack", "projects", "experience", "contact"] as const;

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#\/?/, "");
}

function writeHash(hash: string) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", `${window.location.pathname}#${hash}`);
}

export function useDeepLink() {
  const initialized = useRef(false);

  // On load: read hash and scroll to section
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const hash = readHash();
    if (!hash) return;

    const parts = hash.split("/");
    const sectionId = parts[0];

    if (SECTION_IDS.includes(sectionId as typeof SECTION_IDS[number])) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });

        if (sectionId === "projects" && parts.length >= 3) {
          window.dispatchEvent(
            new CustomEvent("deep-link-tab", {
              detail: { slug: parts[1], tab: parts[2] },
            })
          );
        }
      });
    }
  }, []);

  // On scroll: update hash to current section
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let active = "hero";
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
            active = id;
          }
        }
        const current = readHash().split("/")[0];
        if (current !== active) {
          writeHash(active);
        }
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, []);
}
