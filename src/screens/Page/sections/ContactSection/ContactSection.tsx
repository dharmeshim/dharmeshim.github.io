import { GithubIcon, InstagramIcon, Linkedin, AtSign, FileText, Download, ExternalLink } from "lucide-react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";
import { Button } from "../../../../components/ui/button";

export const ContactSection = (): JSX.Element => {
  const { contact } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

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
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Introduction */}
          <motion.div className="space-y-8 mb-16" variants={staggerItem}>
            <p className={`${primaryFont} text-lg md:text-xl ${secondaryColor} max-w-4xl leading-relaxed`}>
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </motion.div>

          {/* Resume section */}
          {contact.resume && (
            <motion.div className="mb-20" variants={staggerItem}>
              <Button
                asChild
                size="lg"
                variant="default"
                className="group"
                ripple={true}
                magnetic={true}
              >
                <a
                  href={contact.resume.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </a>
              </Button>
            </motion.div>
          )}

          {/* Social media section */}
          <motion.div className="space-y-12" variants={staggerItem}>
            <h3 className={`${secondaryFont} text-lg font-medium ${mutedColor} uppercase tracking-wider`}>
              Connect With Me
            </h3>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8"
              variants={staggerContainer}
            >
              {contact.socialLinks.map((link, index) => {
                const IconComponent = getIconComponent(link.name);
                const socialColor = getSocialColor(link.name);

                return (
                  <motion.a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect on ${link.name}`}
                    className={`group flex flex-col items-center gap-4 p-6 border border-gray-300 hover:border-gray-400 ${normalTransition} cursor-pointer rounded-lg dark:border-gray-600 dark:hover:border-gray-500`}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-all duration-300 dark:bg-gray-800 dark:group-hover:bg-gray-700`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={`w-8 h-8 text-gray-500 ${socialColor} transition-colors duration-300`} />
                    </motion.div>

                    <span className={`${primaryFont} font-light ${primaryColor} text-base text-center`}>
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="pt-12 border-t border-gray-300 dark:border-gray-700 rounded-b-lg"
            variants={fadeInUp}
          >
            <p className={`${secondaryFont} text-sm ${mutedColor}`}>
              Feel free to reach out for collaborations, opportunities, or just to say hello!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </BaseSection>
  );
};