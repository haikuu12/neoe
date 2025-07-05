import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { safeGsap } from "@/lib/gsap";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !safeGsap.isReady()) return;

    const chars = titleRef.current.querySelectorAll(".split-char");
    
    const tl = safeGsap.timeline({ delay: 0.5 });
    if (!tl) return;

    // Animate title characters
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // Animate subtitle and buttons
    tl.from(".hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3")
    .from(".hero-buttons .hero-button", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    }, "-=0.5")
    .from(".scroll-indicator", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3");

    return () => {
      if (tl && tl.kill) tl.kill();
    };
  }, []);

  const handleScrollToProjects = () => {
    onNavigate("projects");
  };

  const handleScrollToContact = () => {
    onNavigate("contact");
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg"
    >
      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-shape absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float" />
        <div className="floating-shape absolute top-40 right-20 w-16 h-16 bg-amber/20 rounded-lg rotate-45 animate-float" />
        <div className="floating-shape absolute bottom-40 left-1/4 w-12 h-12 bg-accent/30 rounded-full animate-float" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="hero-content">
          <h1
            ref={titleRef}
            className="hero-title text-6xl md:text-8xl font-bold mb-6 split-text"
          >
            <span className="split-char">C</span>
            <span className="split-char">r</span>
            <span className="split-char">e</span>
            <span className="split-char">a</span>
            <span className="split-char">t</span>
            <span className="split-char">i</span>
            <span className="split-char">v</span>
            <span className="split-char">e</span>
            <br />
            <span className="split-char text-accent">D</span>
            <span className="split-char text-accent">e</span>
            <span className="split-char text-accent">s</span>
            <span className="split-char text-accent">i</span>
            <span className="split-char text-accent">g</span>
            <span className="split-char text-accent">n</span>
            <span className="split-char text-accent">e</span>
            <span className="split-char text-accent">r</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crafting digital experiences that inspire, engage, and transform ideas into visual reality.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleScrollToProjects}
              className="hero-button bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={handleScrollToContact}
              className="hero-button border-2 px-8 py-4 rounded-full font-semibold hover:border-accent hover:text-accent transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full relative">
          <div className="w-1 h-3 bg-muted-foreground rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
        </div>
        <ChevronDown className="w-6 h-6 text-muted-foreground mt-2 animate-bounce" />
      </div>
    </section>
  );
}
