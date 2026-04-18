import { useState } from "react";
import { siteConfig } from "../config/site";
import { Badge } from "../components/ui/badge";
import { ExternalLink, Code, Calendar, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";
import { BaseSection } from "../components/BaseSection";

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface Project {
  name: string;
  description: string;
  summary: string;
  duration: string;
  sourceCode?: string;
  liveUrl?: string;
  technologies?: string[];
}

/* ─── Main Section ───────────────────────────────────────────────────────────── */
export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const { secondary: monoFont } = siteConfig.styles.fonts;
  const {
    primary: primaryColor,
    secondary: secondaryColor,
  } = siteConfig.styles.colors;

  // Track the currently expanded project index. Default to null (all closed)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <BaseSection variant="minimal">
      {/* Remove heavy bottom margin from SectionHeader to keep the list tight */}
      <SectionHeader title={projects.title} index="02" subtitle="Selected Works" className="!mb-12" />

      {/* Editorial Interactive List Container */}
      <div className="w-full max-w-6xl mx-auto border-t border-gray-200/50 dark:border-white/10">
        {projects.items.map((project, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-gray-200/50 dark:border-white/10 relative"
            >
              {/* Massive Parallax Numbering (Scroll Reaction) */}
              <span 
                className="absolute -top-6 md:-top-12 lg:-top-16 -left-4 md:-left-8 text-[6rem] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter opacity-5 dark:opacity-10 transition-all duration-700 ease-out group-hover:opacity-10 dark:group-hover:opacity-20 group-hover:translate-x-4 pointer-events-none select-none z-0 text-gray-400 dark:text-white"
                style={{ 
                  WebkitTextStroke: '2px currentColor', 
                  color: 'transparent'
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Active Indicator Line */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#385144] dark:bg-green-400 hidden md:block z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Clickable Row Header (Includes Summary in minus/collapsed mode) */}
              <button
                onClick={() => toggleExpand(index)}
                className="relative z-10 w-full flex items-center justify-between py-8 md:py-12 text-left outline-none md:pl-8 bg-transparent transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
              >
                {/* Content Block (Title + Summary) */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 w-full pr-6 md:pr-12">
                  <div className="flex items-center gap-4 md:gap-8 lg:w-5/12">
                    <span className={`${monoFont} text-xs md:text-sm tracking-widest text-gray-400 dark:text-gray-500`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight transition-all duration-500 origin-left text-gray-900 dark:text-white group-hover:text-[#385144] dark:group-hover:text-green-400 group-hover:translate-x-2 md:group-hover:translate-x-4 ${isExpanded ? "text-[#385144] dark:text-green-400 translate-x-2 md:translate-x-4" : ""}`}
                      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                    >
                      {project.name}
                    </h3>
                  </div>

                  {/* Summary displays alongside for context */}
                  <div className="lg:w-7/12 flex flex-col md:flex-row items-start md:items-center justify-between mt-2 md:mt-0 transition-opacity duration-500">
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-sm xl:max-w-md line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                    {project.duration && (
                      <span className={`hidden lg:inline-block ${monoFont} text-[10px] tracking-widest text-gray-400 uppercase mt-4 md:mt-0`}>
                        {project.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Plus/Minus Toggle */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border transition-colors duration-500 ${
                      isExpanded 
                        ? "border-[#385144] dark:border-green-400 bg-[#385144]/5 dark:bg-green-400/5 text-[#385144] dark:text-green-400" 
                        : "border-gray-300 dark:border-white/10 text-gray-400 group-hover:border-gray-500 dark:group-hover:border-white/30 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                  >
                    {isExpanded ? <Minus className="w-5 h-5 md:w-6 md:h-6" /> : <Plus className="w-5 h-5 md:w-6 md:h-6" />}
                  </motion.div>
                </div>
              </button>

              {/* Revealable Detailed Content Area */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="pb-12 pt-4 pl-0 md:pl-8 pr-4 md:pr-12">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 md:ml-[4.5rem]">
                        
                        {/* Left Content / Expanded Description & Minimal Links */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                          <p className={`text-base md:text-lg lg:text-xl leading-relaxed text-gray-600 dark:text-gray-400`}>
                            {project.description}
                          </p>
                          
                          {/* Demoted Source Code Link */}
                          {project.sourceCode && (
                            <div className="pt-2">
                              <a
                                href={project.sourceCode}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#385144] dark:hover:text-green-400 transition-colors uppercase tracking-[0.15em] ${monoFont}`}
                              >
                                <Code className="w-4 h-4" />
                                View Source Code
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Right Content / Prominent Tech Stack & Live Demo */}
                        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-8 lg:pt-0 pt-6 border-t border-gray-100 dark:border-white/5 lg:border-t-0">
                          <div className="w-full flex flex-col items-start lg:items-end gap-4">
                            <h4 className={`text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ${monoFont}`}>
                              Core Technologies
                            </h4>
                            {project.technologies && (
                              <div className="flex flex-wrap lg:justify-end gap-2.5">
                                {project.technologies.map((tech, i) => (
                                  <Badge 
                                    key={i} 
                                    variant="secondary" 
                                    className={`${monoFont} font-medium text-xs py-2 px-3.5 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200`}
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center justify-between w-full sm:w-80 lg:w-full gap-4 px-6 py-4 mt-auto rounded-xl border border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black text-sm font-bold transition-all shadow-xl hover:shadow-none"
                            >
                              <span className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Launch Live Demo
                              </span>
                              <span className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300">
                                →
                              </span>
                            </a>
                          )}
                        </div>
                        
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </BaseSection>
  );
};
