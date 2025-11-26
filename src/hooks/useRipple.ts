import { useState, useCallback, MouseEvent } from 'react';

interface RippleStyle {
    x: number;
    y: number;
    size: number;
}

/**
 * Custom hook for ripple effect on click
 * Returns ripple state and click handler
 */
export const useRipple = () => {
    const [ripples, setRipples] = useState<RippleStyle[]>([]);

    const createRipple = useCallback((event: MouseEvent<HTMLElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple = { x, y, size };

        setRipples((prevRipples) => [...prevRipples, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prevRipples) => prevRipples.slice(1));
        }, 600);
    }, []);

    return { ripples, createRipple };
};
