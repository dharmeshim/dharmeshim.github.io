import { useEffect, useState, useRef } from "react";

export const useStickyHeader = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const headerOffset = 80; // 60px from top + some padding

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Find which section is currently in view
      let activeSection = "home";
      let maxIntersection = 0;
      
      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionHeight = rect.height;
          
          // Calculate intersection with viewport
          const viewportHeight = window.innerHeight;
          const intersection = Math.min(
            Math.max(0, (viewportHeight - rect.top) / viewportHeight),
            Math.max(0, (rect.bottom) / viewportHeight)
          );
          
          if (intersection > maxIntersection) {
            maxIntersection = intersection;
            activeSection = section.id;
          }
        }
      });
      
      setCurrentSection(activeSection);
      
      // Show header when not on home section and scrolled past threshold
      const shouldShowHeader = activeSection !== "home" && scrollY > headerOffset;
      setIsHeaderVisible(shouldShowHeader);
    };

    // Initialize sections
    sectionsRef.current = [
      document.getElementById("home"),
      document.getElementById("experience"),
      document.getElementById("projects"),
      document.getElementById("education"),
      document.getElementById("skills"),
      document.getElementById("contact"),
    ].filter(Boolean) as HTMLElement[];

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    currentSection,
    isHeaderVisible,
  };
}; 