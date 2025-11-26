import React from "react";
import { siteConfig } from "../../config/site";

interface BaseSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showTitle?: boolean;
  variant?: "default" | "centered" | "minimal" | "fullscreen";
}

export const BaseSection: React.FC<BaseSectionProps> = ({
  children,
  className = "",
  title,
  showTitle = true,
  variant = "default"
}) => {
  const { sectionPadding, sectionMaxWidth, sectionGap, containerGap } = siteConfig.styles.spacing;
  const { primary: primaryFont, display: displayFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor } = siteConfig.styles.colors;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const getVariantClasses = () => {
    switch (variant) {
      case "centered":
        return "items-center text-center";
      case "minimal":
        return "justify-start py-20 md:py-24";
      case "fullscreen":
        return "justify-center min-h-screen";
      default:
        return "justify-center";
    }
  };

  const getTitleClasses = () => {
    switch (variant) {
      case "centered":
        return "text-center mx-auto max-w-6xl";
      case "minimal":
        return "text-left max-w-5xl";
      case "fullscreen":
        return "text-center mx-auto max-w-7xl";
      default:
        return "text-left max-w-6xl";
    }
  };

  const getContentWidth = () => {
    switch (variant) {
      case "centered":
        return "max-w-7xl";
      case "minimal":
        return "max-w-8xl";
      case "fullscreen":
        return "max-w-8xl";
      default:
        return "max-w-8xl";
    }
  };

  return (
    <section className={`relative w-full min-h-screen flex flex-col ${getVariantClasses()} py-24 md:py-32 lg:py-40 xl:py-48 ${className}`}>
      <div className={`w-full ${sectionMaxWidth} mx-auto ${sectionPadding}`}>
        <div className={`${variant === "minimal" ? containerGap : sectionGap}`}>
          {showTitle && title && (
            <div className={`w-full ${getTitleClasses()}`}>
              <h2 className={`${displayFont} font-light ${primaryColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-tight`}>
                {title}
              </h2>
              {variant !== "minimal" && (
                <div className="mt-6 w-40 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto opacity-40 dark:via-green-400" />
              )}
            </div>
          )}
          <div className={`w-full ${variant === "centered" ? "flex justify-center" : "flex justify-start"}`}>
            <div className={`w-full ${getContentWidth()}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 