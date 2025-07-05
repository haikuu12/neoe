import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { projectImages } from "@/assets/images";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Query to load projects from database
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const titleChars = titleRef.current.querySelectorAll(".split-char");
    const projectCards = sectionRef.current.querySelectorAll(".project-card");

    // Title animation
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

    // Project cards animation
    projectCards.forEach((card, index) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === titleRef.current ||
          Array.from(projectCards).includes(trigger.trigger as Element)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Map database projects to display format and fallback to static data if no projects in database
  const displayProjects = projects.length > 0 ? projects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.imageUrl || projectImages.ecommerce,
    tags: project.tags,
    link: project.projectUrl || "#",
    projectUrl: project.projectUrl,
  })) : [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Modern shopping experience with intuitive navigation and seamless checkout flow.",
      image: projectImages.ecommerce,
      tags: ["UI/UX", "Branding"],
      link: "#",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure and user-friendly banking solution with advanced financial tracking.",
      image: projectImages.mobile,
      tags: ["Mobile", "Fintech"],
      link: "#",
    },
    {
      id: 3,
      title: "Brand Identity",
      description: "Complete rebrand for tech startup including logo, guidelines, and digital assets.",
      image: projectImages.branding,
      tags: ["Branding", "Strategy"],
      link: "#",
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      description: "Analytics platform with complex data visualization and real-time insights.",
      image: projectImages.dashboard,
      tags: ["Dashboard", "Analytics"],
      link: "#",
    },
    {
      id: 5,
      title: "Learning Platform",
      description: "Interactive educational experience with gamification and progress tracking.",
      image: projectImages.learning,
      tags: ["EdTech", "UX Research"],
      link: "#",
    },
    {
      id: 6,
      title: "Creative Portfolio",
      description: "Personal portfolio website with interactive animations and smooth transitions.",
      image: projectImages.portfolio,
      tags: ["Portfolio", "Animation"],
      link: "#",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-5xl font-bold mb-4 split-text"
          >
            <span className="split-char">F</span>
            <span className="split-char">e</span>
            <span className="split-char">a</span>
            <span className="split-char">t</span>
            <span className="split-char">u</span>
            <span className="split-char">r</span>
            <span className="split-char">e</span>
            <span className="split-char">d</span>
            <span className="split-char"> </span>
            <span className="split-char">P</span>
            <span className="split-char">r</span>
            <span className="split-char">o</span>
            <span className="split-char">j</span>
            <span className="split-char">e</span>
            <span className="split-char">c</span>
            <span className="split-char">t</span>
            <span className="split-char">s</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my most impactful work, showcasing innovation in design and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="project-overlay absolute inset-0 flex items-center justify-center rounded-t-2xl">
                  <Button
                    variant="secondary"
                    className="transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className={
                        tagIndex % 2 === 0
                          ? "bg-accent/20 text-accent"
                          : "bg-amber/20 text-amber"
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
