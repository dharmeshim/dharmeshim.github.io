import { useState } from "react";
import { BaseSection } from "../components/BaseSection";
import { siteConfig } from "../config/site";
import { ExternalLink, Code, Calendar, Sparkles, Files, ChevronRight, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "../lib/animations";
import { useInView } from "../hooks/useInView";
import { TextReveal } from "../components/TextReveal";
import { MinimalHeader } from "../components/MinimalHeader";

export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects.items[activeIndex];

  return (
    <BaseSection title={projects.title}>
      <div className="w-full" ref={ref}>
        <motion.div
          className="w-full flex flex-col"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <MinimalHeader 
            title={projects.title} 
            index="02" 
            subtitle="Selected Works" 
          />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[600px] w-full">
            {/* Left Sidebar: Project Navigator */}
          <div className="w-full lg:w-80 p-0 space-y-6 lg:space-y-10">
            <div className="flex items-center gap-3 mb-2 lg:mb-4">
              <Files className="w-4 h-4 text-blue-500 dark:text-green-400" />
              <h3 className={`${secondaryFont} text-[10px] lg:text-sm font-bold uppercase tracking-widest text-gray-400/60`}>Explorer</h3>
            </div>

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
              {projects.items.map((project, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      flex-shrink-0 flex items-center justify-between px-4 py-2 lg:py-3 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'bg-blue-500/10 dark:bg-green-400/10 border border-blue-500/20 dark:border-green-400/20 shadow-sm'
                        : 'hover:bg-gray-100 dark:hover:bg-white/5 opacity-60 hover:opacity-100'}
                    `}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <Hash className={`w-3 h-3 lg:w-4 h-4 ${isActive ? 'text-blue-500 dark:text-green-400' : 'text-gray-400'}`} />
                      <span className={`${primaryFont} text-xs lg:text-sm font-medium ${isActive ? primaryColor : 'text-gray-500'}`}>
                        {project.name}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div layoutId="activeArrow" className="hidden lg:block">
                        <ChevronRight className="w-4 h-4 text-blue-500 dark:text-green-400" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Project Workspace */}
          <div className="flex-1 p-0 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8 lg:space-y-12 h-full flex flex-col"
              >
                {/* Header Area */}
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-tighter text-gray-500">
                      Project {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    {activeProject.duration && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{activeProject.duration}</span>
                      </div>
                    )}
                  </div>

                  <h2 className={`${primaryFont} text-2xl md:text-4xl lg:text-5xl font-bold ${primaryColor} tracking-tight`}>
                    {activeProject.name}
                  </h2>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1">
                  <div className="lg:col-span-12 space-y-8 lg:space-y-12">
                    {/* Summary & Description */}
                    <div className="space-y-4 lg:space-y-6">
                      <div className="flex items-start gap-4 p-4 lg:p-6 rounded-2xl bg-blue-500/5 dark:bg-green-400/5 border border-blue-500/10 dark:border-green-400/10">
                        <Sparkles className="w-5 h-5 lg:w-6 h-6 text-blue-500 dark:text-green-400 flex-shrink-0 mt-1" />
                        <p className={`${primaryFont} text-base lg:text-xl leading-relaxed ${secondaryColor}`}>
                          {activeProject.summary}
                        </p>
                      </div>

                      {activeProject.description && (
                        <div className={`${primaryFont} text-sm lg:text-base leading-relaxed ${mutedColor} pl-4 border-l-2 border-gray-200 dark:border-gray-800`}>
                          {activeProject.description}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Chips (Fluid) */}
                    {activeProject.technologies && (
                      <div className="space-y-3 lg:space-y-4">
                        <h4 className={`${secondaryFont} text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-400`}>Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 text-[10px] md:text-xs font-mono font-medium hover:border-blue-500/30 dark:hover:border-green-400/30 transition-all shadow-sm"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Actions */}
                    <div className="flex flex-wrap gap-3 lg:gap-4 pt-4 lg:pt-8 mt-auto">
                      {activeProject.sourceCode && (
                        <motion.a
                          href={activeProject.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 lg:px-6 py-2.5 lg:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl lg:rounded-2xl text-sm lg:text-base font-bold flex items-center gap-2 lg:gap-3 transition-transform"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Code className="w-4 h-4 lg:w-5 h-5" />
                          <span>Source Code</span>
                        </motion.a>
                      )}
                      {activeProject.liveUrl && (
                        <motion.a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 lg:px-6 py-2.5 lg:py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-xl lg:rounded-2xl text-sm lg:text-base font-bold flex items-center gap-2 lg:gap-3 transition-transform"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4 lg:w-5 h-5" />
                          <span>View Live</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative background accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-500/5 dark:bg-green-400/5 rounded-full blur-[80px] lg:blur-[120px] pointer-events-none -z-10" />
              </motion.div>
            </AnimatePresence>
          </div>
          </div>
        </motion.div>

        {/* Floating Context Stats */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex gap-12 text-center items-center">
            <div>
              <div className={`${secondaryFont} text-3xl font-bold ${primaryColor}`}>{projects.items.length}</div>
              <div className={`${secondaryFont} text-[10px] font-bold uppercase tracking-wide text-gray-500`}>Total Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-800" />
            <div>
              <div className={`${secondaryFont} text-3xl font-bold ${primaryColor}`}>
                {Array.from(new Set(projects.items.flatMap(p => p.technologies || []))).length}
              </div>
              <div className={`${secondaryFont} text-[10px] font-bold uppercase tracking-wide text-gray-500`}>Technologies Used</div>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
