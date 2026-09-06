import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function buildScrollAnimations(): () => void {
  ensureRegistered();
  if (typeof window === "undefined") return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sections = document.querySelectorAll<HTMLElement>("main > section");
  if (!sections.length) return () => {};

  if (prefersReduced) {
    sections.forEach((el) => {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  sections.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });

  return () => ScrollTrigger.getAll().forEach((t) => t.kill());
}
