import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Award, ExternalLink, Code } from "lucide-react";

export const SkillsSection = (): JSX.Element => {
  const { skills } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  return (
    <BaseSection title={skills.title}>
      <div className={`${itemGap}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-24">
          {skills.items.map((skill: any, idx: number) => (
            <div 
              key={idx} 
              className={`group relative border-l-2 border-gray-300 pl-10 md:pl-14 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
            >
              {/* Skill dot */}
              <div className="absolute left-0 top-0 w-5 h-5 bg-gray-400 rounded-full border-4 border-white group-hover:bg-blue-500 transition-all duration-500 transform -translate-x-2.5 dark:bg-gray-600 dark:border-black dark:group-hover:bg-green-400" />
              
              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <h3 className={`${primaryFont} font-light ${primaryColor} text-xl md:text-2xl lg:text-3xl tracking-tight group-hover:text-blue-500 dark:group-hover:text-green-400 ${normalTransition}`}>
                    {skill.name}
                  </h3>
                  
                  {skill.certification && (
                    <div className="space-y-3">
                      <p className={`${secondaryFont} font-medium ${accentColor} text-base`}>
                        {skill.certification.name}
                      </p>
                      
                      <a
                        href={skill.certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm ${mutedColor} hover:text-blue-500 dark:hover:text-green-400 ${normalTransition} group/link`}
                      >
                        <span>View Certification</span>
                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Skill level indicator */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Proficiency</span>
                    <span>{skill.certification ? 'Certified' : 'Experienced'}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full dark:bg-gray-700">
                    <div 
                      className={`h-1 transition-all duration-700 rounded-full ${
                        skill.certification 
                          ? 'bg-blue-500 dark:bg-green-400' 
                          : 'bg-gray-400 dark:bg-gray-500'
                      }`}
                      style={{ 
                        width: skill.certification ? '100%' : '85%' 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};