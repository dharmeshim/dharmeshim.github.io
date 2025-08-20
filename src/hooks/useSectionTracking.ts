import { useEffect, useState, useRef, useCallback } from "react";
import { siteConfig } from "../config/site";

export const useSectionTracking = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<number[]>([]);

  // Get sections dynamically from siteConfig
  const sections = useRef(Object.keys(siteConfig.sections));
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    let maxRatio = 0;
    let activeId = sections.current[0];
    const progressMap: Record<string, number> = {};
    
    entries.forEach(entry => {
      const id = entry.target.id;
      progressMap[id] = entry.intersectionRatio;
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        activeId = id;
      }
    });
    
    setActiveSection(activeId);
    setCurrentSectionIndex(sections.current.indexOf(activeId));
    const activeIdx = sections.current.indexOf(activeId);
    const progressArr = sections.current.map((id, idx) => (idx === activeIdx ? (progressMap[id] || 0) : 0));
    setSectionProgress(progressArr);
  }, []);

  useEffect(() => {
    // Initialize sectionProgress with correct length
    setSectionProgress(new Array(sections.current.length).fill(0));
    
    sectionRefs.current = sections.current.map(id => document.getElementById(id));
    
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0, 0.01, ..., 1
    };
    
    observerRef.current = new window.IntersectionObserver(handleIntersect, observerOptions);
    
    sectionRefs.current.forEach(section => {
      if (section) observerRef.current?.observe(section);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect]);

  return {
    activeSection,
    currentSectionIndex,
    sectionProgress,
    sections: sections.current,
  };
}; 