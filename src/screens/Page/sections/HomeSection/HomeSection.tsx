import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import profile from "../../../../config/Profile.json";
import { motion } from "framer-motion";
import { staggerContainer } from "../../../../lib/animations";
import { TypewriterText } from "../../../../components/ui/TypewriterText";

export const HomeSection = (): JSX.Element => {
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { secondary: secondaryColor } = siteConfig.styles.colors;

  return (
    <BaseSection title="Home" showTitle={false} variant="fullscreen">
      <motion.div
        className="flex flex-col min-h-[100dvh] w-full relative overflow-hidden px-6 md:px-12"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >

        {/* Bottom-Right Information Layer */}
        <div className="mt-auto ml-auto max-w-[95%] md:max-w-2xl text-right flex flex-col items-end space-y-8 md:space-y-12 pb-32 md:pb-32">
          {/* Typewriter Tagline */}
          <div className={`${primaryFont} text-xl sm:text-3xl md:text-5xl font-medium ${secondaryColor} tracking-tight leading-tight border-r-4 border-blue-500/30 dark:border-green-400/30 pr-6 md:pr-8 text-right`}>
            <TypewriterText
              texts={[profile.tagLine]}
              speed={50}
              delay={1000}
              className="text-right"
            />
          </div>

          {/* Minimal Description Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex items-center gap-3 md:gap-4 justify-end"
          >
            <p className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400 dark:text-gray-500 max-w-[250px] md:max-w-none">
              {siteConfig.description.split('.')[0]}
            </p>
            <div className="h-[1px] w-8 md:w-12 bg-gray-200 dark:bg-white/10" />
          </motion.div>
        </div>

        {/* Breathable Scroll Hint (Center) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className={`${secondaryFont} text-[8px] md:text-[9px] font-bold uppercase tracking-[0.8em] text-gray-300 dark:text-gray-600`}>
            Explore
          </span>
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-500/20 dark:from-green-400/20 to-transparent" />
        </motion.div>
      </motion.div>
    </BaseSection>
  );
};
