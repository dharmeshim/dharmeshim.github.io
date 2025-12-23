import { siteConfig } from "../../config/site";

interface StickyHeaderProps {
  activeSection: string;
  isVisible: boolean;
}

export const StickyHeader = ({ activeSection, isVisible }: StickyHeaderProps): JSX.Element => {
  const { michroma: michromaFont } = siteConfig.styles.fonts;
  const { primary: primaryColor } = siteConfig.styles.colors;

  // Get the section title based on active section
  const getSectionTitle = (sectionId: string): string => {
    const sections = siteConfig.sections;
    switch (sectionId) {
      case "home":
        return sections.home.title;
      case "experience":
        return sections.experience.title;
      case "projects":
        return sections.projects.title;
      case "education":
        return sections.education.title;
      case "skills":
        return sections.skills.title;
      case "contact":
        return sections.contact.title;
      default:
        return "";
    }
  };

  const sectionTitle = getSectionTitle(activeSection);

  const { containerMaxWidth, sectionPadding } = siteConfig.styles.spacing;

  return (
    <div
      className={`fixed top-20 left-0 right-0 z-40 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
    >
      <div className={`${containerMaxWidth} mx-auto ${sectionPadding}`}>
        <div className={`text-left ${michromaFont} font-normal ${primaryColor} text-5xl py-4`}>
          {sectionTitle}
        </div>
      </div>
    </div>
  );
}; 