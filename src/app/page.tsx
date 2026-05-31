import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Research />
        <Projects />
        <Publications />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
