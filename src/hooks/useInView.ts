import { useEffect, useRef, useState } from 'react';
import { useInView as useInViewObserver } from 'react-intersection-observer';

interface UseInViewOptions {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
}

/**
 * Custom hook to detect when an element enters the viewport
 * Triggers animations on scroll
 */
export const useInView = (options: UseInViewOptions = {}) => {
    const {
        threshold = 0.1,
        triggerOnce = true,
        rootMargin = '0px'
    } = options;

    const { ref, inView } = useInViewObserver({
        threshold,
        triggerOnce,
        rootMargin
    });

    return { ref, inView };
};

/**
 * Hook to detect scroll direction
 */
export const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY.current) {
                setScrollDirection('up');
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollDirection;
};

/**
 * Hook to get scroll progress (0 to 1)
 */
export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const scrollProgress = scrollTop / (documentHeight - windowHeight);
            setProgress(Math.min(Math.max(scrollProgress, 0), 1));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
};
