import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Projects</h2>

        <div className="mt-12 space-y-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="border border-steel rounded-lg bg-panel p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-bone">
                    {project.name}{" "}
                    <span className="text-fog font-normal text-base">
                      &mdash; {project.category}
                    </span>
                  </h3>
                  <p className="mt-1 text-fog text-sm">{project.tagline}</p>
                </div>
              </div>

              <p className="mt-4 text-fog leading-relaxed">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs text-fog border border-steel rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
