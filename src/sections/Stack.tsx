import { skillCategories } from "@/data/skills";

export default function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Tech stack</h2>

        <div className="mt-12 space-y-8">
          {skillCategories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-fog text-sm font-mono uppercase tracking-wider mb-3">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm text-fog border border-steel rounded bg-panel"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
