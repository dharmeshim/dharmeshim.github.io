import { siteConfig } from "../config/site";

interface StickyHeaderProps {
  activeSection: string;
  isVisible: boolean;
}

export const StickyHeader = ({ activeSection, isVisible }: StickyHeaderProps): JSX.Element => {
  const { display: displayFont } = siteConfig.styles.fonts;
  const { primary: primaryColor } = siteConfig.styles.colors;

  // Get the section title based on active section
  const getSectionTitle = (sectionId: string): string => {
    const sections = siteConfig.sections;
    if (sectionId === "home") return sections.home.id === "home" ? sections.home.title : "";
    if (sectionId === "experience") return sections.experience.title;
    if (sectionId === "projects") return sections.projects.title;
    if (sectionId === "education") return sections.education.title;
    if (sectionId === "knowledge") return sections.knowledge.title;
    if (sectionId === "techStack") return sections.techStack.title;
    if (sectionId === "certifications") return sections.certifications.title;
    if (sectionId === "contact") return sections.contact.title;
    return "";
  };

  const sectionTitle = getSectionTitle(activeSection);

  const { containerMaxWidth, sectionPadding } = siteConfig.styles.spacing;

  return (
    <div
      className={`fixed top-20 left-0 right-0 z-40 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
    >
      <div className={`${containerMaxWidth} mx-auto ${sectionPadding}`}>
        <div className={`text-left ${displayFont} font-normal ${primaryColor} text-5xl py-4`}>
          {sectionTitle}
        </div>
      </div>
    </div>
  );
}; 