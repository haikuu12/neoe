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

// Register GSAP plugins
if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger, window.ScrollToPlugin);
}

export function useGSAP() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Context for cleanup
    const ctx = gsap.context(() => {}, element);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useScrollAnimation(
  animation: (element: HTMLElement) => void,
  dependencies: any[] = []
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    animation(element);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, dependencies);

  return ref;
}
