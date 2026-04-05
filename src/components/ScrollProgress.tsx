import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Left-rail scroll progress indicator.
 * Driven by GSAP ScrollTrigger scrub — stays perfectly in sync with Lenis.
 */
export const ScrollProgress = (): JSX.Element => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        gsap.set(line, { scaleY: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-[2px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className="w-full h-full bg-[#385144] dark:bg-green-400 opacity-60"
      />
    </div>
  );
};
