import React from "react";
import { NavigationMenu } from "../../components/shared";
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
import { ChevronDownIcon, ArrowDownIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useSectionTracking } from "../../hooks/useSectionTracking";
import { siteConfig } from "../../config/site";
import { scrollToSection } from "../../lib/navigation";

export const ProfilePage = (): JSX.Element => {
  const { activeSection, currentSectionIndex, sectionProgress } = useSectionTracking();
  const { home } = siteConfig.sections;
  const { scrollButton } = siteConfig.layout;
  const { background } = siteConfig.styles.colors;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const handleScrollToNext = () => {
    scrollToSection(home.scrollButton.targetSection);
  };

  return (
    <div className={`${background} w-full transition-colors duration-400`}>
      {/* Fixed Navigation Menu */}
      <NavigationMenu activeSection={activeSection} progress={sectionProgress} />
      
      {/* Animated Logo */}
      <AnimatedLogo />

      {/* Scroll down button - only show on home section */}
      {activeSection === "home" && (
        <div className="fixed bottom-12 right-8 z-50">
          <Button
            variant="ghost"
            className={`${scrollButton.size} p-0 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 hover:border-blue-500 hover:scale-110 ${normalTransition} text-gray-600 hover:text-blue-500 dark:bg-black dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-green-400 dark:text-gray-400 dark:hover:text-green-400`}
            aria-label={home.scrollButton.label}
            onClick={handleScrollToNext}
          >
            <ArrowDownIcon className="w-7 h-7 animate-bounce" />
          </Button>
        </div>
      )}

      {/* Full-screen sections */}
      <div className="w-full">
        {/* Introduction Section */}
        <div id="home">
          <HomeSection />
        </div>

        {/* Experience Section */}
        <div id="experience">
          <ExperienceSection />
        </div>

        {/* Projects Section */}
        <div id="projects">
          <ProjectsSection />
        </div>

        {/* Education Section */}
        <div id="education">
          <EducationSection />
        </div>

        {/* Knowledge Section */}
        <div id="knowledge">
          <KnowledgeSection />
        </div>

        {/* Tech Stack Section */}
        <div id="techStack">
          <TechStackSection />
        </div>

        {/* Certifications Section */}
        <div id="certifications">
          <CertificationsSection />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-12 sm:px-16 md:px-20 lg:px-24 xl:px-32">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              © 2024 {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};