"use client";

import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experience } from "@/data/experience";

function buildResumeHTML(): string {
  const projectItems = projects
    .map(
      (p) => `
      <div class="project">
        <h3>${p.name} <span class="category">${p.category}</span></h3>
        <p class="tagline">${p.tagline}</p>
        <p>${p.description}</p>
        <div class="stack">${p.stack.map((s) => `<span class="chip">${s}</span>`).join(" ")}</div>
      </div>`
    )
    .join("\n");

  const skillGroups = skillCategories
    .map(
      (cat) => `
      <div class="skill-group">
        <h3>${cat.name}</h3>
        <p>${cat.skills.join(", ")}</p>
      </div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lakshya — Resume</title>
<style>
  @page { margin: 1.5cm; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "IBM Plex Sans", -apple-system, sans-serif;
    color: #EDEDEF;
    background: #050505;
    line-height: 1.6;
    font-size: 14px;
  }
  .container { max-width: 700px; margin: 0 auto; padding: 2rem; }
  h1 { font-size: 2rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.25rem; }
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid #1A1B1E;
    color: #BF5B2E;
  }
  h3 { font-size: 1rem; font-weight: 500; margin-bottom: 0.25rem; }
  .subtitle { color: #9195A0; font-size: 0.9rem; margin-bottom: 1.5rem; }
  .role { color: #9195A0; font-size: 0.85rem; }
  .project { margin-bottom: 1.25rem; }
  .project .category { color: #9195A0; font-weight: 400; font-size: 0.85rem; }
  .project .tagline { color: #9195A0; font-size: 0.85rem; margin-bottom: 0.25rem; }
  .project p { color: #9195A0; font-size: 0.85rem; }
  .stack { margin-top: 0.35rem; display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .chip {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
    border: 1px solid #1A1B1E;
    border-radius: 3px;
    color: #9195A0;
  }
  .skill-group { margin-bottom: 0.75rem; }
  .skill-group h3 { font-size: 0.85rem; color: #9195A0; font-weight: 400; margin-bottom: 0.15rem; }
  .skill-group p { font-size: 0.8rem; color: #EDEDEF; }
  .sign-off {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #1A1B1E;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    color: #9195A0;
  }
  @media print {
    body { background: #fff; color: #111; }
    h1, h3 { color: #111; }
    h2 { color: #BF5B2E; border-bottom-color: #ddd; }
    .subtitle, .role, .project p, .project .category, .project .tagline { color: #555; }
    .chip { border-color: #ccc; color: #555; }
    .skill-group h3 { color: #555; }
    .skill-group p { color: #111; }
    .sign-off { border-top-color: #ddd; color: #555; }
  }
</style>
</head>
<body>
<div class="container">
  <h1>Lakshya</h1>
  <p class="subtitle">AI &amp; Automation Engineer</p>

  <h2>Experience</h2>
  <div>
    <h3>${experience.role}</h3>
    <p class="role">${experience.company} &mdash; ${experience.period}</p>
    <p style="margin-top:0.25rem; font-size:0.85rem; color:#9195A0;">${experience.description}</p>
  </div>

  <h2>Projects</h2>
  ${projectItems}

  <h2>Tech Stack</h2>
  ${skillGroups}

  <div class="sign-off">Build. Automate. Iterate.</div>
</div>
</body>
</html>`;
}

export default function ResumeExport() {
  const handleCompile = () => {
    const html = buildResumeHTML();
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      // Small delay to ensure rendering, then trigger print
      setTimeout(() => win.print(), 300);
    }
  };

  return (
    <button
      onClick={handleCompile}
      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-wide border border-steel rounded text-fog hover:border-copper hover:text-bone transition-colors"
      aria-label="Compile and print resume as PDF"
    >
      <span className="text-[0.65rem]">&#9654;</span>
      Compile Resume
    </button>
  );
}
