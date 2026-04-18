import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/site';

interface SignatureProps {
  name: string;
  className?: string;
}

// Spring physics state per character
interface SpringState {
  weight: number;
  targetWeight: number;
  velWeight: number;
}

// Spring physics constants — tuned for a snappy but organic feel
const STIFFNESS = 200;
const DAMPING = 20;
const MASS = 1;

// Variable font weight range (Space Grotesk supports wght axis only)
const WEIGHT_REST = 300;
const WEIGHT_MAX = 900;

// Cursor influence radius in px
const RADIUS = 180;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function springStep(state: SpringState, dt: number): SpringState {
  const force = -STIFFNESS * (state.weight - state.targetWeight) - DAMPING * state.velWeight;
  const acc = force / MASS;
  const newVel = state.velWeight + acc * dt;
  const newWeight = state.weight + newVel * dt;
  return { weight: newWeight, targetWeight: state.targetWeight, velWeight: newVel };
}

/**
 * Signature Component
 * Renders the name with a physics-based pressure text animation.
 * Each character reacts independently to cursor proximity using the
 * variable font weight axis with spring physics — direct DOM writes
 * for guaranteed 60fps with zero React re-renders.
 */
export const Signature: React.FC<SignatureProps> = ({ name, className }) => {
  const { display: displayFont } = siteConfig.styles.fonts;
  const containerRef = useRef<HTMLDivElement>(null);
  // charRefs populated by render ref callbacks — never reset after mount
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const springsRef = useRef<SpringState[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const chars = name.split('');
  const wordBreakIndex = name.indexOf(' ');

  // Initialize springs once — or when name changes
  // BUG FIX: do NOT reset charRefs here; they are populated by render ref callbacks
  useEffect(() => {
    springsRef.current = chars.map(() => ({
      weight: WEIGHT_REST,
      targetWeight: WEIGHT_REST,
      velWeight: 0,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // Global mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    // Reset when cursor leaves the document
    const reset = () => { mouseRef.current = null; };
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', reset);
    };
  }, [handleMouseMove]);

  // 60fps animation loop — writes directly to DOM, zero React re-renders
  useEffect(() => {
    const animate = (timestamp: number) => {
      const dt = lastTimeRef.current
        ? Math.min((timestamp - lastTimeRef.current) / 1000, 0.05)
        : 0.016;
      lastTimeRef.current = timestamp;

      const mouse = mouseRef.current;
      const springs = springsRef.current;

      springs.forEach((spring, i) => {
        const el = charRefs.current[i];
        if (!el || !spring) return;

        if (mouse) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const raw = Math.max(0, 1 - dist / RADIUS);
          // Smoothstep for a softer, more pleasurable falloff
          const influence = raw * raw * (3 - 2 * raw);
          spring.targetWeight = lerp(WEIGHT_REST, WEIGHT_MAX, influence);
        } else {
          spring.targetWeight = WEIGHT_REST;
        }

        const next = springStep(spring, dt);
        springs[i] = next;

        // Only wght axis — avoids browser rejecting the whole string for unsupported axes
        el.style.fontWeight = next.weight.toFixed(0);

        // Second-word chars: dim at rest, spring to full opacity under pressure
        const isDim = el.dataset.dim === 'true';
        if (isDim) {
          const t = (next.weight - WEIGHT_REST) / (WEIGHT_MAX - WEIGHT_REST);
          el.style.opacity = lerp(0.35, 1.0, t).toFixed(3);
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Touch support
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) mouseRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(() => {
    mouseRef.current = null;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    return () => {
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-end"
      >
        {/*
          IMPORTANT: Do NOT set font-weight or font-black on this parent span —
          those CSS properties override child font-weight inline styles and kill the animation.
          Weight is controlled per-character via el.style.fontWeight in the RAF loop.
        */}
        <span
          className={`${displayFont} text-2xl md:text-4xl uppercase leading-none text-gray-900 dark:text-white cursor-default select-none`}
          style={{ letterSpacing: '-0.05em' }}
          aria-label={name}
        >
          {chars.map((char, i) => {
            const isSpace = char === ' ';
            const isAfterFirstWord = wordBreakIndex !== -1 && i > wordBreakIndex;

            return (
              <React.Fragment key={i}>
                {isSpace && (
                  <>
                    <br className="md:hidden" />
                    <span className="hidden md:inline" aria-hidden="true">&nbsp;</span>
                  </>
                )}
                {!isSpace && (
                  <span
                    ref={(el) => { charRefs.current[i] = el; }}
                    data-dim={isAfterFirstWord ? 'true' : 'false'}
                    className="inline-block"
                    style={{
                      fontWeight: WEIGHT_REST,
                      opacity: isAfterFirstWord ? 0.35 : 1,
                      willChange: 'font-weight, opacity',
                    }}
                    aria-hidden="true"
                  >
                    {char}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </span>

        {/* Animated underline rule */}
        <motion.div
          className="h-px bg-current mt-1 md:mt-2 self-stretch origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  );
};
