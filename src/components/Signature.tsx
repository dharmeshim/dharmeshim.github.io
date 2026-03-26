import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SignatureProps {
  name: string;
  className?: string;
}

/**
 * Signature Component
 * Renders a cursive hand-drawn signature using SVG path animation.
 * Ideal for high-end portfolio intros.
 */
export const Signature: React.FC<SignatureProps> = ({ name, className }) => {
  const drawAction: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.5, type: "spring", duration: 2.5, bounce: 0 } as any,
        opacity: { delay: 0.5, duration: 0.2 }
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 80"
        className="w-full h-auto max-w-[300px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M20,50 Q30,15 45,45 T70,45 T95,45 T120,45 T145,45 T170,45"
          variants={drawAction}
          initial="hidden"
          animate="visible"
          className="text-blue-500 dark:text-green-400"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="sr-only"
        >
          {name}
        </text>
      </svg>
    </div>
  );
};
