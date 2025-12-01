import { ThemeToggle } from "../../components/shared";
import { AnimatedLogo } from "../../components/shared/AnimatedLogo";
import {
  ContactSection,
  EducationSection,
  ExperienceSection,
  HomeSection,
  ProjectsSection,
  KnowledgeSection,
  TechStackSection,
  CertificationsSection
} from "../../components/sections";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useSectionTracking } from "../../hooks/useSectionTracking";
import { siteConfig } from "../../config/site";
import { scrollToSection } from "../../lib/navigation";
import { motion } from "framer-motion";

export const ProfilePage = (): JSX.Element => {
  const { activeSection } = useSectionTracking();
  const { home } = siteConfig.sections;
  const { scrollButton } = siteConfig.layout;
  const { background } = siteConfig.styles.colors;

  const handleScrollToNext = () => {
    scrollToSection(home.scrollButton.targetSection);
  };

  return (
    <div className={`${background} w-full transition-colors duration-400 relative overflow-hidden`}>
      {/* Animated gradient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-green-400/10 dark:via-cyan-400/10 dark:to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 dark:from-cyan-400/10 dark:via-blue-400/10 dark:to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ThemeToggle />
        <AnimatedLogo />

        {activeSection === "home" && (
          <motion.div
            className="fixed bottom-12 right-8 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <Button
              variant="default"
              className={`${scrollButton.size} p-0 rounded-xl shadow-xl hover:shadow-2xl`}
              aria-label={home.scrollButton.label}
              onClick={handleScrollToNext}
              ripple={true}
            >
              <ArrowDownIcon className="w-7 h-7 animate-bounce" />
            </Button>
          </motion.div>
        )}

        <div className="w-full">
          <div id="home"><HomeSection /></div>
          <div id="experience"><ExperienceSection /></div>
          <div id="projects"><ProjectsSection /></div>
          <div id="education"><EducationSection /></div>
          <div id="knowledge"><KnowledgeSection /></div>
          <div id="techStack"><TechStackSection /></div>
          <div id="certifications"><CertificationsSection /></div>
          <div id="contact"><ContactSection /></div>
        </div>

        <footer className="relative w-full py-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-12 sm:px-16 md:px-20 lg:px-24 xl:px-32">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                © 2024 {siteConfig.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
