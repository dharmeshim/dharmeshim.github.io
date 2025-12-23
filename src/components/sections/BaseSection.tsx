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
  const { sectionPadding, sectionMaxWidth, sectionGap, containerGap, containerMaxWidth } = siteConfig.styles.spacing;
  const { display: displayFont } = siteConfig.styles.fonts;

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
        return `text-center mx-auto ${containerMaxWidth}`;
      case "minimal":
        return `text-left ${containerMaxWidth}`;
      case "fullscreen":
        return `text-center mx-auto ${containerMaxWidth}`;
      default:
        return `text-left ${containerMaxWidth}`;
    }
  };

  const getContentWidth = () => {
    return containerMaxWidth;
  };

  const verticalPadding = variant === "fullscreen" ? "py-0" : "py-16 md:py-24 lg:py-32";

  return (
    <section className={`relative w-full min-h-screen flex flex-col ${getVariantClasses()} ${verticalPadding} ${className}`}>
      <div className={`w-full ${sectionMaxWidth} mx-auto ${sectionPadding}`}>
        <div className={`${variant === "minimal" ? containerGap : sectionGap}`}>
          {showTitle && title && (
            <div className={`w-full ${getTitleClasses()} mb-8 group`}>
              {/* Unified Window Header / Title Bar */}
              <div className="flex items-center gap-3 md:gap-4 bg-white/90 dark:bg-neutral-900/50 backdrop-blur-md rounded-xl px-3 md:px-5 py-3 md:py-4 border border-gray-200 dark:border-green-400/20 shadow-sm transition-all duration-300 group-hover:shadow-md dark:group-hover:border-green-400/40">
                {/* OS Dots */}
                <div className="flex gap-2 px-1">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
                </div>

                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block" />

                {/* Main Title as Breadcrumb / File Path */}
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="hidden sm:inline font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest opacity-50">
                    ~/portfolio/
                  </span>
                  <h2 className={`${displayFont} text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-green-400 dark:to-emerald-300 tracking-tighter leading-none flex items-center gap-1`}>
                    {title.toLowerCase().replace(/\s+/g, '-')}
                    <span className="w-1.5 h-6 md:h-8 bg-blue-500 dark:bg-green-400 animate-[pulse_1s_infinite] ml-1 opacity-50" />
                  </h2>
                </div>

                {/* Window Meta (Filling space) */}
                <div className="ml-auto hidden lg:flex items-center gap-4 font-mono text-[9px] text-gray-400/50 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2 brightness-110">
                    <span className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/30 animate-pulse" />
                    <span>Active</span>
                  </div>
                  <div className="w-px h-3 bg-gray-200 dark:bg-gray-800" />
                  <span>UTF-8</span>
                  <div className="w-px h-3 bg-gray-200 dark:bg-gray-800" />
                  <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
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