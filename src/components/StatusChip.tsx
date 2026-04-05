import { motion } from 'framer-motion';
import { siteConfig } from '../config/site';

interface StatusChipProps {
    status: 'available' | 'learning' | 'custom';
    label?: string;
    className?: string;
}

export const StatusChip = ({
    status,
    label,
    className = '',
}: StatusChipProps): JSX.Element => {
    const { accent, accentSoft, accentBg, accentBorder } = siteConfig.styles.colors;

    const getStatusConfig = () => {
        switch (status) {
            case 'available':
                return {
                    text: 'Available for work',
                    color: 'bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-400 border-green-300 dark:border-green-400/30',
                    dotColor: 'bg-green-500 dark:bg-green-400',
                };
            case 'learning':
                return {
                    text: label || 'Currently learning',
                    color: `${accentSoft} ${accent} ${accentBorder} dark:bg-cyan-400/10 dark:text-cyan-400 dark:border-cyan-400/30`,
                    dotColor: `${accentBg} dark:bg-cyan-400`,
                };
            case 'custom':
                return {
                    text: label || 'Status',
                    color: 'bg-gray-100 dark:bg-gray-400/10 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-400/30',
                    dotColor: 'bg-gray-500 dark:bg-gray-400',
                };
        }
    };

    const config = getStatusConfig();

    return (
        <motion.div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs ${config.color} ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.span
                className={`w-2 h-2 rounded-full ${config.dotColor}`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <span>{config.text}</span>
        </motion.div>
    );
};
