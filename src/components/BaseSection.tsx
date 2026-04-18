import React from "react";
import { siteConfig } from "../config/site";

interface BaseSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showTitle?: boolean;
  variant?: "default" | "centered" | "minimal" | "fullscreen" | "fluid";
}

export const BaseSection: React.FC<BaseSectionProps> = ({
  children,
  className = "",
  variant = "default"
}) => {
  const { sectionPadding, sectionMaxWidth, sectionGap, containerGap, containerMaxWidth } = siteConfig.styles.spacing;

  const getVariantClasses = () => {
    switch (variant) {
      case "centered":
        return "items-center text-center";
      case "minimal":
        return "justify-start py-20 md:py-24";
      case "fullscreen":
        return "justify-center min-h-screen";
      case "fluid":
        return "justify-start min-h-screen w-full"; // Added fluid logic
      default:
        return "justify-center";
    }
  };


  const getContentWidth = () => {
    return variant === "fluid" ? "w-full max-w-none px-4 md:px-8" : containerMaxWidth;
  };

  const verticalPadding = variant === "fullscreen" ? "py-0" : "py-16 md:py-24 lg:py-32";

  return (
    <section className={`relative w-full min-h-screen flex flex-col ${getVariantClasses()} ${verticalPadding} ${className}`}>
      <div className={`w-full ${sectionMaxWidth} mx-auto ${sectionPadding}`}>
        <div className={`${variant === "minimal" ? containerGap : sectionGap}`}>
          {/* Unified header removed favoring individual awwwards-style headers per section */}
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