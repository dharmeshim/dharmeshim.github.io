import profile from "./Profile.json";

export const siteConfig = {
  name: profile.name,
  description: profile.description,

  /* -----------------------------
   * Navigation
   * ----------------------------- */
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

  /* -----------------------------
   * Sections
   * ----------------------------- */
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

  /* -----------------------------
   * Layout
   * ----------------------------- */
  layout: {
    navigation: {
      position: { top: "top-8", right: "right-8" },
    },
    scrollButton: {
      position: { bottom: "bottom-12", left: "left-1/2" },
      size: "h-14 w-14",
    },
  },

  /* -----------------------------
   * Styles (Design System Tokens)
   * ----------------------------- */
  styles: {
    /* Fonts */
    fonts: {
      primary: "font-['Space_Grotesk',system-ui,sans-serif]",
      secondary: "font-['JetBrains_Mono',monospace]",
      display: "font-['Space_Grotesk',system-ui,sans-serif]",
    },

    /* Colors */
    colors: {
      primary: "text-[#B7E5BA] dark:text-green-400",
      secondary: "text-gray-700 dark:text-gray-300",
      muted: "text-gray-500 dark:text-gray-500",

      background: "bg-[#f8f5f2] dark:bg-black",
      surface: "bg-white dark:bg-neutral-900/80",

      border: "border-gray-200 dark:border-green-400/20",

      accent: "text-[#B7E5BA] dark:text-green-400",
      accentBg: "bg-[#B7E5BA] dark:bg-green-400",
      accentSoft: "bg-[#B7E5BA]/5 dark:bg-green-400/5",
      accentSoftHover: "hover:bg-[#B7E5BA]/10 dark:hover:bg-green-400/10",
      accentBorder: "border-[#B7E5BA]/10 dark:border-green-400/10",
      accentBorderHover: "hover:border-[#B7E5BA]/30 dark:hover:border-green-400/30",
      accentBorderFull: "border-[#B7E5BA] dark:border-green-400",

      hover: "hover:bg-gray-100 dark:hover:bg-white/5",
      focus: "focus:ring-2 focus:ring-[#B7E5BA] dark:focus:ring-green-400",

      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      error: "text-red-600 dark:text-red-400",
    },

    /* Spacing */
    spacing: {
      sectionPadding: "px-6 sm:px-12 md:px-16 lg:px-24",
      containerMaxWidth: "max-w-7xl",
      sectionMaxWidth: "max-w-none",
      sectionGap: "space-y-16 md:space-y-20 lg:space-y-24",
      itemGap: "space-y-12 md:space-y-16",
      containerGap: "space-y-16 md:space-y-20",
    },

    /* Shadows */
    shadows: {
      soft: "shadow-sm dark:shadow-[0_0_0_1px_rgba(34,197,94,0.15)]",
      medium: "shadow-md dark:shadow-[0_8px_32px_rgba(34,197,94,0.15)]",
    },

    /* Motion */
    transitions: {
      fast: "transition-all duration-150 ease-out",
      normal: "transition-all duration-300 ease-out",
      slow: "transition-all duration-500 ease-out",

      playful:
        "transition-all duration-400 cubic-bezier(0.34,1.56,0.64,1)",

      ambient:
        "transition-transform duration-[1200ms] ease-in-out",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
