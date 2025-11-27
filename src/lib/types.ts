// Profile data types
export interface Experience {
    company: string;
    role: string;
    description: string;
    location: string;
    duration: string;
}

export interface Project {
    name: string;
    description: string;
    duration: string;
    sourceCode?: string;
    liveUrl?: string;
    technologies: string[];
}

export interface Education {
    institution: string;
    description: string;
    location: string;
    duration: string;
}

export interface Certification {
    name: string;
    issuer: string;
    link: string;
    year: string;
}

export interface TechStack {
    name: string;
    type: string;
    proficiency?: string; // Now optional since it was removed from Profile.json
}

export interface Knowledge {
    name: string;
    description: string;
    type: string;
    keySkills: string[];
}

export interface Publication {
    title: string;
    description: string;
    link: string;
}

export interface SocialLink {
    name: string;
    profile?: string;
    link: string;
}

// Component prop types
export interface SectionProps {
    title: string;
    showTitle?: boolean;
    variant?: 'default' | 'fullscreen';
    children: React.ReactNode;
}

export interface MetadataItemProps {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
    className?: string;
    mono?: boolean;
}

export interface TimelineItemProps {
    index: number;
    inView: boolean;
    children: React.ReactNode;
    className?: string;
}

export interface AnimatedCardProps {
    children: React.ReactNode;
    variant?: 'default' | 'gradient' | 'glass';
    hoverEffect?: boolean;
    className?: string;
}
