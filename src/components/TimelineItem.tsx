import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerItem, easings } from '../lib/animations';

interface TimelineItemProps {
  index: number;
  inView: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * High-end customizable timeline item used in Experience/Projects section.
 * Animated border and dot that responds to view context and hover.
 */
export const TimelineItem: React.FC<TimelineItemProps> = ({
  index,
  inView,
  children,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`group relative pl-12 md:pl-20 ${className}`}
      variants={staggerItem}
      whileHover={shouldReduceMotion ? undefined : { x: 6, transition: { ease: easings.expoOut, duration: 0.6 } }}
    >
      {/* 
        Line - animated on scroll.
        Note: We use absolute div for the timeline border to animate its height
      */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-blue-500/20 dark:bg-green-400/20 origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: easings.expoOut, delay: index * 0.15 }}
      />
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-blue-600 dark:bg-green-400 origin-top group-hover:scale-y-100 scale-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-[80%]"
      />

      {/* Timeline dot - animated on scroll */}
      <motion.div
        className="absolute left-[-4px] top-6 w-[9px] h-[9px] bg-white dark:bg-black border-2 border-blue-500 dark:border-green-400 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-500 dark:group-hover:bg-green-400"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300, damping: 20 }}
      />

      {children}
    </motion.div>
  );
};
