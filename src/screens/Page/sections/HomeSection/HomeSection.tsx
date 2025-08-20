import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { TypewriterText } from "../../../../components/ui/TypewriterText";
import { siteConfig } from "../../../../config/site";

export const HomeSection = (): JSX.Element => {
  const { home } = siteConfig.sections;
  const { secondary: secondaryFont, primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, accent: accentColor, success: successColor, warning: warningColor } = siteConfig.styles.colors;

  return (
    <BaseSection title={home.title} showTitle={false} variant="fullscreen">
      <div className="flex flex-col items-start justify-center min-h-screen w-full space-y-24">
        {/* Main heading with typewriter effect */}
        <div className="text-left space-y-16 max-w-7xl">
          <h1 className={`${secondaryFont} font-extralight ${primaryColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-tight`}>
            <TypewriterText 
              texts={home.typewriterTexts}
              speed={80}
              delay={800}
              className="text-left"
            />
          </h1>
        </div>

        {/* Fun terminal-style elements with theme-appropriate colors */}
        <div className="absolute bottom-20 left-8 text-xs text-gray-500 font-mono opacity-40 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500 dark:text-green-400">$</span>
            <span>whoami</span>
          </div>
        </div>

        <div className="absolute bottom-20 right-8 text-xs text-gray-500 font-mono opacity-40 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500 dark:text-green-400">$</span>
            <span>ls -la</span>
          </div>
        </div>
      </div>
    </BaseSection>
  );
};