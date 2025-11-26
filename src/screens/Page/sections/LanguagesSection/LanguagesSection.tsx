import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";

export const LanguagesSection = (): JSX.Element => {
  const { languages } = siteConfig.sections;
  const { primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  return (
    <BaseSection title={languages.title}>
      <div className={`${itemGap}`}>
        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 justify-center md:justify-start">
          {languages.items.map((language: string, idx: number) => (
            <span
              key={idx}
              className="px-3 md:px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-xs md:text-sm font-mono text-gray-700 dark:text-gray-300"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};
