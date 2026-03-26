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

  useKeyboardShortcuts();

  // Functional Asset & Document Loader
  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 10;
    let frameId: number;

    // Promise resolves when Fonts and DOM are fully ready
    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', resolve);
        }
      })
    ]).then(() => {
      targetProgress = 100;
    });

    const updateProgress = () => {
      if (currentProgress < targetProgress) {
        currentProgress += (targetProgress - currentProgress) * 0.1;
        if (targetProgress === 100 && currentProgress > 99.5) {
          currentProgress = 100;
        }

        // if it's lagging but not loaded yet, slowly creep up
        if (targetProgress < 100 && targetProgress < 90) {
           targetProgress += 0.2; 
        }

        setLoadProgress(currentProgress);
      }
      
      if (currentProgress >= 100) {
        setLoadProgress(100);
        setTimeout(() => setIsLoading(false), 600); // 600ms hold at 100%
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
        {isLoading && (
          <Loader progress={loadProgress} />
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
