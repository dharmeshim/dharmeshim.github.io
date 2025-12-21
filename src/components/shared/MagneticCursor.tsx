import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import gsap from 'gsap';

export const MagneticCursor = (): JSX.Element => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const { x, y } = useMousePosition();

    useEffect(() => {
        if (!cursorRef.current || !cursorDotRef.current) return;

        // Smooth cursor follow
        gsap.to(cursorRef.current, {
            x: x - 20,
            y: y - 20,
            duration: 0.3,
            ease: 'power2.out',
        });

        gsap.to(cursorDotRef.current, {
            x: x - 4,
            y: y - 4,
            duration: 0.1,
            ease: 'power2.out',
        });
    }, [x, y]);

    useEffect(() => {
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea'
        );

        const handleMouseEnter = () => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Cursor ring */}
            <div
                ref={cursorRef}
                className="fixed w-10 h-10 border-2 border-blue-500 dark:border-green-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{ left: 0, top: 0 }}
            />
            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className="fixed w-2 h-2 bg-blue-500 dark:bg-green-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{ left: 0, top: 0 }}
            />
        </>
    );
};
