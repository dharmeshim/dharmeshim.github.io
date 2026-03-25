import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Smooth scroll wrapper using Lenis + GSAP ScrollTrigger integration.
 * Lenis normalises wheel/touch scroll events; GSAP ScrollTrigger uses
 * the lenis scroll position so all scroll-linked animations stay in sync.
 */
export const SmoothScroll = ({ children }: SmoothScrollProps): JSX.Element => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    // Wire Lenis into GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use native RAF for buttery smooth performance (decoupled from GSAP ticker issues)
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return <>{children}</>;
};
