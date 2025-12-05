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
        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-green-400/20 dark:to-cyan-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        {/* Main logo content */}
        <div className="relative flex items-center gap-2 font-mono">
          {/* Terminal prompt */}
          <motion.span
            className="text-blue-500 dark:text-green-400 text-sm md:text-base font-bold"
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
            <span className={`${primaryColor} text-sm md:text-base lg:text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-green-400 dark:to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-cyan-400 dark:group-hover:to-green-400 transition-all duration-500`}>
              {name}
            </span>
          </motion.div>

        </div>

        {/* Subtle underline on hover */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-green-400 dark:to-cyan-400 mt-1 origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};