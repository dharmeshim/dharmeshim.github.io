import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, MapPin, Building2 } from "lucide-react";

export const ExperienceSection = (): JSX.Element => {
  const { experience } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  return (
    <BaseSection title={experience.title}>
      <div className={`${itemGap}`}>
        <div className="space-y-24">
          {experience.items.map((exp, index) => (
            <div 
              key={index} 
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
            >
              {/* Timeline dot - only for experience to show active work */}
              <div className="absolute left-0 top-0 w-5 h-5 bg-gray-400 rounded-full border-4 border-white group-hover:bg-blue-500 transition-all duration-500 transform -translate-x-2.5 dark:bg-gray-600 dark:border-black dark:group-hover:bg-green-400" />
              
              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="space-y-3">
                      <h3 className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight`}>
                        {exp.company}
                      </h3>
                      {exp.role && (
                        <p className={`${secondaryFont} font-medium ${accentColor} text-base md:text-lg`}>
                          {exp.role}
                        </p>
                      )}
                      {/* Working presently indicator for current job */}
                      {/* {exp.duration && exp.duration.includes("Present") && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full dark:bg-green-900 dark:text-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Working Presently
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {exp.description && (
                  <div className={`${primaryFont} font-light ${secondaryColor} text-base md:text-lg leading-relaxed max-w-5xl`}>
                    {exp.description}
                  </div>
                )}

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                  {exp.duration && (
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{exp.duration}</span>
                    </div>
                  )}
                  
                  {exp.location && (
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};