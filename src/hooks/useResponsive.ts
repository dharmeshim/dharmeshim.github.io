import { useEffect, useState } from 'react';

/**
 * Custom hook to detect touch devices for disabling/adjusting hover-dependent animations.
 */
export function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return isTouch;
}

/**
 * Custom hook for media queries in JS-driven animations.
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}
