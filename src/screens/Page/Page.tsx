import { ThemeToggle, SystemDock, Inspector } from "../../components/shared";
import { AnimatedLogo } from "../../components/shared/AnimatedLogo";
import { ParticleBackground } from "../../components/shared/ParticleBackground";
import { MagneticCursor } from "../../components/shared/MagneticCursor";
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
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { siteConfig } from "../../config/site";
import { useRef } from "react";

export const ProfilePage = (): JSX.Element => {
  const { background } = siteConfig.styles.colors;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div
      ref={scrollContainerRef}
      className={`${background} w-full transition-colors duration-400 relative overflow-hidden h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth custom-scrollbar`}
    >
      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] z-0"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          color: 'inherit'
        }}
      />

      {/* Particle background */}
      <ParticleBackground />

      {/* Custom cursor */}
      <MagneticCursor />

      {/* Content */}
      <div className="relative z-10">
        <ThemeToggle />
        <AnimatedLogo />
        <SystemDock containerRef={scrollContainerRef} />
        <Inspector />

        <div id="home" className="snap-start w-full min-h-screen"><HomeSection /></div>
        <div id="experience" className="snap-start w-full min-h-screen"><ExperienceSection /></div>
        <div id="projects" className="snap-start w-full min-h-screen"><ProjectsSection /></div>
        <div id="education" className="snap-start w-full min-h-screen"><EducationSection /></div>
        <div id="knowledge" className="snap-start w-full min-h-screen"><KnowledgeSection /></div>
        <div id="techStack" className="snap-start w-full min-h-screen"><TechStackSection /></div>
        <div id="certifications" className="snap-start w-full min-h-screen"><CertificationsSection /></div>
        <div id="contact" className="snap-start w-full min-h-screen"><ContactSection /></div>

        <footer className="snap-start relative w-full py-12 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
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
