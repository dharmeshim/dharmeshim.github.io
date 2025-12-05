import { motion } from "framer-motion";
import { siteConfig } from "../../config/site";

export const AnimatedLogo = (): JSX.Element => {

  const { primary: primaryColor } = siteConfig.styles.colors;
  const { name } = siteConfig;

  return (
    <motion.div
      className="fixed top-8 left-8 z-40 group px-4 py-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-transparent hover:border-gray-200/20 dark:hover:border-gray-800/20 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative">

        {/* Main logo content */}
        <div className="relative flex items-center gap-2 font-mono">
          {/* Terminal prompt */}
          <motion.span
            className="text-blue-600 dark:text-green-400 text-sm md:text-base font-bold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            $
          </motion.span>

          {/* Name with gradient */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className={`${primaryColor} text-sm md:text-base lg:text-lg font-semibold tracking-tight dark:text-green-400 transition-all duration-500`}>
              {name}
            </span>
          </motion.div>

        </div>

        {/* Subtle underline on hover */}
        <motion.div
          className="h-0.5 bg-blue-600 dark:bg-green-400 mt-1 origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};