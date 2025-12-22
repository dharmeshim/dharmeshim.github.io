import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { siteConfig } from "../../config/site";

const developerQuotes = [
  "// TODO: Add more coffee ☕",
  "console.log('You found me! 🎉')",
  "if (curious) { keepExploring(); }",
  "// Code is poetry 📝",
  "Debugging: Being a detective in a crime movie where you are also the murderer 🔍",
];

export const AnimatedLogo = (): JSX.Element => {
  const [clickCount, setClickCount] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");

  const { primary: primaryColor } = siteConfig.styles.colors;
  const { name } = siteConfig;

  useEffect(() => {
    if (clickCount === 3) {
      const randomQuote = developerQuotes[Math.floor(Math.random() * developerQuotes.length)];
      setCurrentQuote(randomQuote);
      setShowQuote(true);

      // Reset after 3 seconds
      const timer = setTimeout(() => {
        setShowQuote(false);
        setClickCount(0);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <>
      <motion.div
        className="fixed top-8 left-8 z-40 group px-4 py-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-transparent hover:border-gray-200/20 dark:hover:border-gray-800/20 transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
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
              <span className={`font-mono ${primaryColor} text-sm md:text-base lg:text-lg font-bold tracking-tight dark:text-green-400 transition-all duration-500`}>
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

      {/* Easter egg quote */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            className="fixed top-24 left-8 z-50 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-green-400/30 rounded-lg px-4 py-3 shadow-lg max-w-xs"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {currentQuote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};