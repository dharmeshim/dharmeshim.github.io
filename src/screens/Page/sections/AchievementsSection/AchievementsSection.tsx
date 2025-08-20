import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";

export const AchievementsSection = (): JSX.Element => {
  const { achievements } = siteConfig.sections;
  const { primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  return (
    <BaseSection title={achievements.title}>
      <div className={`${itemGap}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {achievements.items.map((achievement, index) => (
            <Card
              key={index}
              className="border-none shadow-none bg-transparent p-0"
            >
              <CardContent className="p-0 space-y-2 md:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 md:gap-2">
                  <span className={`${primaryFont} font-bold ${primaryColor} text-xl md:text-2xl tracking-tight`}>
                    {achievement.title}
                  </span>
                  {achievement.year && (
                    <span className="text-sm md:text-base font-mono text-gray-500">
                      {achievement.year}
                    </span>
                  )}
                </div>
                {achievement.awardedBy && (
                  <div className={`${primaryFont} font-medium ${primaryColor} text-base md:text-lg opacity-70`}>
                    {achievement.awardedBy}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};
