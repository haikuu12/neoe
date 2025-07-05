import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { safeGsap, smoothScrollTo } from "@/lib/gsap";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current && safeGsap.isReady()) {
      safeGsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });
    }
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (navRef.current && safeGsap.isReady()) {
        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
          // Scrolling down
          safeGsap.to(navRef.current, { y: -100, duration: 0.3, ease: "power3.out" });
        } else {
          // Scrolling up
          safeGsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power3.out" });
        }
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    smoothScrollTo(sectionId, 80);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    const isOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(isOpen);

    if (mobileMenuRef.current && safeGsap.isReady()) {
      if (isOpen) {
        safeGsap.to(mobileMenuRef.current, { 
          x: "0%", 
          duration: 0.3, 
          ease: "power3.inOut" 
        });
      } else {
        safeGsap.to(mobileMenuRef.current, { 
          x: "100%", 
          duration: 0.3, 
          ease: "power3.inOut" 
        });
      }
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="logo-container">
              <h1 className="text-2xl font-bold">Portfolio</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link transition-colors ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu fixed inset-0 z-40 bg-background transform translate-x-full md:hidden"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="mobile-nav-link hover:text-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
