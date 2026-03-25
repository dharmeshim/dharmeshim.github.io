import { Variants } from 'framer-motion';

/**
 * Shared Framer Motion variants.
 * All easing uses [0.16, 1, 0.3, 1] — the "expo out" curve used by
 * award-winning studios. Runs only transform + opacity (GPU-composited).
 */

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ─── Fade ──────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

// ─── Scale ─────────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 18 },
  },
};

// ─── Stagger containers ────────────────────────────────────────────────────

/** Use on the parent; children inherit stagger via their own variants */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

/** Item used inside staggerContainer */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EXPO_OUT },
  },
};

// ─── Hero page-load sequence ───────────────────────────────────────────────

/** Background / canvas layer */
export const heroBackground: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeIn' } },
};

/** Headline reveal */
export const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EXPO_OUT, delay: 0.2 } },
};

/** Sub-text */
export const heroSubtext: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO_OUT, delay: 0.5 } },
};

/** CTA spring pop */
export const heroCta: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.85 },
  },
};

/** Scroll indicator — fades + bobs */
export const scrollIndicator: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 1.2 },
  },
};

// ─── Slide ─────────────────────────────────────────────────────────────────

export const slideInLeft: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
};

export const slideInRight: Variants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EXPO_OUT } },
};

// ─── Hover ─────────────────────────────────────────────────────────────────

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 14 },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 14 },
  },
};

export const hoverGlow = {
  rest: { boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { boxShadow: '0 12px 40px rgba(0,0,0,0.12)', transition: { duration: 0.3 } },
};

// ─── Tap ───────────────────────────────────────────────────────────────────

export const tapScale = { scale: 0.96, transition: { duration: 0.08 } };

// ─── Page transition ────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EXPO_OUT } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE_OUT } },
};

// ─── Loading states ────────────────────────────────────────────────────────

export const shimmer: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: { duration: 1.5, ease: 'linear', repeat: Infinity },
  },
};

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.04, 1],
    opacity: [1, 0.75, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

export const bounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 0, -8],
    transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity },
  },
};

// ─── Utilities ─────────────────────────────────────────────────────────────

export const springConfigs = {
  gentle:   { type: 'spring' as const, stiffness: 100, damping: 14 },
  wobbly:   { type: 'spring' as const, stiffness: 180, damping: 10 },
  stiff:    { type: 'spring' as const, stiffness: 300, damping: 22 },
  slow:     { type: 'spring' as const, stiffness: 70,  damping: 20 },
};

export const easings = {
  expoOut:    EXPO_OUT,
  easeOut:    EASE_OUT,
  easeInOut:  [0.65, 0, 0.35, 1] as const,
  backOut:    [0.34, 1.56, 0.64, 1] as const,
};
