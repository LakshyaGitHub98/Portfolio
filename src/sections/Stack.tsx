import dynamic from "next/dynamic";

const ArchitectureDiagram = dynamic(() => import("@/components/ArchitectureDiagram"), {
  loading: () => <div className="mt-10 h-48 animate-pulse rounded bg-steel/20" />,
});

export default function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Tech stack</h2>
        <ArchitectureDiagram />
      </div>
    </section>
  );
}
