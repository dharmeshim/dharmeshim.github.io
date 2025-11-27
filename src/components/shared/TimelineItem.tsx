import React from 'react';
import { motion } from 'framer-motion';
import { staggerItem } from '../../lib/animations';

interface TimelineItemProps {
    index: number;
    inView: boolean;
    children: React.ReactNode;
    className?: string;
}

/**
 * Reusable timeline item component
 * Used in Experience and Projects sections for consistent timeline layout
 */
export const TimelineItem: React.FC<TimelineItemProps> = ({
    index,
    inView,
    children,
    className = '',
}) => (
    <motion.div
        className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 rounded-r-lg ${className}`}
        variants={staggerItem}
        whileHover={{ x: 4 }}
    >
        {/* Timeline dot - animated on scroll */}
        <motion.div
            className="absolute left-0 top-0 w-5 h-5 bg-gray-400 rounded-full border-4 border-white group-hover:bg-blue-500 transition-all duration-500 transform -translate-x-2.5 dark:bg-gray-600 dark:border-black dark:group-hover:bg-green-400"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 260, damping: 20 }}
        />
        {children}
    </motion.div>
);
