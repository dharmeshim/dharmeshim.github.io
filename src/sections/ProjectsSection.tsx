import { useRef } from "react";
import { BaseSection } from "../components/BaseSection";
import { siteConfig } from "../config/site";
import { ExternalLink, Code, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";

export const ProjectsSection = (): JSX.Element => {
  const { projects } = siteConfig.sections;
  const { primary: primaryFont, secondary: monoFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, accent, accentSoft, accentBorder, accentBorderHover } = siteConfig.styles.colors;

  const constraintsRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.5, triggerOnce: true });

  const totalProjects = projects.items.length;
  const totalTechs = Array.from(new Set(projects.items.flatMap(p => p.technologies || []))).length;

  const projectCount = useCountUp({ end: totalProjects, enabled: statsInView, duration: 1200, delay: 100 });
  const techCount = useCountUp({ end: totalTechs, enabled: statsInView, duration: 1400, delay: 200 });

  return (
    <BaseSection title={projects.title}>
      <div className="w-full">
        <SectionHeader
          title={projects.title}
          index="02"
          subtitle="Selected Works"
        />

        {/* ─── Drag Hint ─── */}
        <motion.div
          className={`hidden md:flex items-center gap-3 mb-8 ${monoFont} text-[10px] uppercase tracking-[0.3em] text-gray-400`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ←→
          </motion.span>
          <span>Drag to explore</span>
          <span className="opacity-40">· {projects.items.length} projects</span>
        </motion.div>

        {/* ─── Horizontal Drag Track ─── */}
        <div
          ref={constraintsRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing -mx-6 sm:-mx-12 md:-mx-16 lg:-mx-24"
          data-cursor="drag"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            dragTransition={{ bounceDamping: 30, bounceStiffness: 300 }}
            className="flex w-max gap-4 md:gap-6 px-6 sm:px-12 md:px-16 lg:px-24 py-4 select-none"
            whileDrag={{ cursor: "grabbing" }}
          >
            {projects.items.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                total={totalProjects}
                primaryFont={primaryFont}
                monoFont={monoFont}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                accent={accent}
                accentSoft={accentSoft}
                accentBorder={accentBorder}
                accentBorderHover={accentBorderHover}
              />
            ))}
          </motion.div>
        </div>

        {/* ─── Mobile: vertical stack ─── */}
        <div className="md:hidden mt-8 space-y-6">
          {projects.items.map((project, index) => (
            <MobileProjectCard
              key={index}
              project={project}
              index={index}
              primaryFont={primaryFont}
              monoFont={monoFont}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              accent={accent}
              accentSoft={accentSoft}
              accentBorder={accentBorder}
            />
          ))}
        </div>

        {/* ─── Stats footer ─── */}
        <motion.div
          ref={statsRef}
          className="mt-16 pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-wrap gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <div className={`${monoFont} text-4xl font-black ${primaryColor}`}>
              {String(projectCount).padStart(2, '0')}
            </div>
            <div className={`${monoFont} text-[9px] uppercase tracking-[0.3em] text-gray-500 mt-1`}>
              Projects Built
            </div>
          </div>
          <div>
            <div className={`${monoFont} text-4xl font-black ${primaryColor}`}>
              {String(techCount).padStart(2, '0')}
            </div>
            <div className={`${monoFont} text-[9px] uppercase tracking-[0.3em] text-gray-500 mt-1`}>
              Technologies
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};

/* ─── Desktop Card ──────────────────────────────────────────────────────────── */
interface CardProps {
  project: {
    name: string;
    description: string;
    summary: string;
    duration: string;
    sourceCode?: string;
    liveUrl?: string;
    technologies?: string[];
  };
  index: number;
  primaryFont: string;
  monoFont: string;
  primaryColor: string;
  secondaryColor: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  accentBorderHover: string;
  total: number;
}

const ProjectCard = ({ project, index, total, primaryFont, monoFont, primaryColor, secondaryColor, accentSoft, accentBorder, accentBorderHover }: CardProps) => {
  return (
    <motion.div
      className={`hidden md:flex flex-col justify-between flex-shrink-0 rounded-3xl border border-gray-200/60 dark:border-white/8 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm p-8 lg:p-10 ${accentBorderHover} transition-colors duration-500`}
      style={{ width: 'clamp(300px, 42vw, 560px)', height: 'clamp(400px, 52vh, 640px)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Top meta */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className={`${monoFont} text-[10px] tracking-[0.3em] uppercase text-gray-400`}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {project.duration && (
            <div className={`flex items-center gap-1.5 ${monoFont} text-[10px] text-gray-400`}>
              <Calendar className="w-3 h-3" />
              <span>{project.duration}</span>
            </div>
          )}
        </div>

        <h3
          className={`text-2xl lg:text-3xl font-bold tracking-tight ${primaryColor} leading-tight`}
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {project.name}
        </h3>

        <p className={`${primaryFont} text-sm lg:text-base leading-relaxed ${secondaryColor} line-clamp-3`}>
          {project.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="space-y-6 mt-auto">
        {/* Tech tags */}
        {project.technologies && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full ${accentSoft} border ${accentBorder} text-[10px] ${monoFont} font-medium text-gray-600 dark:text-gray-300`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-3">
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="external"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium transition-all hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="external"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-900 dark:border-white text-gray-900 dark:text-white text-xs font-medium transition-all hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Mobile Card ───────────────────────────────────────────────────────────── */
const MobileProjectCard = ({ project, index, primaryFont, monoFont, primaryColor, secondaryColor, accentSoft, accentBorder, accent }: CardProps) => (
  <motion.div
    className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/60 dark:border-white/8 bg-white/60 dark:bg-neutral-900/60"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.07 }}
  >
    <div className="flex items-center justify-between">
      <span className={`${monoFont} text-[9px] tracking-[0.3em] uppercase ${accent}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      {project.duration && (
        <span className={`${monoFont} text-[9px] text-gray-400`}>{project.duration}</span>
      )}
    </div>

    <h3
      className={`text-xl font-bold ${primaryColor}`}
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      {project.name}
    </h3>

    <p className={`${primaryFont} text-sm leading-relaxed ${secondaryColor}`}>
      {project.summary}
    </p>

    {project.technologies && (
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className={`px-2.5 py-1 rounded-full ${accentSoft} border ${accentBorder} text-[9px] ${monoFont}`}
          >
            {tech}
          </span>
        ))}
      </div>
    )}

    <div className="flex gap-2 pt-1">
      {project.sourceCode && (
        <a
          href={project.sourceCode}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
        >
          <Code className="w-3 h-3" /> Source
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg border border-gray-800 dark:border-white text-gray-800 dark:text-white"
        >
          <ExternalLink className="w-3 h-3" /> Live
        </a>
      )}
    </div>
  </motion.div>
);
