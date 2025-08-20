
import React, { useState } from "react";
import { siteConfig } from "../../config/site";
import { scrollToSection, getSectionId } from "../../lib/navigation";
import { ChevronLeft, ChevronRight, ChevronDown, X, Moon, Sun, Menu } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

interface NavigationItem {
  label: string;
  isActive: boolean;
  href: string;
  progress?: number;
}

interface NavigationMenuProps {
  activeSection: string;
  progress: number[];
}

export const NavigationMenu = ({ activeSection, progress }: NavigationMenuProps): JSX.Element => {
  const { navigation, styles, layout } = siteConfig;
  const { position } = layout.navigation;
  const { primary: primaryFont } = styles.fonts;
  const { primary: primaryColor, border: borderColor, accent: accentColor } = styles.colors;
  const { normal: normalTransition } = styles.transitions;
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isSpreading, setIsSpreading] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileExpanded = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  const handleNavClick = (href: string) => {
    if (href === "#") return; // Dark Mode button
    scrollToSection(href);
  };

  const handleDarkModeToggle = () => {
    setIsSpreading(true);
    setTimeout(() => {
      toggleDarkMode();
      setIsSpreading(false);
    }, 300);
  };

  // Create navigation items in screen order (excluding Dark Mode)
  const screenNavItems = navigation.items.map((item) => ({
    ...item,
    isActive: getSectionId(item.href) === activeSection,
  }));

  // Desktop: Show first 6 items by default, rest can be expanded
  const desktopVisibleItems = screenNavItems.slice(0, 6);
  const desktopHiddenItems = screenNavItems.slice(6);

  return (
    <>
      {/* Color Spreading Overlay */}
      {isSpreading && (
        <div className="fixed inset-0 z-[70] pointer-events-none">
          <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500 rounded-full animate-ping dark:bg-green-400" />
          <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500 rounded-full animate-ping dark:bg-green-400" style={{ animationDelay: '0.1s' }} />
          <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500 rounded-full animate-ping dark:bg-green-400" style={{ animationDelay: '0.2s' }} />
        </div>
      )}

      <nav className={`fixed ${position.top} ${position.right} z-50 flex flex-row items-center p-0 m-0`}>
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center gap-x-2 lg:gap-x-3">
          {/* Toggle Button for hidden items */}
          <button
            onClick={toggleExpanded}
            className={`relative whitespace-nowrap ${primaryFont} text-xs lg:text-sm transition-all duration-400 ease-out p-2 border border-gray-300 hover:border-gray-400 rounded-lg ${
              isExpanded ? 'bg-gray-100' : 'bg-white'
            } ${primaryColor} dark:border-gray-600 dark:hover:border-gray-500 dark:bg-black dark:${isExpanded ? 'bg-gray-800' : 'bg-black'}`}
            aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          >
            <ChevronLeft className={`w-3 h-3 transition-transform duration-400 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {/* First 6 items always visible */}
          {desktopVisibleItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.href)}
              className={`relative whitespace-nowrap ${primaryFont} text-xs lg:text-sm transition-all duration-400 ease-out overflow-hidden rounded-lg
                ${item.isActive
                  ? "px-3 py-1.5 border-2 border-solid border-blue-500 font-light bg-gray-100 dark:border-green-400 dark:bg-gray-800"
                  : "font-light hover:opacity-80 px-3 py-1.5"
                } ${primaryColor}`}
            >
              {/* Progress fill for active item */}
              {item.isActive && (
                <span
                  className="absolute top-0 h-full z-0 transition-all duration-400 rounded-lg"
                  style={{
                    right: 0,
                    left: 'auto',
                    width: `${(progress[screenNavItems.findIndex(navItem => navItem.href === item.href)] ?? 0) * 100}%`,
                    background: isDarkMode 
                      ? 'linear-gradient(270deg, #374151 0%, #4b5563 100%)'
                      : 'linear-gradient(270deg, #e5e7eb 0%, #f3f4f6 100%)',
                    transition: 'width 0.4s, background 0.4s',
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {item.label}
              </span>
            </button>
          ))}

          {/* Hidden items that appear when expanded */}
          {isExpanded && (
            <div className="flex flex-row items-center gap-x-2 lg:gap-x-3 animate-in slide-in-from-right duration-400">
              {desktopHiddenItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative whitespace-nowrap ${primaryFont} text-xs lg:text-sm transition-all duration-400 ease-out overflow-hidden rounded-lg
                    ${item.isActive
                      ? "px-3 py-1.5 border-2 border-solid border-blue-500 font-light bg-gray-100 dark:border-green-400 dark:bg-gray-800"
                      : "font-light hover:opacity-80 px-3 py-1.5"
                    } ${primaryColor} cursor-pointer`}
                >
                  {/* Progress fill for active item */}
                  {item.isActive && (
                    <span
                      className="absolute top-0 h-full z-0 transition-all duration-400 rounded-lg"
                      style={{
                        right: 0,
                        left: 'auto',
                        width: `${(progress[screenNavItems.findIndex(navItem => navItem.href === item.href)] ?? 0) * 100}%`,
                        background: isDarkMode 
                          ? 'linear-gradient(270deg, #374151 0%, #4b5563 100%)'
                          : 'linear-gradient(270deg, #e5e7eb 0%, #f3f4f6 100%)',
                        transition: 'width 0.4s, background 0.4s',
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Dark Mode Button - Always visible and last on desktop */}
          <button
            onClick={handleDarkModeToggle}
            className={`relative p-2 border-2 border-solid font-light cursor-pointer transition-all duration-400 rounded-full
              ${isDarkMode 
                ? 'border-white bg-white text-black hover:bg-gray-100' 
                : 'border-blue-500 bg-blue-500 text-white hover:bg-blue-400'
              }`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileExpanded}
            className={`relative whitespace-nowrap ${primaryFont} text-xs transition-all duration-400 ease-out p-2 border border-gray-300 hover:border-gray-400 rounded-lg ${
              isMobileExpanded ? 'bg-gray-100' : 'bg-white'
            } ${primaryColor} dark:border-gray-600 dark:hover:border-gray-500 dark:bg-black dark:${isMobileExpanded ? 'bg-gray-800' : 'bg-black'}`}
            aria-label={isMobileExpanded ? "Close menu" : "Open menu"}
          >
            <Menu className={`w-3 h-3 transition-transform duration-400 ${isMobileExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      {isMobileExpanded && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm">
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={toggleMobileExpanded}
              className="absolute top-8 right-8 p-3 border border-gray-300 bg-white hover:bg-gray-100 transition-all duration-400 rounded-lg dark:border-gray-600 dark:bg-black dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-blue-500 dark:text-green-400" />
            </button>

            {/* Navigation Items */}
            <div className="flex flex-col items-center space-y-12 text-center px-8">
              {screenNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleNavClick(item.href);
                    setIsMobileExpanded(false);
                  }}
                  className={`${primaryFont} text-2xl md:text-3xl transition-all duration-400 ease-in-out flex items-center gap-3 rounded-lg px-6 py-3 ${
                    item.isActive
                      ? "text-blue-500 font-light dark:text-green-400 bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Dark Mode Button - Separated in mobile */}
            <div className="mt-16">
              <button
                onClick={() => {
                  handleDarkModeToggle();
                  setIsMobileExpanded(false);
                }}
                className={`p-6 border-2 border-solid font-light transition-all duration-400 rounded-full
                  ${isDarkMode 
                    ? 'border-white bg-white text-black' 
                    : 'border-blue-500 bg-blue-500 text-white'
                  }`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};