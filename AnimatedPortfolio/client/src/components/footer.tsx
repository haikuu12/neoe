import { useEffect, useRef } from "react";

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

interface FooterProps {
  onNavigate: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.from(footerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom 10%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const navItems = ["home", "projects", "about", "contact"];

  return (
    <footer ref={footerRef} className="bg-background dark:bg-card py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Let's Create Something Amazing</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Ready to transform your ideas into stunning digital experiences? I'm here to help.
          </p>

          <div className="flex justify-center space-x-8 mb-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className="text-muted-foreground hover:text-accent transition-colors capitalize font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground/70 text-sm">
              &copy; 2024 Creative Designer Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
