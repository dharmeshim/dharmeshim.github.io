import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
    children: React.ReactNode;
    variant?: 'default' | 'gradient' | 'glass';
    hoverEffect?: boolean;
    className?: string;
}

/**
 * Reusable animated card component
 * Provides consistent styling and hover effects across sections
 */
export const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    variant = 'default',
    hoverEffect = true,
    className = '',
}) => {
    const baseClasses = 'relative p-6 rounded-xl border-2 shadow-lg transition-all duration-300';

    const variantClasses = {
        default: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700',
        gradient: 'bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-gray-200/50 dark:border-gray-700/50',
        glass: 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50',
    };

    return (
        <motion.div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            whileHover={hoverEffect ? { scale: 1.02, y: -4 } : undefined}
        >
            {children}
        </motion.div>
    );
};
