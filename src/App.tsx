import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MagneticCursor, SmoothScroll, Loader, ScrollProgress } from './components';
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
import { ThemeToggle } from './components/ThemeToggle';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { siteConfig } from './config/site';

export const App = (): JSX.Element => {
  const { background } = siteConfig.styles.colors;

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useKeyboardShortcuts();

  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 10;
    let frameId: number;

    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', resolve);
        }
      }),
    ]).then(() => {
      targetProgress = 100;
    });

    const updateProgress = () => {
      if (currentProgress < targetProgress) {
        currentProgress += (targetProgress - currentProgress) * 0.1;
        if (targetProgress === 100 && currentProgress > 99.5) {
          currentProgress = 100;
        }
        if (targetProgress < 100 && targetProgress < 90) {
          targetProgress += 0.2;
        }
        setLoadProgress(currentProgress);
      }

      if (currentProgress >= 100) {
        setLoadProgress(100);
        setTimeout(() => setIsLoading(false), 600);
      } else {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <SmoothScroll>
      {/* Cinematic boot loader */}
      <AnimatePresence>
        {isLoading && <Loader progress={loadProgress} />}
      </AnimatePresence>

      {!isLoading && (
        <div
          className={`${background} w-full min-h-screen transition-colors duration-400 relative overflow-x-hidden`}
        >
          {/* Subtle architectural grid — light blueprint lines */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04] z-0"
            aria-hidden="true"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              transform: 'translateZ(0)',
            }}
          />

          {/* Left-rail scroll progress */}
          <ScrollProgress />

          {/* Context-aware custom cursor (desktop only) */}
          <MagneticCursor />

          {/* Theme toggle ripple overlay + button (top-right) */}
          <ThemeToggle />

          {/* Page content */}
          <div className="relative z-10">
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
