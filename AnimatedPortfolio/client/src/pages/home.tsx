import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { smoothScrollTo } from "@/lib/gsap";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Intersection Observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    smoothScrollTo(sectionId, 80);
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <CursorFollower />
      
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <main>
        <HeroSection onNavigate={scrollToSection} />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
