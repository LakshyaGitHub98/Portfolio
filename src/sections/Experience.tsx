import { experience } from "@/data/experience";

export default function Experience() {
  if (!experience) return null;

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Experience</h2>

        <div className="mt-12 max-w-lg">
          <p className="font-mono text-sm text-fog">{experience.period}</p>
          <h3 className="mt-2 text-bone">{experience.role}</h3>
          <p className="mt-1 text-fog">
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-copper transition-colors duration-200"
            >
              {experience.company}
            </a>
          </p>
          <p className="mt-4 text-fog leading-relaxed">
            {experience.description}
          </p>
        </div>
      </div>
    </section>
  );
}
