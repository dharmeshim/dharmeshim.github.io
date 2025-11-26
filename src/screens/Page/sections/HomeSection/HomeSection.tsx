import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { TypewriterText } from "../../../../components/ui/TypewriterText";
import { siteConfig } from "../../../../config/site";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../../../../lib/animations";

export const HomeSection = (): JSX.Element => {
  const { home } = siteConfig.sections;
  const { secondary: secondaryFont, primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, accent: accentColor, success: successColor, warning: warningColor } = siteConfig.styles.colors;

  return (
    <BaseSection title={home.title} showTitle={false} variant="fullscreen">
      <motion.div
        className="flex flex-col items-start justify-center min-h-screen w-full space-y-24"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Main heading with typewriter effect */}
        <motion.div
          className="text-left space-y-16 max-w-7xl"
          variants={staggerItem}
        >
          <h1 className={`${secondaryFont} font-extralight ${primaryColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-tight`}>
            <TypewriterText
              texts={home.typewriterTexts}
              speed={80}
              delay={800}
              className="text-left"
            />
          </h1>
        </motion.div>

        {/* Fun terminal-style elements with theme-appropriate colors */}
        <motion.div
          className="absolute bottom-20 left-8 text-xs text-gray-500 font-mono opacity-40 dark:text-gray-400"
          variants={fadeInUp}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.span
              className="text-green-500 dark:text-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              $
            </motion.span>
            <span>whoami</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-8 text-xs text-gray-500 font-mono opacity-40 dark:text-gray-400"
          variants={fadeInUp}
          transition={{ delay: 1.7 }}
        >
          <div className="flex items-center gap-2">
            <motion.span
              className="text-green-500 dark:text-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              $
            </motion.span>
            <span>ls -la</span>
          </div>
        </motion.div>
      </motion.div>
    </BaseSection>
  );
};