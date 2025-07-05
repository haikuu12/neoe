import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Award } from "lucide-react";
import { profileImages } from "@/assets/images";

// GSAP plugins are loaded via CDN in index.html
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    ScrollToPlugin: any;
  }
}

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const titleChars = titleRef.current?.querySelectorAll(".split-char");
    const skillBars = sectionRef.current.querySelectorAll(".skill-bar");
    const floatingCards = sectionRef.current.querySelectorAll(".floating-card");

    // Title animation
    if (titleChars) {
      gsap.to(titleChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });
    }

    // Content animations
    gsap.from(contentRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    gsap.from(imageRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    // Skill bars animation
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      gsap.to(bar, {
        width: width,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          end: "bottom 10%",
        },
      });
    });

    // Floating cards animation
    floatingCards.forEach((card) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === titleRef.current ||
          trigger.trigger === contentRef.current ||
          trigger.trigger === imageRef.current ||
          Array.from(skillBars).includes(trigger.trigger as Element) ||
          Array.from(floatingCards).includes(trigger.trigger as Element)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  const skills = [
    { name: "UI/UX Design", percentage: 95, color: "accent" },
    { name: "Prototyping", percentage: 90, color: "amber" },
    { name: "Brand Design", percentage: 85, color: "accent" },
    { name: "Front-end Dev", percentage: 80, color: "amber" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="about-content">
            <h2
              ref={titleRef}
              className="section-title text-5xl font-bold mb-6 split-text"
            >
              <span className="split-char">A</span>
              <span className="split-char">b</span>
              <span className="split-char">o</span>
              <span className="split-char">u</span>
              <span className="split-char">t</span>
              <span className="split-char text-accent"> M</span>
              <span className="split-char text-accent">e</span>
            </h2>

            <div className="about-text space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate designer with over 8 years of experience creating digital experiences 
                that bridge the gap between business goals and user needs. My approach combines strategic 
                thinking with creative execution.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I specialize in UI/UX design, brand identity, and interactive prototyping. My work has 
                helped startups scale and established companies innovate in competitive markets.
              </p>
            </div>

            <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{skill.name}</h4>
                    <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`skill-bar h-2 rounded-full ${
                        skill.color === "accent" ? "bg-accent" : "bg-amber"
                      }`}
                      data-width={`${skill.percentage}%`}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="about-image relative">
            <img
              src={profileImages.primary}
              alt="Professional headshot"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />

            {/* Floating Cards */}
            <div className="floating-card absolute -top-8 -right-8 bg-card p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold">8+ Years</p>
                  <p className="text-sm text-muted-foreground">Experience</p>
                </div>
              </div>
            </div>

            <div className="floating-card absolute -bottom-8 -left-8 bg-card p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">50+ Projects</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
