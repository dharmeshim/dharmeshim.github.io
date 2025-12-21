import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

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

    return (
        <motion.div
            className="bg-white dark:bg-neutral-900/80 rounded-lg border border-gray-200 dark:border-green-400/20 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-green-400 mb-2">
                            {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {project.duration}
                        </p>
                    </div>
                    <motion.div
                        className="text-4xl font-mono text-gray-200 dark:text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </motion.div>
                </div>

                {/* Summary */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.summary}
                </p>

                {/* Tech Stack - Game-like progress bars */}
                <div className="mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-2">
            // Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                            <motion.span
                                key={tech}
                                className="px-3 py-1 bg-blue-50 dark:bg-cyan-400/10 text-blue-700 dark:text-cyan-400 rounded-full text-xs font-mono border border-blue-200 dark:border-cyan-400/30"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {project.sourceCode && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => window.open(project.sourceCode, '_blank')}
                        >
                            <Github className="w-3 h-3 mr-1" />
                            Source
                        </Button>
                    )}
                    {project.liveUrl && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Live Demo
                        </Button>
                    )}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-auto text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1 font-mono transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                Less <ChevronUp className="w-3 h-3" />
                            </>
                        ) : (
                            <>
                                More <ChevronDown className="w-3 h-3" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Animated border on hover */}
            <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-green-400 dark:via-cyan-400 dark:to-blue-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
            />
        </motion.div>
    );
};
