// GSAP initialization and utilities
// GSAP plugins are loaded via CDN in index.html

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    ScrollToPlugin: any;
  }
}

// Safe GSAP access with fallbacks
export const gsap = typeof window !== 'undefined' ? window.gsap : null;
export const ScrollTrigger = typeof window !== 'undefined' ? window.ScrollTrigger : null;

// Initialize GSAP plugins when available
if (typeof window !== 'undefined' && gsap) {
  try {
    gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
  } catch (error) {
    console.warn('GSAP plugins not yet loaded');
  }
}

// Safe animation helpers
export const safeGsap = {
  to: (target: any, vars: any) => {
    if (gsap) return gsap.to(target, vars);
    return null;
  },
  from: (target: any, vars: any) => {
    if (gsap) return gsap.from(target, vars);
    return null;
  },
  set: (target: any, vars: any) => {
    if (gsap) return gsap.set(target, vars);
    return null;
  },
  timeline: (vars?: any) => {
    if (gsap) return gsap.timeline(vars);
    return null;
  },
  isReady: () => !!gsap
};

export const safeScrollTrigger = {
  create: (vars: any) => {
    if (ScrollTrigger) return ScrollTrigger.create(vars);
    return null;
  },
  getAll: () => {
    if (ScrollTrigger) return ScrollTrigger.getAll();
    return [];
  }
};

// Animation presets
export const animations = {
  fadeInUp: (element: HTMLElement | string, delay = 0) => {
    return safeGsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  },

  fadeInLeft: (element: HTMLElement | string, delay = 0) => {
    return safeGsap.from(element, {
      x: -50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  },

  fadeInRight: (element: HTMLElement | string, delay = 0) => {
    return safeGsap.from(element, {
      x: 50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  },

  staggerFadeInUp: (elements: HTMLElement[] | string, delay = 0) => {
    return safeGsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      stagger: 0.1,
      ease: "power3.out",
    });
  },

  splitTextReveal: (element: HTMLElement, delay = 0) => {
    const chars = element.querySelectorAll(".split-char");
    return safeGsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      stagger: 0.1,
      ease: "power3.out",
    });
  },

  scaleOnHover: (element: HTMLElement) => {
    const handleMouseEnter = () => {
      safeGsap.to(element, { scale: 1.05, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      safeGsap.to(element, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  },

  createScrollTrigger: (
    element: HTMLElement | string,
    animation: () => any,
    trigger?: string
  ) => {
    return safeScrollTrigger.create({
      trigger: trigger || element,
      start: "top 80%",
      end: "bottom 20%",
      animation: animation(),
    });
  },
};

// Utility for smooth scrolling
export const smoothScrollTo = (target: string | HTMLElement, offset = 80) => {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  
  if (element && safeGsap.isReady()) {
    return safeGsap.to(window, {
      duration: 1,
      scrollTo: { y: element, offsetY: offset },
      ease: "power3.inOut",
    });
  }
  
  // Fallback to native scroll
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};