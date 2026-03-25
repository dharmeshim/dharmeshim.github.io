import { motion } from 'framer-motion';
import { ScrambleReveal } from './ScrambleReveal';

interface MinimalHeaderProps {
  title: string;
  subtitle?: string;
  index: string;
}

export const MinimalHeader = ({ title, subtitle, index }: MinimalHeaderProps) => {
  return (
    <div className="w-full mb-10 md:mb-32 relative group">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 md:pb-12 gap-4 md:gap-12 px-2 md:px-0">
        
        <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-xs font-mono ml-1 md:ml-0 md:mt-3 text-blue-500 dark:text-green-400 overflow-hidden h-4 md:h-5 relative w-12"
          >
             <div className="absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full w-full h-full flex items-center">
               ({index})
             </div>
             <div className="absolute top-full left-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full w-full h-full flex items-center">
               [*]
             </div>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] font-mono font-black tracking-tighter text-gray-900 dark:text-green-400 uppercase break-words drop-shadow-[0_0_15px_rgba(52,211,153,0.15)] dark:drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <ScrambleReveal text={title} duration={0.8} />
          </h2>
        </div>
        
        {subtitle ? (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-3 self-start md:self-end ml-1 md:ml-0 mt-2 md:mt-0"
          >
            <div className="w-8 md:w-12 xl:w-24 h-[1px] bg-gray-400 dark:bg-gray-600" />
            <p className="max-w-[200px] text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] md:text-right text-gray-500">
              {subtitle}
            </p>
          </motion.div>
        ) : (
          <div /> /* spacer */
        )}
      </div>

      {/* Animated Bottom Border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-px bg-gray-900/20 dark:bg-white/20 w-full origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      
      {/* Accent line that follows the border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-blue-500 dark:bg-green-400 w-1/4 md:w-[15%] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};
