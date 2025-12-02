import { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { ChevronRight, ChevronDown, ExternalLink, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <BaseSection title={projects.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          className="space-y-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {projects.items.map((project, index) => {
            const isExpanded = expandedProject === index;
            const projectNumber = String(index + 1).padStart(2, '0');
            const hasDescription = project.description && project.summary;

            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative"
              >
                {/* Clickable area */}
                <div
                  onClick={() => hasDescription && toggleProject(index)}
                  className={`
                    flex items-start gap-8 py-10 
                    border-b border-gray-200/30 dark:border-gray-800/30
                    ${hasDescription ? 'cursor-pointer' : ''}
                    transition-all duration-200
                  `}
                >
                  {/* Left side: Number with accent line */}
                  <div className="flex items-start gap-4 min-w-[4rem]">
                    {/* Vertical accent line */}
                    <div className="relative pt-2">
                      <div className={`
                        w-0.5 h-6 transition-all duration-300
                        ${isExpanded
                          ? 'bg-blue-500 dark:bg-green-400'
                          : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-400 dark:group-hover:bg-green-500'
                        }
                      `} />
                    </div>

                    {/* Project number */}
                    <div className={`
                      ${secondaryFont} font-mono text-base
                      ${isExpanded
                        ? 'text-blue-500 dark:text-green-400'
                        : `${mutedColor} group-hover:text-blue-500 dark:group-hover:text-green-400`
                      }
                      transition-colors duration-200 pt-1
                    `}>
                      {projectNumber}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-5">
                    {/* Title and summary */}
                    <div className="space-y-2">
                      <h3 className={`
                        ${primaryFont} font-light ${primaryColor} 
                        text-2xl md:text-3xl tracking-tight
                        transition-colors duration-200
                        ${hasDescription ? 'group-hover:text-blue-500 dark:group-hover:text-green-400' : ''}
                      `}>
                        {project.name}
                      </h3>
                      <p className={`${secondaryFont} text-base ${secondaryColor} leading-relaxed`}>
                        {project.summary}
                        <span className={`${mutedColor} mx-2`}>•</span>
                        <span className={`${secondaryFont} font-mono text-sm ${mutedColor}`}>
                          {project.duration}
                        </span>
                      </p>
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className={`
                              ${secondaryFont} font-mono text-xs ${mutedColor}
                              px-3 py-1.5 
                              bg-gray-50 dark:bg-gray-900/50
                              border border-gray-200/50 dark:border-gray-800/50
                              rounded-md
                              transition-colors duration-200
                              group-hover:border-gray-300 dark:group-hover:border-gray-700
                            `}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-6 text-sm">
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          className={`
                            flex items-center gap-2 ${mutedColor}
                            hover:text-blue-500 dark:hover:text-green-400
                            transition-colors duration-200
                          `}
                        >
                          <Code className="w-4 h-4" />
                          <span className="font-mono">source</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          className={`
                            flex items-center gap-2 ${mutedColor}
                            hover:text-blue-500 dark:hover:text-green-400
                            transition-colors duration-200
                          `}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-mono">live</span>
                        </a>
                      )}
                    </div>

                    {/* Expandable description */}
                    {hasDescription && (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className={`
                              ${secondaryFont} text-sm ${secondaryColor} leading-relaxed
                              pl-6 border-l-2 border-blue-500/30 dark:border-green-400/30
                            `}>
                              {project.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Chevron indicator */}
                  {hasDescription && (
                    <div className={`
                      pt-1 transition-all duration-200
                      ${isExpanded
                        ? 'text-blue-500 dark:text-green-400'
                        : `${mutedColor} group-hover:text-blue-500 dark:group-hover:text-green-400`
                      }
                    `}>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer info */}
        <div className={`mt-12 text-center ${secondaryFont} text-sm ${mutedColor}`}>
          <p className="font-mono">
            {projects.items.length} {projects.items.length === 1 ? 'project' : 'projects'}
            <span className="mx-2">•</span>
            click to expand details
          </p>
        </div>
      </div>
    </BaseSection>
  );
};