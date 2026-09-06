import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const CaseStudyTabs = dynamic(() => import("@/components/CaseStudyTabs"), {
  loading: () => <div className="mt-5 h-24 animate-pulse rounded bg-steel/20" />,
});
const DiaPredictPipeline = dynamic(() => import("@/components/DiaPredictPipeline"), {
  loading: () => <div className="mt-5 h-16 animate-pulse rounded bg-steel/20" />,
});

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Projects</h2>

        <div className="mt-12 space-y-6">
          {projects.map((project) => (
            <article key={project.name} className="border border-steel rounded-lg bg-panel p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-bone">
                    {project.name} <span className="text-fog font-normal text-base">· {project.category}</span>
                  </h3>
                  <p className="mt-1 text-fog text-sm">{project.tagline}</p>
                </div>
                <span className="text-xs font-mono tracking-wide text-fog/40 border border-steel rounded px-2 py-1 select-none">GitHub · soon</span>
              </div>

              <p className="mt-4 text-fog leading-relaxed text-sm">{project.description}</p>

              <CaseStudyTabs project={project} />
              {project.name === "DiaPredict" && <DiaPredictPipeline project={project} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
