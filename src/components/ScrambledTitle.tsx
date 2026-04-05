import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/site';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#@$%&|~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface ScrambledTitleProps {
  text: string;
  /** Delay before scramble starts (ms) */
  delay?: number;
  /** How fast each character settles (ms) */
  charDelay?: number;
  className?: string;
}

/**
 * Scramble-decode heading animation.
 * Random glyphs morph character-by-character into the real text,
 * each character settling with a short delay offset from left to right.
 */
export const ScrambledTitle = ({
  text,
  delay = 0,
  charDelay = 80,
  className = '',
}: ScrambledTitleProps) => {
  const [chars, setChars] = useState<string[]>(() =>
    text.split('').map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
  );
  const resolved = useRef<boolean[]>(text.split('').map(() => false));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const frames = useRef<number[]>([]);

  useEffect(() => {
    // Reset on text change
    resolved.current = text.split('').map(() => false);
    setChars(text.split('').map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])));

    // Schedule each character to resolve
    text.split('').forEach((target, i) => {
      if (target === ' ') {
        resolved.current[i] = true;
        return;
      }

      const t = setTimeout(() => {
        // Once settled start scrambling until resolution
        const scrambleStart = Date.now();
        const settleDuration = 300 + Math.random() * 200;

        const tick = () => {
          const elapsed = Date.now() - scrambleStart;
          if (elapsed >= settleDuration) {
            // Resolve to real character
            resolved.current[i] = true;
            setChars((prev) => {
              const next = [...prev];
              next[i] = target;
              return next;
            });
          } else {
            setChars((prev) => {
              const next = [...prev];
              next[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              return next;
            });
            frames.current[i] = requestAnimationFrame(tick);
          }
        };
        frames.current[i] = requestAnimationFrame(tick);
      }, delay + i * charDelay);

      timers.current[i] = t;
    });

    return () => {
      timers.current.forEach(clearTimeout);
      frames.current.forEach((f) => f && cancelAnimationFrame(f));
    };
  }, [text, delay, charDelay]);

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={`inline-block ${resolved.current[i]
            ? ''
            : 'opacity-40'
            }`}
          style={{ fontFamily: ch === ' ' ? undefined : "'JetBrains Mono', monospace" }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
};
