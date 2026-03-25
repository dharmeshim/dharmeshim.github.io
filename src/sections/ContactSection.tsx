import { GithubIcon, InstagramIcon, Linkedin, AtSign, FileText, Download, ExternalLink, Terminal, Minimize2, Maximize2, X } from "lucide-react";
import { BaseSection } from "../components/BaseSection";
import { MinimalHeader } from "../components/MinimalHeader";
import { siteConfig } from "../config/site";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../lib/animations";
import { useInView } from "../hooks/useInView";
import { useState, useEffect } from "react";

export const ContactSection = (): JSX.Element => {
  const { contact } = siteConfig.sections;
  const { primary: primaryFont } = siteConfig.styles.fonts;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "instagram": return InstagramIcon;
      case "github": return GithubIcon;
      case "linkedin": return Linkedin;
      case "medium": return ExternalLink;
      case "mail": return AtSign;
      default: return ExternalLink;
    }
  };

  const getPermissionString = (index: number) => {
    // Generate fake permission strings for terminal look
    const perms = ["rwx", "r-x", "r--"];
    return `-rwxr-xr-x`;
  };

  const getDateString = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <BaseSection title={contact.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="w-full mx-auto"
        >
          <MinimalHeader 
            title={contact.title} 
            index="07" 
            subtitle="Initiate Sequence" 
          />

          {/* Integrated Terminal Experience */}
          <div className="relative font-mono text-sm md:text-base">
            {/* Terminal Header - Minimalist */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/30 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
                </div>
                <div className="text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Connection: Stable
                </div>
              </div>
              <div className="text-gray-400 dark:text-gray-500 text-[10px] flex items-center gap-2 uppercase tracking-[0.2em] font-bold">
                <Terminal className="w-3 h-3" />
                <span>~/contact</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="text-gray-600 dark:text-gray-300 min-h-[300px] space-y-12">
              {/* Command 1: Introduction */}
              <motion.div variants={staggerItem} className="space-y-4">
                <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400">
                  <span className="opacity-50">sh</span>
                  <span className="text-gray-800 dark:text-white">cat README_INTENT.md</span>
                </div>
                <div className="pl-6 border-l border-blue-500/20 dark:border-green-400/20 text-gray-500 dark:text-gray-400">
                  <p className="max-w-2xl leading-relaxed">
                    I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                    Feel free to execute any of the connection protocols below.
                  </p>
                </div>
              </motion.div>

              {/* Command 2: List Socials */}
              <motion.div variants={staggerItem} className="space-y-6">
                <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400">
                  <span className="opacity-50">sh</span>
                  <span className="text-gray-800 dark:text-white">ls -la ./protocols</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contact.socialLinks.map((link, index) => {
                    const Icon = getIconComponent(link.name);
                    return (
                      <motion.a
                        key={index}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-blue-500/5 dark:hover:bg-green-400/5 transition-all duration-300 border border-transparent hover:border-blue-500/10 dark:hover:border-green-400/10"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 group-hover:bg-blue-500/10 dark:group-hover:bg-green-400/10 transition-colors">
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-widest truncate">{link.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors truncate">
                            {link.link.replace(/^https?:\/\/(www\.)?/, '')}
                          </span>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Command 3: Resume */}
              {contact.resume && (
                <motion.div variants={staggerItem} className="space-y-4">
                  <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400">
                    <span className="opacity-50">sh</span>
                    <span className="text-gray-800 dark:text-white">./init_download --target=resume</span>
                  </div>

                  <motion.a
                    href={contact.resume.link}
                    download="Dharmeshprasad_resume.pdf"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/5 dark:bg-green-400/5 border border-blue-500/20 dark:border-green-400/20 rounded-2xl text-blue-600 dark:text-green-400 hover:bg-blue-500/10 dark:hover:bg-green-400/10 hover:border-blue-500/40 dark:hover:border-green-400/40 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="font-bold uppercase tracking-wider text-xs">Download Resume (PDF)</span>
                  </motion.a>
                </motion.div>
              )}

              {/* Active Prompt & Status Metadata */}
              <motion.div variants={staggerItem} className="pt-12 flex flex-wrap items-center justify-between gap-8 border-t border-gray-200/30 dark:border-white/5 opacity-50">
                <div className="flex items-center gap-3 text-blue-600 dark:text-green-400">
                  <span className="animate-pulse">&gt;_</span>
                  <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} bg-blue-500 dark:bg-green-400 w-2.5 h-4 inline-block align-middle`} />
                </div>
                <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Live Secure</span>
                  </div>
                  <span>v2.1.0_PROD</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
