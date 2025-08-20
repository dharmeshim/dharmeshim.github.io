import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";

export const PublicationsSection = (): JSX.Element => {
  const { publications } = siteConfig.sections;
  const { primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  return (
    <BaseSection title={publications.title}>
      <div className={`${itemGap}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {publications.items.map((publication, index) => (
            <Card
              key={index}
              className="border-none shadow-none bg-transparent p-0"
            >
              <CardContent className="p-0 space-y-2 md:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 md:gap-2">
                  <span className={`${primaryFont} font-bold ${primaryColor} text-xl md:text-2xl tracking-tight`}>
                    {publication.title}
                  </span>
                  {publication.year && (
                    <span className="text-sm md:text-base font-mono text-gray-500 dark:text-gray-400">
                      {publication.year}
                    </span>
                  )}
                </div>
                {publication.journal && (
                  <div className={`${primaryFont} font-medium ${secondaryColor} text-base md:text-lg`}>
                    {publication.journal}
                  </div>
                )}
                {publication.link && (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm md:text-base text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                  >
                    Read Publication
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};
