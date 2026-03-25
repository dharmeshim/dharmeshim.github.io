import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetadataItemProps {
    icon: LucideIcon;
    text: string;
    className?: string;
    mono?: boolean;
}

/**
 * Reusable metadata display component
 * Used for displaying Calendar, MapPin, Building2 icons with text
 */
export const MetadataItem: React.FC<MetadataItemProps> = ({
    icon: Icon,
    text,
    className = '',
    mono = false
}) => (
    <motion.div
        className={`flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 ${className}`}
        whileHover={{ x: 2 }}
    >
        <Icon className="w-4 h-4" />
        <span className={mono ? 'font-mono' : ''}>{text}</span>
    </motion.div>
);
