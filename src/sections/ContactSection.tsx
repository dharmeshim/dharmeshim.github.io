import { GithubIcon, InstagramIcon, Linkedin, AtSign, Download, ExternalLink } from "lucide-react";
import { BaseSection } from "../components/BaseSection";
import { SectionHeader } from "../components/SectionHeader";
import { siteConfig } from "../config/site";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../lib/animations";
import { useInView } from "../hooks/useInView";
import profile from "../config/Profile.json";
import { PaperRocket } from "../components/PaperRocket";

export const ContactSection = (): JSX.Element => {
  const { contact } = siteConfig.sections;
  const { secondary: monoFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, accent, accentSoft, accentBg, accentBorder, accentBorderFull, accentBorderHover } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const getIconComponent = (name: string) => {
    switch (name.toLowerCase()) {
      case "instagram": return InstagramIcon;
      case "github": return GithubIcon;
      case "linkedin": return Linkedin;
      case "mail": return AtSign;
      default: return ExternalLink;
    }
  };

  // Filter social links that have valid URLs
  const activeSocialLinks = contact.socialLinks.filter(
    (link) => link.link && link.link !== "#"
  );

  return (
    <BaseSection title={contact.title}>
      <div ref={ref} className="w-full">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Header + Rocket side by side */}
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <SectionHeader
                title={contact.title}
                index="07"
                subtitle="Initiate sequence"
              />
            </div>
            {/* Paper Rocket — decorative, desktop only */}
            <motion.div
              className="hidden lg:block w-20 shrink-0 mt-2 opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <PaperRocket className="w-full" />
            </motion.div>
          </div>

          {/* ─── Bio / intent ─── */}
          <motion.div
            variants={staggerItem}
            className="mb-16 max-w-2xl"
          >
            <p
              className="text-lg md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              {profile.bio}
            </p>
          </motion.div>

          {/* ─── Social links ─── */}
          <motion.div variants={staggerItem} className="mb-16">
            <div className={`${monoFont} text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-6`}>
              Connect
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {contact.socialLinks.map((link, index) => {
                const Icon = getIconComponent(link.name);
                const isValid = link.link && link.link !== "#";
                return (
                  <motion.a
                    key={index}
                    href={link.link || "#"}
                    target={isValid ? "_blank" : undefined}
                    rel={isValid ? "noopener noreferrer" : undefined}
                    data-cursor={isValid ? "external" : undefined}
                    className={`group flex items-center gap-4 p-4 rounded-2xl border ${accentBorder} ${accentSoft} ${accentBorderHover} transition-all duration-300 ${!isValid ? 'opacity-40 pointer-events-none' : ''}`}
                    whileHover={isValid ? { x: 6 } : {}}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentSoft} border ${accentBorder}`}>
                      <Icon className={`w-4 h-4 ${primaryColor} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`${monoFont} text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold`}>
                        {link.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-medium truncate"
                        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                        {isValid
                          ? link.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
                          : 'Coming soon'}
                      </span>
                    </div>
                    {isValid && (
                      <ExternalLink className={`w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:${accent.split(' ')[0].replace('text-', 'text-')} dark:group-hover:text-green-400 ml-auto shrink-0 transition-colors`} />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ─── Resume download ─── */}
          {contact.resume && (
            <motion.div variants={staggerItem} className="mb-20">
              <div className={`${monoFont} text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-6`}>
                Credentials
              </div>
              <motion.a
                href={contact.resume.link}
                download
                data-cursor="external"
                className={`inline-flex items-center gap-4 px-8 py-4 border-2 ${accentBorderFull} rounded-2xl ${accent} font-bold text-sm tracking-wide hover:${accentBg.split(' ')[0]} dark:hover:${accentBg.split(' ')[1]} hover:text-white dark:hover:text-black transition-all duration-300 group`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  Download Résumé (PDF)
                </span>
              </motion.a>
            </motion.div>
          )}

          {/* ─── Footer line ─── */}
          <motion.div
            variants={staggerItem}
            className="pt-10 border-t border-gray-200/30 dark:border-white/5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className={`${monoFont} text-[9px] uppercase tracking-[0.3em] text-gray-400`}>
              {profile.name}
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${accentBg.split(' ')[0]} animate-pulse`} />
              <span className={`${monoFont} text-[9px] uppercase tracking-[0.3em] text-gray-400`}>
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
