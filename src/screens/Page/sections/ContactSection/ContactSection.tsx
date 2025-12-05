import { GithubIcon, InstagramIcon, Linkedin, AtSign, FileText, Download, ExternalLink, Terminal, Minimize2, Maximize2, X } from "lucide-react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";
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
          className="w-full max-w-4xl mx-auto"
        >
          {/* Terminal Window */}
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c0c0c] shadow-2xl font-mono text-sm md:text-base transition-colors duration-300">
            {/* Terminal Header */}
            <div className="bg-gray-100 dark:bg-gray-800/50 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                <span>user@portfolio: ~/contact</span>
              </div>
              <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Terminal Content */}
            <div className="p-4 md:p-6 text-gray-600 dark:text-gray-300 min-h-[400px] font-mono">
              {/* Command 1: Introduction */}
              <motion.div variants={staggerItem} className="mb-6">
                <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400 mb-2">
                  <span>user@portfolio:~/contact$</span>
                  <span className="text-gray-800 dark:text-white">cat README.md</span>
                </div>
                <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 italic">
                  <p>
                    I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                    Feel free to execute any of the connection protocols below.
                  </p>
                </div>
              </motion.div>

              {/* Command 2: List Socials */}
              <motion.div variants={staggerItem} className="mb-6">
                <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400 mb-4">
                  <span>user@portfolio:~/contact$</span>
                  <span className="text-gray-800 dark:text-white">ls -la ./connections</span>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-[auto_1fr] gap-4 text-gray-400 dark:text-gray-500 text-xs border-b border-gray-200 dark:border-gray-800 pb-2 mb-2 px-2">
                    <span>permissions &nbsp; user &nbsp; size &nbsp; date</span>
                    <span>name</span>
                  </div>

                  {contact.socialLinks.map((link, index) => {
                    const Icon = getIconComponent(link.name);
                    return (
                      <motion.a
                        key={index}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid grid-cols-[auto_1fr] gap-4 items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded transition-colors group"
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-gray-400 dark:text-gray-600 text-xs font-mono hidden sm:block">
                          {getPermissionString(index)} &nbsp; user &nbsp; 4096 &nbsp; {getDateString()}
                        </span>
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors" />
                          <span className="text-blue-600 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-green-300 transition-colors">
                            {link.name.toLowerCase()}
                          </span>
                          <span className="text-gray-400 dark:text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            -&gt; {link.link}
                          </span>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Command 3: Resume */}
              {contact.resume && (
                <motion.div variants={staggerItem} className="mb-6">
                  <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400 mb-2">
                    <span>user@portfolio:~/contact$</span>
                    <span className="text-gray-800 dark:text-white">./download_resume.sh</span>
                  </div>

                  <motion.a
                    href={contact.resume.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-blue-50 dark:bg-green-500/10 border border-blue-200 dark:border-green-500/30 rounded text-blue-600 dark:text-green-400 hover:bg-blue-100 dark:hover:bg-green-500/20 hover:border-blue-300 dark:hover:border-green-500 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                    <span>Dharmeshprasad_resume.pdf</span>
                  </motion.a>
                </motion.div>
              )}

              {/* Active Prompt */}
              <motion.div variants={staggerItem} className="mt-8">
                <div className="flex flex-wrap gap-2 text-blue-600 dark:text-green-400">
                  <span>user@portfolio:~/contact$</span>
                  <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} bg-gray-400 w-2.5 h-5 inline-block align-middle`} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};