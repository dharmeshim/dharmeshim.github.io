import { Variants } from 'framer-motion';

/**
 * Reusable animation variants for framer-motion
 * Maintains consistency across the application
 */

// Fade animations
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

// Scale animations
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
};

export const scaleInSpring: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20
        }
    }
};

// Slide animations
export const slideInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export const slideInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// Stagger children animation
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

// Hover animations
export const hoverLift = {
    rest: { y: 0, scale: 1 },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    }
};

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    }
};

export const hoverGlow = {
    rest: {
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
    },
    hover: {
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
    }
};

// Tap animations
export const tapScale = {
    scale: 0.95,
    transition: { duration: 0.1 }
};

// Rotation animations
export const rotate360: Variants = {
    hidden: { rotate: 0 },
    visible: {
        rotate: 360,
        transition: { duration: 0.6, ease: 'easeInOut' }
    }
};

// Custom spring configurations
export const springConfigs = {
    gentle: { type: 'spring' as const, stiffness: 120, damping: 14 },
    wobbly: { type: 'spring' as const, stiffness: 180, damping: 12 },
    stiff: { type: 'spring' as const, stiffness: 260, damping: 20 },
    slow: { type: 'spring' as const, stiffness: 80, damping: 20 },
    molasses: { type: 'spring' as const, stiffness: 50, damping: 20 }
};

// Easing functions
export const easings = {
    easeOutExpo: [0.19, 1, 0.22, 1],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeOutQuart: [0.25, 1, 0.5, 1]
};

// Page transition variants
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easings.easeOutCubic }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: easings.easeOutCubic }
    }
};

// Shimmer effect for loading states
export const shimmer: Variants = {
    initial: { backgroundPosition: '-200% 0' },
    animate: {
        backgroundPosition: '200% 0',
        transition: {
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity
        }
    }
};

// Pulse animation
export const pulse: Variants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity
        }
    }
};

// Bounce animation
export const bounce: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 0, -10],
        transition: {
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity
        }
    }
};
