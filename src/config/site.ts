import profile from "./Profile.json";

export const siteConfig = {
  name: profile.name,
  description: profile.description,
  navigation: {
    items: [
      { label: "Home", href: "#home" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Education", href: "#education" },
      { label: "Knowledge", href: "#knowledge" },
      { label: "Tech Stack", href: "#techStack" },
      { label: "Certifications", href: "#certifications" },
      { label: "Contact", href: "#contact" },
    ],
  },
  sections: {
    home: {
      id: "home",
      title: "Introduction",
      typewriterTexts: profile.about,
      scrollButton: {
        label: "Scroll down",
        targetSection: "experience",
      },
    },
    experience: {
      id: "experience",
      title: "Professional Journey",
      items: profile.experience,
    },
    projects: {
      id: "projects",
      title: "Things I Built",
      items: profile.projects,
    },
    education: {
      id: "education",
      title: "Academics",
      items: profile.education,
    },
    knowledge: {
      id: "knowledge",
      title: "Knowledge",
      items: profile.knowledge,
    },
    techStack: {
      id: "techStack",
      title: "Tech Stack",
      items: profile.techStack,
    },
    certifications: {
      id: "certifications",
      title: "Certifications",
      items: profile.certifications,
    },
    contact: {
      id: "contact",
      title: "Let's Connect",
      socialLinks: profile.contact.socialLinks,
      resume: profile.resume,
    },
  },
  layout: {
    logo: {
      scrolledPosition: { top: "top-6", left: "left-8" },
      centeredPosition: { top: "top-1/3", left: "left-1/2" },
      scrolledSize: "2.5rem",
      centeredSize: "12rem",
    },
    scrollButton: {
      position: { bottom: "bottom-12", left: "left-1/2" },
      size: "h-14 w-14",
    },
    navigation: {
      position: { top: "top-8", right: "right-8" },
    },
    sectionCounter: {
      position: { top: "top-1/3", left: "left-8" },
    },
  },
  styles: {
    fonts: {
      primary: "font-['JetBrains_Mono',monospace]",
      secondary: "font-['JetBrains_Mono',monospace]",
      display: "font-['JetBrains_Mono',monospace]",
    },
    colors: {
      // Light mode: Clean, light theme
      // Dark mode: Black and green terminal theme
      primary: "text-gray-800 dark:text-green-400",
      secondary: "text-gray-600 dark:text-gray-300",
      muted: "text-gray-500 dark:text-gray-500",
      background: "bg-gray-50 dark:bg-black",
      surface: "bg-white dark:bg-gray-900",
      border: "border-gray-200 dark:border-gray-600",
      accent: "text-blue-600 dark:text-cyan-400",
      hover: "hover:bg-gray-100 dark:hover:bg-gray-800",
      focus: "focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      error: "text-red-600 dark:text-red-400",
    },
    spacing: {
      sectionPadding: "px-12 sm:px-16 md:px-20 lg:px-24 xl:px-32",
      sectionMaxWidth: "max-w-none",
      sectionGap: "space-y-16 md:space-y-20 lg:space-y-24",
      itemGap: "space-y-12 md:space-y-16",
      containerGap: "space-y-16 md:space-y-20",
    },
    shadows: {
      none: "shadow-none",
    },
    transitions: {
      fast: "transition-all duration-200 ease-out",
      normal: "transition-all duration-400 ease-out",
      slow: "transition-all duration-600 ease-out",
      bounce: "transition-all duration-300 cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig; 