import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Engineering from "@/sections/Engineering";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Stack from "@/sections/Stack";
import Hero from "@/sections/Hero";
import Navbar from "@/components/Navbar";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollAnimations from "@/components/ScrollAnimations";
import HudWrapper from "@/components/HudWrapper";

export default function Home() {
  return (
    <>
      <SceneWrapper />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Engineering />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <HudWrapper />
      <ScrollAnimations />
    </>
  );
}
