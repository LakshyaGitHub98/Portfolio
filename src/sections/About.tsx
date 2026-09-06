import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>About</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <p className="text-fog text-lg leading-relaxed max-w-[65ch]">
            I build software at the intersection of AI, automation and
            engineering. From intelligent platforms to automated workflows, I turn
            repetitive and frustrating work into systems that can handle
            themselves.
          </p>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-copper overflow-hidden bg-panel">
              <Image
                src="/profile.png"
                alt="Lakshya"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 224px, 288px"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
