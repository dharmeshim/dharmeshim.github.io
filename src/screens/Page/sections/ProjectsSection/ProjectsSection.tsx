import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { ExternalLink, Code, Globe } from "lucide-react";

export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  return (
    <BaseSection title={projects.title}>
      <div className={`${itemGap}`}>
        <div className="space-y-20">
          {projects.items.map((project, index) => (
            <div 
              key={index} 
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
            >
              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-8">
                    <div className="space-y-2">
                      <h3 className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight group-hover:text-blue-500 dark:group-hover:text-green-400 ${normalTransition}`}>
                        {project.name}
                      </h3>
                      
                      {/* Project type indicator */}
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className={`${secondaryFont} text-base ${mutedColor}`}>
                          {project.url ? 'Web Application' : 'Software Project'}
                        </span>
                      </div>
                    </div>
                    
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 border border-gray-400 hover:border-blue-500 transition-all duration-300 hover:scale-110 rounded-lg dark:border-gray-600 dark:hover:border-green-400"
                        aria-label={`Visit ${project.name}`}
                      >
                        <ExternalLink className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </a>
                    )}
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
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech: string, i: number) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-mono border border-gray-300 hover:border-blue-500 transition-colors duration-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-green-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};