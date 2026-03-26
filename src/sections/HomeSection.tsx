import { BaseSection } from '../components/BaseSection';
import { siteConfig } from '../config/site';
import profile from '../config/Profile.json';
import { motion } from 'framer-motion';
import { Signature } from '../components/Signature';
import {
  heroHeadline,
  heroSubtext,
} from '../lib/animations';
import { WireframeTerminal } from '../components/svgs/WireframeTerminal';

export const HomeSection = (): JSX.Element => {
  const { display: displayFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor } = siteConfig.styles.colors;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const taglineParts = profile.tagLine.split(',');

  return (
    <BaseSection title="Home" showTitle={false} variant="fullscreen">
      <motion.div
        className="flex flex-col min-h-[100dvh] w-full relative overflow-hidden selection:bg-green-400 selection:text-black py-8 md:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Awwwards Architectural Graphic: Wireframe Computer Terminal */}
        <motion.div
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-[20%] z-0 pointer-events-none opacity-10 dark:opacity-20 mix-blend-overlay"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <WireframeTerminal className={`w-[600px] h-[600px] md:w-[1100px] md:h-[1100px] ${secondaryColor}`} />
        </motion.div>

        {/* 1. Primary Tagline - Top Left */}
        <motion.div
          className="relative z-20 max-w-full md:max-w-5xl mt-8 md:mt-12"
          variants={heroHeadline}
        >
          <h1 className={`${displayFont} text-4xl sm:text-6xl lg:text-8xl font-black ${primaryColor} leading-[0.9] tracking-tighter uppercase`}>
            {taglineParts[0]}
            {taglineParts[1] && (
              <span className="block opacity-40">
                {taglineParts[1]}
              </span>
            )}
          </h1>

        </motion.div>

        {/* @ {profile.experience[0].company} */}
        <motion.div
          className="relative z-20 max-w-full md:max-w-5xl mt-4"
          variants={heroSubtext}
        >
          <h2 className={`${secondaryFont} text-xl sm:text-2xl lg:text-3xl font-medium ${secondaryColor} tracking-widest uppercase opacity-80`}>
            @ {profile.experience[0].company}
          </h2>
        </motion.div>

        {/* 2. Signature "Sign-Off" - Bottom Right */}
        <motion.div
          className="mt-auto relative z-20 flex flex-col items-end self-end gap-2 mb-12"
          variants={heroSubtext}
        >
          <Signature name={profile.name} className={`w-48 md:w-80 -mb-2 opacity-90 ${secondaryColor}`} />

          <div className={`flex flex-col items-end border-r border-gray-300 dark:border-green-400/20 pr-4 py-1`}>
            <span className={`${secondaryFont} text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 text-right`}>
              {profile.experience[0].role}
            </span>
          </div>
        </motion.div>


      </motion.div>
    </BaseSection>
  );
};
