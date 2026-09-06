import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";

const Hud = dynamic(() => import("@/components/Hud"), { ssr: false });
import About from "@/sections/About";
import Engineering from "@/sections/Engineering";
import Stack from "@/sections/Stack";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Engineering />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Hud />
    </>
  );
}
