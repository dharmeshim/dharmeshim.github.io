import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrambledTitle } from './ScrambledTitle';
import { siteConfig } from '../config/site';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  index: string;
  className?: string;
}

export const SectionHeader = ({ title, subtitle, index, className = "" }: SectionHeaderProps) => {
  const { secondary: monoFont } = siteConfig.styles.fonts;
  const { accent, primary: primaryColor, accentBg } = siteConfig.styles.colors;

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <div ref={containerRef} className={`w-full mb-10 md:mb-24 relative ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 md:pb-10 gap-4 md:gap-12">

        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
          {/* Index */}
          {/* <motion.span
            className={`${monoFont} text-[10px] md:text-xs ${accent} tracking-widest font-bold`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            ({index})
          </motion.span> */}

          {/* Title — ScrambledTitle scramble animation */}
          <h2
            className={`leading-[1] font-bold tracking-tight ${primaryColor} uppercase`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(1.8rem, 6vw, 6.5rem)',
              wordWrap: 'normal',
              whiteSpace: 'pre-wrap',
            }}
            aria-label={title}
          >
            {isInView ? (
              <ScrambledTitle
                text={title.toUpperCase()}
                className={primaryColor}
              />
            ) : (
              <span className="opacity-0 pointer-events-none">{title.toUpperCase()}</span>
            )}
          </h2>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            className="flex items-center gap-3 self-start md:self-end mb-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-8 md:w-16 h-px bg-gray-300 dark:bg-gray-700" />
            <p className={`${monoFont} text-[9px] uppercase tracking-[0.25em] text-gray-400`}>
              {subtitle}
            </p>
          </motion.div>
        )}
      </div>

      {/* Animated rule */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gray-900/15 dark:bg-white/10 w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <motion.div
        className={`absolute bottom-0 left-0 h-[2px] ${accentBg} w-[12%] md:w-[8%] origin-left`}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </div>
  );
};
