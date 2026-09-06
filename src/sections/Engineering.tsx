const capabilities = [
  {
    title: "AI & Automation",
    description:
      "LLMs, agents, tool-calling, RAG pipelines, and workflow automation, turning complex AI primitives into systems that run themselves.",
    width: "max-w-sm",
  },
  {
    title: "Backend",
    description:
      "Python, FastAPI, Node.js, Express, REST APIs, auth, building the infrastructure that intelligent platforms run on.",
    width: "max-w-xs",
  },
  {
    title: "Frontend",
    description:
      "React, Next.js, TypeScript, Tailwind, clean interfaces that make complex systems feel simple.",
    width: "max-w-sm",
  },
  {
    title: "Systems",
    description:
      "Architecture, data flow, OS fundamentals, networking, understanding what's happening beneath the interface.",
    width: "max-w-xs",
  },
];

export default function Engineering() {
  return (
    <section id="engineering" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>What I engineer</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`${cap.width} ${
                i % 2 === 1 ? "md:justify-self-end" : ""
              } ${i === 1 ? "md:mt-8" : ""} ${i === 2 ? "md:-mt-4" : ""}`}
            >
              <h3 className="text-bone">{cap.title}</h3>
              <p className="mt-2 text-fog leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
