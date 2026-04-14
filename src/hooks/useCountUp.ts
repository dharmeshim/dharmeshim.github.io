import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;   // ms
  delay?: number;      // ms before counting starts
  enabled?: boolean;   // typically tied to inView
}

/**
 * Animates a number from 0 → end when `enabled` becomes true.
 * Uses a cubic ease-out curve for a natural deceleration feel.
 */
export const useCountUp = ({
  end,
  duration = 1400,
  delay = 0,
  enabled = true,
}: UseCountUpOptions): number => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasRunRef.current) return;
    hasRunRef.current = true;

    const startAnimation = () => {
      startTimeRef.current = null;

      const step = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    };

    const timer = setTimeout(startAnimation, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [enabled, end, duration, delay]);

  return count;
};
