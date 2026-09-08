import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Engineering from "@/sections/Engineering";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Stack from "@/sections/Stack";
import Hero from "@/sections/Hero";
import Navbar from "@/components/Navbar";
import CommandBar from "@/components/CommandBar";
import SceneWrapper from "@/components/SceneWrapper";
import ScrollAnimations from "@/components/ScrollAnimations";
import HudWrapper from "@/components/HudWrapper";
import ErrorBoundary from "@/components/ErrorBoundary";
import SystemLog from "@/components/SystemLog";
import DeepLinkEffect from "@/components/DeepLinkEffect";
import { SystemLogProvider } from "@/hooks/useSystemLog";

export default function Home() {
  return (
    <SystemLogProvider>
      <DeepLinkEffect />
      <ErrorBoundary>
        <SceneWrapper />
      </ErrorBoundary>
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
      <CommandBar />
      <SystemLog />
      <ScrollAnimations />
    </SystemLogProvider>
  );
}
