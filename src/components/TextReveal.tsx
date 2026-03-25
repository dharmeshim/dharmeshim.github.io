import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before reveal starts, in seconds */
  delay?: number;
  /** Stagger between words, in seconds */
  stagger?: number;
  /** 'words' | 'chars' granularity */
  splitBy?: 'words' | 'chars';
  /** If true, triggers immediately (no scroll needed) */
  immediate?: boolean;
}

/**
 * Premium text reveal using GSAP ScrollTrigger mask technique.
 * Each word/char emerges from below an overflow-hidden container.
 * Fully accessible — reduces to instant reveal when prefers-reduced-motion.
 */
export const TextReveal = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  splitBy = 'chars',
  immediate = false,
}: TextRevealProps): JSX.Element => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const tokens = splitBy === 'words'
    ? text.split(/\s+/)
    : text.split('');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const chars = el.querySelectorAll<HTMLSpanElement>('.reveal-token');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: '105%', rotateX: -60, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          stagger,
          delay,
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                },
              }),
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay, stagger, immediate]);

  return (
    <span
      ref={containerRef}
      className={`inline-block perspective-[800px] ${className}`}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <span className="reveal-token inline-block will-change-transform origin-bottom">
            {token === ' ' || (splitBy === 'words' && i < tokens.length - 1)
              ? splitBy === 'words' ? token + '\u00A0' : '\u00A0'
              : token}
          </span>
        </span>
      ))}
    </span>
  );
};
