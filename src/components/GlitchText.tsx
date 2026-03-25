import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

/**
 * Premium Glitch effect for high-end tech-focused portfolios.
 * Uses clip-path and random translations to simulate digital interference.
 */
export const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            if (Math.random() > 0.95) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 150 + Math.random() * 300);
            }
        };
        const interval = setInterval(triggerGlitch, 2000);
        return () => clearInterval(interval);
    }, []);

    const glitchVariants = {
        glitch: {
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 2, -2, 0],
            skew: [0, -5, 5, -2, 2, 0],
            transition: {
                duration: 0.2,
                repeat: 1,
                repeatType: "reverse" as const
            }
        }
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <motion.span
                animate={isGlitching ? "glitch" : ""}
                variants={glitchVariants}
                className="relative z-10 block"
            >
                {text}
            </motion.span>
            
            {isGlitching && (
                <>
                    <motion.span 
                        className="absolute top-0 left-0 -z-10 text-red-500 opacity-50 block w-full"
                        animate={{ x: [-2, 2, -1], y: [1, -1, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    >
                        {text}
                    </motion.span>
                    <motion.span 
                        className="absolute top-0 left-0 -z-20 text-cyan-500 opacity-50 block w-full"
                        animate={{ x: [2, -2, 1], y: [-1, 1, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </div>
    );
};
