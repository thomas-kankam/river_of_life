import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapParallax(ref, options = {}) {
  const { speed = 0.3 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: speed * 35,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement || element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [ref, speed]);
}

export function useGsapFadeIn(ref, delay = 0) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 48,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [ref, delay]);
}

/** Stagger children of a container on scroll */
export function useGsapStagger(ref, options = {}) {
  const { selector = ':scope > *', stagger = 0.12, y = 48 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const items = element.querySelectorAll(selector);
      if (!items.length) return;

      gsap.from(items, {
        opacity: 0,
        y,
        duration: 0.85,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [ref, selector, stagger, y]);
}

/** Refresh ScrollTrigger after SPA navigations */
export function useGsapRefreshOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
}
