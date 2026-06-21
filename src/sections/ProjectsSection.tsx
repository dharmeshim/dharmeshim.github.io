import { useState, useEffect } from "react";
import { siteConfig } from "../config/site";
import { Badge } from "../components/ui/badge";
import { 
  ExternalLink, 
  Code, 
  RefreshCw, 
  Mail, 
  Linkedin, 
  Twitter, 
  Copy, 
  ChevronRight,
  Info,
  Github
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";
import { BaseSection } from "../components/BaseSection";

// Import project widgets
import { StudentDatabaseWidget } from "../components/widgets/StudentDatabaseWidget";
import { TrieSearchWidget } from "../components/widgets/TrieSearchWidget";
import { MathRiddleWidget } from "../components/widgets/MathRiddleWidget";
import { SalesAnalyticsWidget } from "../components/widgets/SalesAnalyticsWidget";
import { TypingSpeedWidget } from "../components/widgets/TypingSpeedWidget";

// Dynamic widget map
const widgetMap: Record<string, React.ComponentType> = {
  StudentDatabase: StudentDatabaseWidget,
  TrieSearch: TrieSearchWidget,
  MathRiddle: MathRiddleWidget,
  SalesAnalytics: SalesAnalyticsWidget,
  TypingSpeed: TypingSpeedWidget,
};

/* ─── Interfaces ───────────────────────────────────────────────────────────── */
interface Project {
  name: string;
  description: string;
  summary: string;
  duration: string;
  sourceCode?: string;
  liveUrl?: string;
  technologies?: string[];
  widget?: string;
}

interface CardItem {
  id: string;
  type: "project" | "quote" | "connect";
  projectIndex?: number;
  quote?: string;
  author?: string;
  variant?: "crimson" | "console";
}

/* ─── Subcomponents ────────────────────────────────────────────────────────── */

// 1. Quote Card Widget
const QuoteWidget = ({ quote, author, variant }: { quote: string; author: string; variant: "crimson" | "console" }) => {
  if (variant === "console") {
    return (
      <div className="bg-zinc-950 text-zinc-355 font-mono p-4 sm:p-5 rounded-2xl flex flex-col h-full justify-between text-left select-none border border-zinc-900 shadow-inner">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-2.5 opacity-55">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[7px] uppercase tracking-widest">shell_console</span>
        </div>

        <div>
          <div className="text-green-450 text-[9px] mb-1.5">// Engineering Motto</div>
          <p className="text-[10px] sm:text-xs leading-relaxed text-zinc-100 font-medium whitespace-pre-line mb-3">
            {quote}
          </p>
        </div>

        <div className="text-zinc-505 text-[8px] text-right mt-auto">
          {author}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#6B2D2D] text-white p-4 sm:p-6 rounded-2xl flex flex-col h-full justify-between text-left relative min-h-[180px]">
      <span className="absolute top-2 right-4 text-5xl sm:text-7xl font-serif leading-none opacity-10 pointer-events-none select-none">
        “
      </span>
      <div>
        <p className="text-xs sm:text-sm font-serif italic leading-relaxed relative z-10 max-w-[85%] mt-2">
          {quote}
        </p>
      </div>

      <div className="mt-4 border-t border-white/10 pt-2.5 flex items-center justify-between relative z-10">
        <span className="text-[8px] uppercase tracking-widest font-mono text-white/40">Philosophic</span>
        <span className="text-[9px] font-mono tracking-widest font-bold uppercase">{author}</span>
      </div>
    </div>
  );
};

// 3. Social Connect CTA Widget
const ConnectWidget = () => {
  const { socialLinks } = siteConfig.sections.contact;
  const priority = ["LinkedIn", "GitHub", "Mail", "Twitter"];
  const filtered = socialLinks.filter((s) => priority.includes(s.name));

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-3.5 h-3.5" />;
      case "github":
        return <Github className="w-3.5 h-3.5" />;
      case "mail":
        return <Mail className="w-3.5 h-3.5" />;
      case "twitter":
        return <Twitter className="w-3.5 h-3.5" />;
      default:
        return <ExternalLink className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full min-h-[190px]">
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-555 font-mono">Connect</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">Let's talk code.</h4>
        <p className="text-[11px] sm:text-xs text-gray-505 dark:text-zinc-400 leading-relaxed">
          Always open to discussing core software engineering systems and international workflows.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {filtered.map((link) => (
          <a
            key={link.name}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 border border-gray-255 dark:border-zinc-800 hover:border-[#385144] dark:hover:border-green-400 rounded-xl text-[9px] sm:text-[10px] font-bold text-gray-650 dark:text-zinc-350 hover:text-[#385144] dark:hover:text-green-400 transition-all bg-gray-50/50 dark:bg-zinc-900/20"
          >
            {getIcon(link.name)}
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

// 4. Data-Driven Project Card Component (Inline Expansion)
const ProjectCard = ({ 
  project, 
  isExpanded, 
  onToggleExpand 
}: { 
  project: Project; 
  isExpanded: boolean; 
  onToggleExpand: () => void;
}) => {
  const WidgetComponent = project.widget ? widgetMap[project.widget] : null;

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Project Details (Top) */}
      <div className="p-3.5 sm:p-5 text-left flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-mono text-[#385144] dark:text-green-400 font-bold bg-[#385144]/5 dark:bg-green-400/5 px-2 py-0.5 rounded">
            Project
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono text-gray-400 dark:text-zinc-550 uppercase">
            {project.duration}
          </span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          {project.name}
        </h4>
        
        <p className="text-[11px] sm:text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[8px] sm:text-[9px] px-1.5 py-0.5 border border-gray-250/50 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/60 text-gray-700 dark:text-zinc-350 font-mono font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Dynamic Widget Render (Below Details) */}
      {WidgetComponent && (
        <div className="border-t border-gray-100/50 dark:border-zinc-800/40 bg-gray-50/20 dark:bg-zinc-950/10">
          <WidgetComponent />
        </div>
      )}

      {/* Show/Hide Details Button (Bottom) */}
      <div className="border-t border-gray-100/50 dark:border-zinc-800/40">
        <button
          onClick={onToggleExpand}
          className="w-full py-2 px-3.5 sm:px-5 flex items-center justify-between text-[10px] sm:text-xs font-bold text-gray-555 dark:text-zinc-450 hover:text-[#385144] dark:hover:text-green-400 hover:bg-gray-55/40 dark:hover:bg-zinc-955/20 transition-all duration-200 font-mono"
        >
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
            {isExpanded ? "Hide Details" : "Show Details"}
          </span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-350 ${isExpanded ? "rotate-90 text-[#385144] dark:text-green-400" : ""}`} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-gray-100/50 dark:border-zinc-850 bg-gray-55/35 dark:bg-zinc-955/20 text-left"
          >
            <div className="p-3.5 sm:p-5 flex flex-col gap-3.5 sm:gap-4">
              <div>
                <h5 className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1 font-mono">Description</h5>
                <p className="text-[11px] sm:text-xs text-gray-600 dark:text-zinc-350 leading-relaxed font-sans font-normal">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100/50 dark:border-zinc-850/80 pt-2.5 mt-0.5 flex-wrap gap-2">
                {project.sourceCode ? (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-gray-450 hover:text-[#385144] dark:hover:text-green-400 transition-colors uppercase tracking-wider font-mono"
                  >
                    <Code className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Source
                  </a>
                ) : (
                  <div />
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-gray-450 hover:text-[#385144] dark:hover:text-green-400 transition-colors uppercase tracking-wider font-mono"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Demo
                  </a>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main ProjectsSection Component ────────────────────────────────────────── */
export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

  const toggleProjectExpand = (index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Build the list of cards dynamically by mapping projects, then interspersing quote/connect
  const cardsList = (() => {
    const list: CardItem[] = [];
    
    // Add all project items
    projects.items.forEach((p, idx) => {
      list.push({
        id: `proj-${idx}`,
        type: "project",
        projectIndex: idx,
      });
    });

    const quotes = [
      { id: "quote-senna", type: "quote" as const, quote: "I admire hard work, dedication and competence.", author: "Ayrton Senna", variant: "crimson" as const },
      { id: "quote-dijkstra", type: "quote" as const, quote: "Simplicity is prerequisite\nfor reliability.", author: "Edsger W. Dijkstra", variant: "console" as const },
      { id: "connect-cta", type: "connect" as const }
    ];

    // Intersperse Quotes dynamically based on size to keep layout balanced
    if (list.length > 0) {
      list.splice(Math.min(1, list.length), 0, quotes[0]);
    } else {
      list.push(quotes[0]);
    }

    if (list.length > 2) {
      list.splice(Math.min(3, list.length), 0, quotes[1]);
    } else {
      list.push(quotes[1]);
    }

    // Always append CTA connect at the end
    list.push(quotes[2]);

    return list;
  })();

  const renderCardContent = (card: CardItem) => {
    switch (card.type) {
      case "quote":
        return <QuoteWidget quote={card.quote!} author={card.author!} variant={card.variant!} />;
      case "connect":
        return <ConnectWidget />;
      default:
        return null;
    }
  };

  return (
    <BaseSection variant="minimal">
      <SectionHeader title={projects.title} index="02" subtitle="Selected Works" className="!mb-12" />

      {/* Main Pinterest Grid Container */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-6 [column-fill:balance] w-full">
          {cardsList.map((card, idx) => {
            const isProject = card.type === "project" && card.projectIndex !== undefined;
            const isExpanded = isProject ? !!expandedProjects[card.projectIndex!] : false;
            
            return (
              <motion.div
                key={card.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid mb-3 sm:mb-6 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-255/45 dark:border-white/10 bg-white dark:bg-zinc-900/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none hover:shadow-md hover:-translate-y-1 hover:border-[#385144]/25 dark:hover:border-green-400/20 transition-all duration-300 flex flex-col group relative"
              >
                {isProject ? (
                  <ProjectCard
                    project={projects.items[card.projectIndex!]}
                    isExpanded={isExpanded}
                    onToggleExpand={() => toggleProjectExpand(card.projectIndex!)}
                  />
                ) : (
                  <>
                    {/* {hasHeader && getCardHeader(card)} */}
                    <div className="flex-1 flex flex-col justify-between">
                      {renderCardContent(card)}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </BaseSection>
  );
};
