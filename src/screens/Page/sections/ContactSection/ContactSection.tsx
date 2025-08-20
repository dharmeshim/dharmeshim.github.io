import { GithubIcon, InstagramIcon, Linkedin, AtSign, FileText, Download, ExternalLink } from "lucide-react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";

export const ContactSection = (): JSX.Element => {
  const { contact } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "instagram":
        return InstagramIcon;
      case "github":
        return GithubIcon;
      case "linkedin":
        return Linkedin;
      case "medium":
        return ExternalLink;
      case "mail":
        return AtSign;
      default:
        return ExternalLink;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return "hover:text-gray-700 dark:hover:text-gray-300";
      case "linkedin":
        return "hover:text-blue-600 dark:hover:text-cyan-400";
      case "instagram":
        return "hover:text-pink-600 dark:hover:text-pink-400";
      case "medium":
        return "hover:text-green-600 dark:hover:text-green-400";
      case "mail":
        return "hover:text-red-600 dark:hover:text-red-400";
      default:
        return "hover:text-gray-600 dark:hover:text-gray-400";
    }
  };

  return (
    <BaseSection title={contact.title}>
      <div className={`${itemGap}`}>
        {/* Introduction */}
        <div className="space-y-8 mb-16">
          <p className={`${primaryFont} text-lg md:text-xl ${secondaryColor} max-w-4xl leading-relaxed`}>
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        {/* Resume section */}
        {contact.resume && (
          <div className="mb-20">
            <a
              href={contact.resume.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-4 px-16 py-6 bg-gray-800 text-white border border-gray-600 font-light text-lg hover:bg-gray-700 hover:border-blue-500 transition-all duration-500 hover:scale-105 hover-glow rounded-lg dark:bg-gray-800 dark:text-green-400 dark:border-gray-600 dark:hover:border-green-400`}
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </a>
          </div>
        )}
        
        {/* Social media section */}
        <div className="space-y-12">
          <h3 className={`${secondaryFont} text-lg font-medium ${mutedColor} uppercase tracking-wider`}>
            Connect With Me
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {contact.socialLinks.map((link, index) => {
              const IconComponent = getIconComponent(link.name);
              const socialColor = getSocialColor(link.name);
              
              return (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${link.name}`}
                  className={`group flex flex-col items-center gap-4 p-6 border border-gray-300 hover:border-gray-400 ${normalTransition} hover:scale-105 cursor-pointer rounded-lg dark:border-gray-600 dark:hover:border-gray-500`}
                >
                  <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-all duration-300 dark:bg-gray-800 dark:group-hover:bg-gray-700`}>
                    <IconComponent className={`w-8 h-8 text-gray-500 ${socialColor} transition-colors duration-300`} />
                  </div>
                  
                  <span className={`${primaryFont} font-light ${primaryColor} text-base text-center`}>
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact info */}
        <div className="pt-12 border-t border-gray-300 dark:border-gray-700 rounded-b-lg">
          <p className={`${secondaryFont} text-sm ${mutedColor}`}>
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </div>
      </div>
    </BaseSection>
  );
};