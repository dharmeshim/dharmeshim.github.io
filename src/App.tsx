import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeToggle, ParticleBackground, MagneticCursor, SmoothScroll, Loader } from './components';
import {
  ContactSection,
  EducationSection,
  ExperienceSection,
  HomeSection,
  ProjectsSection,
  KnowledgeSection,
  TechStackSection,
  CertificationsSection,
} from './sections';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { siteConfig } from './config/site';

const BOOT_STEPS = [
  'Initializing portfolio...',
  'Loading modules...',
  'Mounting components...',
  'Applying styles...',
  'Ready.',
];

export const App = (): JSX.Element => {
  const { background } = siteConfig.styles.colors;

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useKeyboardShortcuts();

  // Boot sequence simulation
  useEffect(() => {
    const stepDuration = 320;
    const steps = BOOT_STEPS.length;

    BOOT_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setStatusIndex(i);
        setLoadProgress(Math.round(((i + 1) / steps) * 100));
        if (i === steps - 1) {
          setTimeout(() => setIsLoading(false), 400);
        }
      }, i * stepDuration);
    });
  }, []);

  return (
    <SmoothScroll>
      {/* Cinematic boot loader */}
      <AnimatePresence>
        {isLoading && (
          <Loader
            progress={loadProgress}
            status={BOOT_STEPS[statusIndex]}
            isVisible={isLoading}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div
          className={`${background} w-full min-h-screen transition-colors duration-400 relative overflow-x-hidden`}
        >
          {/* Blueprint grid */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] z-0"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              color: 'inherit',
              transform: 'translateZ(0)',
            }}
          />

          {/* Particle constellation */}
          <ParticleBackground />

          {/* Premium cursor (desktop only) */}
          <MagneticCursor />

          {/* Content */}
          <div className="relative z-10">
            <ThemeToggle />

            <div id="home"><HomeSection /></div>
            <div id="experience"><ExperienceSection /></div>
            <div id="projects"><ProjectsSection /></div>
            <div id="education"><EducationSection /></div>
            <div id="knowledge"><KnowledgeSection /></div>
            <div id="techStack"><TechStackSection /></div>
            <div id="certifications"><CertificationsSection /></div>
            <div id="contact"><ContactSection /></div>
          </div>
        </div>
      )}
    </SmoothScroll>
  );
};
