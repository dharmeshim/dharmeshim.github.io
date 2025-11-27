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
