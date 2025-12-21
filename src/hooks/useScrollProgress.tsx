import { useEffect, useState } from 'react';

interface ScrollProgress {
    progress: number; // 0 to 1
    scrollY: number;
    direction: 'up' | 'down' | 'none';
    velocity: number;
}

export const useScrollProgress = (): ScrollProgress => {
    const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
        progress: 0,
        scrollY: 0,
        direction: 'none',
        velocity: 0,
    });

    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        let ticking = false;
        let lastTime = Date.now();

        const updateScrollProgress = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

            const currentTime = Date.now();
            const timeDelta = currentTime - lastTime;
            const scrollDelta = scrollY - lastScrollY;
            const velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;

            const direction =
                scrollDelta > 0 ? 'down' : scrollDelta < 0 ? 'up' : 'none';

            setScrollProgress({
                progress,
                scrollY,
                direction,
                velocity,
            });

            setLastScrollY(scrollY);
            lastTime = currentTime;
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateScrollProgress(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return scrollProgress;
};
