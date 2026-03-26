import { motion } from 'framer-motion';
import { siteConfig } from '../config/site';

interface LoaderProps {
  progress?: number;
}

export const Loader = ({ progress = 0 }: LoaderProps): JSX.Element => {
  const { background } = siteConfig.styles.colors;
  const { display: displayFont } = siteConfig.styles.fonts;
  
  // Format progress cleanly to integer
  const formattedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-8 px-6 md:py-12 md:px-12 ${background} overflow-hidden`}
      initial={{ y: 0 }}
      exit={{ y: '-100dvh', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Top header */}
      <div className="w-full flex justify-between uppercase tracking-[0.2em] text-[10px] md:text-xs text-black dark:text-gray-400 overflow-hidden font-mono font-bold">
        <motion.span 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          DHARMESHIM
        </motion.span>
        <motion.span 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          PORTFOLIO — RECORD
        </motion.span>
      </div>

      {/* Massive Center Number - Absolute Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-col items-center justify-center w-full">
        <motion.h1 
          className={`${displayFont} text-[35vw] md:text-[25vw] font-black text-black dark:text-white leading-none tracking-tighter`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {formattedProgress}
        </motion.h1>
      </div>

      {/* Bottom Bar / Footer */}
      <div className="w-full flex flex-col items-end mt-auto z-10 overflow-hidden">
        <div className="w-full overflow-hidden h-[1px] bg-gray-200 dark:bg-gray-800 mb-3 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-black dark:bg-white origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
        </div>
        
        <div className="overflow-hidden">
          <motion.span 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black dark:text-gray-400 block font-mono font-bold"
          >
            {formattedProgress === 100 ? "SYSTEM READY" : "LOADING ASSETS..."}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
