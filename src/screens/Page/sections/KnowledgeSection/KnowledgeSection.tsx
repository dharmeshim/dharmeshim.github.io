import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Lightbulb, BookOpen } from "lucide-react";

export const KnowledgeSection = (): JSX.Element => {
  const { knowledge } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  return (
    <BaseSection title={knowledge.title}>
      <div className={`${itemGap}`}>
        <div className="space-y-16">
          {knowledge.items.map((item: any, index: number) => (
            <div 
              key={index} 
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
            >
              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {/* <div className="flex-shrink-0 mt-2">
                      <Lightbulb className="w-6 h-6 text-blue-500 dark:text-green-400" />
                    </div> */}
                    <div className="space-y-3">
                      <h3 className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight`}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className={`${secondaryFont} font-light ${secondaryColor} text-base md:text-lg leading-relaxed max-w-4xl`}>
                          {item.description}
                        </p>
                      )}
                    </div>
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
