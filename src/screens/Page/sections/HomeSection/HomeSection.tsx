import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import profile from "../../../../config/Profile.json";
import { motion } from "framer-motion";
import { staggerContainer } from "../../../../lib/animations";
import { TypewriterText } from "../../../../components/ui/TypewriterText";

export const HomeSection = (): JSX.Element => {
  const { secondary: secondaryFont, primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor } = siteConfig.styles.colors;

  return (
    <BaseSection title="Home" showTitle={false} variant="fullscreen">
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden px-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Main Typography Layer */}
        <div className="max-w-7xl w-full flex flex-col items-center text-center space-y-12 lg:space-y-16">

          {/* Minimal Name Reveal */}
          <div className="space-y-4 lg:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`${primaryFont} text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black ${primaryColor} tracking-tighter leading-[0.85]`}
            >
              {siteConfig.name.split(' ')[0]}<br />
              <span className="opacity-[0.03] dark:opacity-[0.07]">{siteConfig.name.split(' ')[1]}</span>
            </motion.h1>
          </div>

          {/* Typewriter Tagline (Innovative & Breathable) */}
          <div className="space-y-8 lg:space-y-10">
            <div className={`${primaryFont} text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium ${secondaryColor} max-w-2xl tracking-tight leading-snug px-4 border-l-2 border-blue-500/30 dark:border-green-400/30 pl-8`}>
              <TypewriterText
                texts={[profile.tagLine]}
                speed={50}
                delay={2000}
                className="text-left"
              />
            </div>

            {/* Innovative Description - Minimalist 'System Label' style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="flex items-center gap-4 justify-center"
            >
              <div className="h-[1px] w-8 bg-gray-200 dark:bg-white/10" />
              <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-gray-400 dark:text-gray-500">
                {siteConfig.description.split('.')[0].slice(0, 45)}...
              </p>
              <div className="h-[1px] w-8 bg-gray-200 dark:bg-white/10" />
            </motion.div>
          </div>
        </div>

        {/* Breathable Scroll Hint */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-blue-500/20 dark:from-green-400/20 to-transparent" />
          <span className={`${secondaryFont} text-[9px] font-bold uppercase tracking-[0.8em] text-gray-300 dark:text-gray-600`}>
            Motion
          </span>
        </motion.div>
      </motion.div>
    </BaseSection>
  );
};
