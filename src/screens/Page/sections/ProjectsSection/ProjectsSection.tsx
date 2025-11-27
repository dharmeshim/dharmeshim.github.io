import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { ExternalLink, Code, Globe } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <BaseSection title={projects.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          className="space-y-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {projects.items.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
              variants={staggerItem}
              whileHover={{ x: 4 }}
            >
              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-8">
                    <div className="space-y-2">
                      <motion.h3
                        className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight group-hover:text-blue-500 dark:group-hover:text-green-400 ${normalTransition}`}
                        whileHover={{ x: 4 }}
                      >
                        {project.name}
                      </motion.h3>

                      {/* Project type indicator */}
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className={`${secondaryFont} text-base ${mutedColor}`}>
                          {project.liveUrl ? 'Web Application' : 'Software Project'}
                        </span>
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-3">
                      {project.sourceCode && (
                        <motion.a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border border-gray-400 hover:border-blue-500 transition-all duration-300 rounded-lg dark:border-gray-600 dark:hover:border-green-400"
                          aria-label={`View ${project.name} source code`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Code className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border border-gray-400 hover:border-blue-500 transition-all duration-300 rounded-lg dark:border-gray-600 dark:hover:border-green-400"
                          aria-label={`Visit ${project.name}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {project.description && (
                  <div className={`${primaryFont} font-light ${secondaryColor} text-base md:text-lg leading-relaxed max-w-6xl`}>
                    {project.description}
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`${secondaryFont} font-medium ${mutedColor} text-base uppercase tracking-wider`}>
                      Technologies Used
                    </h4>
                    <motion.div
                      className="flex flex-wrap gap-3"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {project.technologies.map((tech: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="font-mono hover:border-blue-500 dark:hover:border-green-400 cursor-default"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </BaseSection>
  );
};