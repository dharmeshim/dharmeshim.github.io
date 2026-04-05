import { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';

type CursorContext = 'default' | 'link' | 'button' | 'drag' | 'external';

const CONTEXT_LABELS: Record<CursorContext, string> = {
  default: '',
  link: 'VIEW',
  button: 'CLICK',
  drag: 'DRAG',
  external: 'OPEN',
};

export const MagneticCursor = (): JSX.Element => {
  const shouldReduceMotion = useReducedMotion();
  const [context, setContext] = useState<CursorContext>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring — soft lag
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.6 });

  // Inner dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 700, damping: 38, mass: 0.15 });
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 38, mass: 0.15 });

  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Contextual detection
    const detectContext = (el: Element): CursorContext => {
      if (el.closest('[data-cursor="drag"]')) return 'drag';
      if (el.closest('[data-cursor="external"]')) return 'external';
      if (el.closest('a[href^="http"]') || el.closest('[target="_blank"]')) return 'external';
      if (el.closest('a')) return 'link';
      if (el.closest('button') || el.closest('[role="button"]')) return 'button';
      return 'default';
    };

    const onElementEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      setContext(detectContext(target));
    };
    const onElementLeave = () => setContext('default');

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, [data-cursor]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onElementEnter as EventListener);
      el.addEventListener('mouseleave', onElementLeave);
    });

    cleanupRef.current = () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onElementEnter as EventListener);
        el.removeEventListener('mouseleave', onElementLeave);
      });
    };

    return () => cleanupRef.current?.();
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion) return <></>;

  const isInteracting = context !== 'default';
  const label = CONTEXT_LABELS[context];

  return (
    <>
      {/* Outer ring with mix-blend-mode for colour inversion */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteracting ? 2 : 1,
          width: isInteracting ? 48 : 36,
          height: isInteracting ? 48 : 36,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 260, damping: 20 },
          width: { type: 'spring', stiffness: 260, damping: 20 },
          height: { type: 'spring', stiffness: 260, damping: 20 },
        }}
      >
        <div className="w-9 h-9 rounded-full border border-[#385144]/50 dark:border-green-400/50" />

        {/* Context label inside ring */}
        <AnimatePresence>
          {label && (
            <motion.span
              className="absolute text-[7px] font-bold tracking-[0.15em] text-[#385144] dark:text-green-400 pointer-events-none select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot — disappears on interaction (ring takes over) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible && !isInteracting ? 1 : 0,
          scale: isInteracting ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: 'spring', stiffness: 400, damping: 28 },
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#385144] dark:bg-green-400" />
      </motion.div>
    </>
  );
};
