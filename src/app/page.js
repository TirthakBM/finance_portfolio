import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, Expertise, Experience, Education, Skills, Ticker } from "@/components/Sections";
import Contact from "@/components/Contact";
import Preloader from "@/components/fx/Preloader";
import Cursor from "@/components/fx/Cursor";
import ScrollProgress from "@/components/fx/ScrollProgress";
import SmoothScroll from "@/components/fx/SmoothScroll";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="grain overflow-x-clip">
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Expertise />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name} · {profile.location}
      </footer>
    </div>
  );
}
