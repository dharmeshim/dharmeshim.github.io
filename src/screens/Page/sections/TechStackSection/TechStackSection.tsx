import React, { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Code, Star, Zap } from "lucide-react";

export const TechStackSection = (): JSX.Element => {
  const { techStack } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  // Sort by proficiency to get top skills first
  const sortedTechStack = [...techStack.items].sort((a, b) => parseInt(b.proficiency) - parseInt(a.proficiency));
  const topSkills = sortedTechStack.slice(0, 3);
  const otherSkills = sortedTechStack.slice(3);

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <BaseSection title={techStack.title}>
      <div className={`${itemGap}`}>
        {/* Top 3 Skills - Prominently Displayed */}
        <div className="space-y-8 mb-16">
          {/* <div className="text-center mb-16">
            <h3 className={`${secondaryFont} text-lg font-medium ${mutedColor} uppercase tracking-wider mb-4`}>
              Top Skills
            </h3>
            <div className="w-24 h-1 bg-blue-500 dark:bg-green-400 mx-auto rounded-full"></div>
          </div> */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {topSkills.map((tech: any, index: number) => (
              <div 
                key={index}
                className={`group relative p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-green-400 transition-all duration-500 hover:scale-105 ${normalTransition}`}
              >
                {/* Icon */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-blue-500 dark:text-green-400" />
                  </div>
                </div>

                {/* Skill Name */}
                <h4 className={`${primaryFont} font-light ${primaryColor} text-xl md:text-2xl text-center mb-3 tracking-tight`}>
                  {tech.name}
                </h4>

                {/* Proficiency */}
                {/* <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className={`${secondaryFont} font-medium ${accentColor} text-base`}>
                      {tech.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full dark:bg-gray-700 overflow-hidden">
                    <div 
                      className="h-2 transition-all duration-1000 rounded-full bg-blue-500 dark:bg-green-400"
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Other Skills - Modern Grid */}
        {otherSkills.length > 0 && (
          <div className="space-y-8">
            {/* <div className="text-center mb-16">
              <h3 className={`${secondaryFont} text-lg font-medium ${mutedColor} uppercase tracking-wider mb-4`}>
                More Skills
              </h3>
              <div className="w-24 h-1 bg-blue-500 dark:bg-green-400 mx-auto rounded-full"></div>
            </div> */}
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {otherSkills.map((tech: any, index: number) => (
                <div
                  key={index}
                  className={`group relative p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-green-400 transition-all duration-300 hover:scale-105 cursor-pointer ${normalTransition}`}
                  onMouseEnter={() => setHoveredSkill(tech.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Skill Icon */}
                  <div className="text-center mb-2">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-green-900 transition-colors duration-300">
                      <Code className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-green-400" />
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h5 className={`${primaryFont} font-medium ${primaryColor} text-xs text-center mb-1 tracking-tight`}>
                    {tech.name}
                  </h5>

                  {/* Proficiency
                  <div className="text-center">
                    <span className={`${secondaryFont} text-xs ${mutedColor} font-mono`}>
                      {tech.proficiency}%
                    </span>
                  </div> */}

                  {/* Hover Effect - Skill Details */}
                  {hoveredSkill === tech.name && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span>Proficiency: {tech.proficiency}%</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseSection>
  );
};
