import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './button';
import { siteConfig } from '../config/site';
import { fadeInUp, hoverLift, easings } from '../lib/animations';

interface Project {
  name: string;
  description: string;
  duration: string;
  sourceCode: string;
  liveUrl: string;
  technologies: string[];
  summary: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { display: displayFont, secondary: secondaryFont } = siteConfig.styles.fonts;

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-neutral-900/80 rounded-xl border border-gray-200/80 dark:border-white/10 overflow-hidden relative group"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      layout
    >
      <motion.div 
        variants={hoverLift}
        className="p-6 md:p-8 flex flex-col h-full bg-white dark:bg-transparent relative z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative">
          <div className="flex-1 pr-6">
            <h3
              className={`${displayFont} text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight flex items-center gap-3`}
            >
              {project.name}
            </h3>
            <p className={`text-[10px] md:text-xs ${secondaryFont} text-gray-500 dark:text-gray-400 uppercase tracking-widest`}>
              {project.duration}
            </p>
          </div>
          <div className="text-5xl font-mono text-gray-100 dark:text-white/5 font-bold absolute right-0 top-0 -mt-2 -mr-2 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack */}
        <div className="mb-8 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded text-[10px] md:text-xs ${secondaryFont} font-medium border border-gray-200/50 dark:border-white/10 uppercase tracking-wider transition-colors duration-300 group-hover:border-blue-500/30 dark:group-hover:border-green-400/30`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: easings.expoOut }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-100 dark:border-white/10 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-gray-100 dark:border-white/10 mt-auto">
          {project.sourceCode && project.sourceCode !== "#" && (
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] md:text-xs h-8"
              onClick={() => window.open(project.sourceCode, '_blank')}
            >
              <Github className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
              Source
            </Button>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] md:text-xs h-8 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-green-400/10 dark:text-green-400 dark:border-green-400/20 dark:hover:bg-green-400/20"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
              Live Demo
            </Button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto text-[10px] md:text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 font-mono transition-colors uppercase tracking-wider"
          >
            {isExpanded ? (
              <>
                Collapse <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
              </>
            ) : (
              <>
                Details <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Animated glow border on hover */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 dark:from-green-400/20 dark:via-transparent dark:to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl"
      />
    </motion.div>
  );
};
