import { BaseSection } from "../../../../components/sections/BaseSection";
import { TypewriterText } from "../../../../components/ui/TypewriterText";
import { StatusChip } from "../../../../components/ui/StatusChip";
import { siteConfig } from "../../../../config/site";
import profile from "../../../../config/Profile.json";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../../../../lib/animations";

export const HomeSection = (): JSX.Element => {
  const { home } = siteConfig.sections;
  const { secondary: secondaryFont, primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor } = siteConfig.styles.colors;

  return (
    <BaseSection title={home.title} showTitle={false} variant="fullscreen">
      <motion.div
        className="flex flex-col items-start justify-center min-h-screen w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Status Chip */}
        <motion.div variants={staggerItem} className="mb-8">
          <StatusChip status="available" />
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          className="space-y-12 max-w-7xl w-full"
          variants={staggerContainer}
        >
          {/* Greeting with typewriter */}
          <div className="space-y-6">
            <h1 className={`${secondaryFont} font-light ${primaryColor} text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-none`}>
              <TypewriterText
                texts={home.typewriterTexts}
                speed={100}
                delay={500}
                className="text-left"
              />
            </h1>

            {/* Tagline - Large and prominent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <h2 className={`${primaryFont} font-bold ${primaryColor} text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight`}>
                {profile.tagLine}
              </h2>
            </motion.div>
          </div>

          {/* Role description with modern styling */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="flex items-start gap-4">
              {/* Accent line */}
              <motion.div
                className="w-1 h-16 md:h-24 bg-gradient-to-b from-blue-500 to-purple-500 dark:from-green-400 dark:to-cyan-400 rounded-full mt-2 flex-shrink-0"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              />

              <div className="flex-1 space-y-4">
                <p className={`${primaryFont} ${secondaryColor} text-lg sm:text-2xl md:text-3xl max-w-3xl leading-relaxed`}>
                  {siteConfig.description}
                </p>

                {/* Metadata badges */}
                <motion.div
                  className="flex flex-wrap gap-2 md:gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-50 dark:bg-cyan-400/10 text-blue-700 dark:text-cyan-400 rounded-full text-[10px] md:text-sm font-mono border border-blue-200 dark:border-cyan-400/30">
                    Frontend Developer
                  </span>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400 rounded-full text-[10px] md:text-sm font-mono border border-purple-200 dark:border-purple-400/30">
                    UI Engineer
                  </span>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-green-50 dark:bg-green-400/10 text-green-700 dark:text-green-400 rounded-full text-[10px] md:text-sm font-mono border border-green-200 dark:border-green-400/30">
                    Problem Solver
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced terminal-style elements - Bottom left */}
        <motion.div
          className="absolute bottom-32 left-8 space-y-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30 dark:border-gray-800/30 hidden lg:block"
          variants={fadeInUp}
          transition={{ delay: 2.8 }}
        >
          <div className="flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-gray-400">
            <motion.span
              className="text-green-500 dark:text-green-400 font-bold text-base"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              $
            </motion.span>
            <span>whoami</span>
          </div>
          <motion.div
            className="pl-6 text-sm font-mono text-gray-700 dark:text-gray-200 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
          >
            {siteConfig.name.toLowerCase().replace(' ', '_')}
          </motion.div>
        </motion.div>

        {/* Enhanced terminal-style elements - Bottom right */}
        <motion.div
          className="absolute bottom-32 right-8 space-y-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30 dark:border-gray-800/30 hidden lg:block"
          variants={fadeInUp}
          transition={{ delay: 3 }}
        >
          <div className="flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-gray-400">
            <motion.span
              className="text-green-500 dark:text-green-400 font-bold text-base"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              $
            </motion.span>
            <span>pwd</span>
          </div>
          <motion.div
            className="pl-6 text-sm font-mono text-gray-700 dark:text-gray-200 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4 }}
          >
            ~/building_the_future
          </motion.div>
        </motion.div>

        {/* Scroll hint with modern design */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6 }}
        >
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Scroll to explore
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full p-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-blue-500 dark:bg-green-400 rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </BaseSection>
  );
};
