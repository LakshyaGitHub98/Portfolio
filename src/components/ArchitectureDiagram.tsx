"use client";

import { useState } from "react";
import { skillCategories } from "@/data/skills";

const DESCRIPTIONS: Record<string, string> = {
  Python: "Primary language for ML pipelines and backend services.",
  FastAPI: "Async Python framework for high-performance REST APIs.",
  "Node.js": "Runtime powering NoteVault and URL Shortener backends.",
  Express: "Minimal Node.js framework for REST APIs and routing.",
  "REST APIs": "HTTP interfaces between client and server layers.",
  Authentication: "Identity verification and session management layer.",
  JWT: "Stateless token-based authentication.",
  React: "Component model for interactive user interfaces.",
  "Next.js": "Full-stack React framework with routing and SSR.",
  JavaScript: "Core language for web interactivity.",
  TypeScript: "Static types for safer JavaScript at scale.",
  Tailwind: "Utility-first CSS for rapid interface styling.",
  PostgreSQL: "Relational database for structured persistence.",
  MongoDB: "Document store for NoteVault and URL Shortener data.",
  Redis: "In-memory cache for ephemeral and session data.",
  "Vector Databases": "Embedding storage for RAG and LLM contexts.",
  Docker: "Containerization for reproducible deployments.",
  Git: "Version control and collaboration history.",
  GitHub: "Remote hosting and CI collaboration surface.",
  "CI/CD": "Automated test and deploy pipelines.",
  Postman: "API development and endpoint verification tool.",
  LLMs: "Large language models integrated via tool-calling.",
  "AI Agents": "Autonomous loops that plan and invoke tools.",
  RAG: "Retrieval-augmented generation over private knowledge.",
  "Tool Calling": "Structured LLM invocations to external functions.",
  "Function Calling": "Typed LLM bindings to executable code paths.",
  "Prompt Engineering": "Instruction design for reliable model outputs.",
  "Workflow Automation": "Chaining AI primitives into self-running flows.",
  "AI-integrated Platforms": "Products where AI is embedded in core flows.",
  NumPy: "Numerical arrays for feature computation.",
  Pandas: "Tabular transforms for model inputs.",
  "Scikit-learn": "Classifier, scaler, and metric suite for DiaPredict.",
  "Model Evaluation": "Accuracy, precision, recall, and F1 measurement.",
  "Data Preprocessing": "Cleaning and scaling before model training.",
  OOP: "Modeling domain concepts as encapsulated objects.",
  DBMS: "Storage engine principles and query planning.",
  "Operating Systems": "Process, memory, and scheduling fundamentals.",
  "Computer Networks": "HTTP, TCP, and routing beneath the interface.",
  DSA: "Algorithmic building blocks across the stack.",
  "Software Architecture": "System decomposition and data flow design.",
};

export default function ArchitectureDiagram() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mt-10 space-y-8">
      {skillCategories.map((cat) => (
        <div key={cat.name}>
          <h3 className="text-fog text-sm font-mono uppercase tracking-wider mb-3">{cat.name}</h3>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <button
                key={`${cat.name}-${skill}`}
                onClick={() => setActive((v) => (v === skill ? null : skill))}
                className={`px-3 py-1 text-sm border rounded bg-panel transition-colors ${active === skill ? "border-copper text-copper" : "border-steel text-fog hover:border-copper hover:text-copper"}`}
                aria-pressed={active === skill}
              >
                {skill}
              </button>
            ))}
          </div>
          {active && skillCategories.find((c) => c.name === cat.name)?.skills.includes(active) && DESCRIPTIONS[active] && (
            <p className="mt-3 text-sm leading-relaxed text-fog border-l-2 border-copper pl-3" role="status" aria-live="polite">{DESCRIPTIONS[active]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
