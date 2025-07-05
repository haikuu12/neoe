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

export const animations = {
  fadeInUp: (element: HTMLElement | string, delay = 0) => {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  },

  fadeInLeft: (element: HTMLElement | string, delay = 0) => {
    return gsap.from(element, {
      x: -50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  },

  fadeInRight: (element: HTMLElement | string, delay = 0) => {
    return gsap.from(element, {
      x: 50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  },

  staggerFadeInUp: (elements: HTMLElement[] | string, delay = 0) => {
    return gsap.from(elements, {
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
    return gsap.to(chars, {
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
      gsap.to(element, { scale: 1.05, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { scale: 1, duration: 0.3, ease: "power3.out" });
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
    animation: () => gsap.core.Timeline | gsap.core.Tween,
    trigger?: string
  ) => {
    return ScrollTrigger.create({
      trigger: trigger || element,
      start: "top 80%",
      end: "bottom 20%",
      animation: animation(),
    });
  },
};

export const timeline = {
  create: () => gsap.timeline(),
  
  heroSequence: () => {
    const tl = gsap.timeline({ delay: 0.5 });
    return tl;
  },
};
