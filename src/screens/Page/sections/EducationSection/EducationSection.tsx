import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, MapPin, GraduationCap } from "lucide-react";

export const EducationSection = (): JSX.Element => {
  const { education } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  return (
    <BaseSection title={education.title}>
      <div className={`${itemGap}`}>
        <div className="space-y-20">
          {education.items.map((entry, index) => (
            <div 
              key={index} 
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
            >
              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="space-y-3">
                      <h3 className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight`}>
                        {entry.institution}
                      </h3>
                      {entry.description && (
                        <p className={`${secondaryFont} font-medium ${accentColor} text-base md:text-lg`}>
                          {entry.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                  {entry.duration && (
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{entry.duration}</span>
                    </div>
                  )}
                  
                  {entry.location && (
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{entry.location}</span>
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