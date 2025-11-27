/**
 * Animation timing constants
 * Centralized values for consistent animations across the application
 */

export const ANIMATION_DELAYS = {
    SHORT: 0.1,
    MEDIUM: 0.2,
    LONG: 0.5,
    EXTRA_LONG: 1.0,
} as const;

export const ANIMATION_DURATIONS = {
    FAST: 0.2,
    NORMAL: 0.4,
    SLOW: 0.6,
    EXTRA_SLOW: 1.0,
} as const;

export const INTERSECTION_THRESHOLDS = {
    MINIMAL: 0.1,
    QUARTER: 0.25,
    HALF: 0.5,
    FULL: 1.0,
} as const;

/**
 * Application constants
 */
export const LOADER_DURATION = 3000; // 3 seconds
