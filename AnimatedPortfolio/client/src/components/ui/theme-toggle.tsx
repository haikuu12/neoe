import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { safeGsap } from "@/lib/gsap";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (buttonRef.current && safeGsap.isReady()) {
      safeGsap.to(buttonRef.current, { 
        rotation: 180, 
        duration: 0.3, 
        ease: "power3.out" 
      });
    }
    toggleTheme();
  };

  useEffect(() => {
    if (buttonRef.current && safeGsap.isReady()) {
      safeGsap.set(buttonRef.current, { rotation: theme === "dark" ? 180 : 0 });
    }
  }, [theme]);

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="theme-toggle bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
