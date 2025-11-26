import React, { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Code, Cpu, Database, Globe, Terminal, Layers, Boxes } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";
import { Badge } from "../../../../components/ui/badge";

// Categorize tech stack
const categorizeTech = (items: any[]) => {
  const categories: any = {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    concepts: []
  };

  items.forEach(item => {
    const name = item.name.toLowerCase();
    if (name.includes('python') || name.includes('java') || name.includes('javascript') || name.includes('typescript') || name.includes('c++') || name.includes('go')) {
      categories.languages.push(item);
    } else if (name.includes('react') || name.includes('vue') || name.includes('angular') || name.includes('node') || name.includes('django') || name.includes('spring')) {
      categories.frameworks.push(item);
    } else if (name.includes('sql') || name.includes('mongo') || name.includes('postgres') || name.includes('redis') || name.includes('database')) {
      categories.databases.push(item);
    } else if (name.includes('docker') || name.includes('kubernetes') || name.includes('git') || name.includes('aws') || name.includes('azure')) {
      categories.tools.push(item);
    } else {
      categories.concepts.push(item);
    }
  });

  return categories;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'languages': return Terminal;
    case 'frameworks': return Layers;
    case 'databases': return Database;
    case 'tools': return Boxes;
    case 'concepts': return Cpu;
    default: return Code;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'languages': return 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500';
    case 'frameworks': return 'from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500';
    case 'databases': return 'from-green-500 to-green-600 dark:from-green-400 dark:to-green-500';
    case 'tools': return 'from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500';
    case 'concepts': return 'from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const TechStackSection = (): JSX.Element => {
  const { techStack } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, muted: mutedColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = categorizeTech(techStack.items);
  const categoryNames = Object.keys(categories).filter(cat => categories[cat].length > 0);

  return (
    <BaseSection title={techStack.title}>
      <div className={`${itemGap}`} ref={ref}>
        {/* Circuit board visualization */}
        <div className="relative">
          {/* Circuit board background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, currentColor 1px, transparent 1px),
                linear-gradient(currentColor 1px, transparent 1px),
                radial-gradient(circle, currentColor 2px, transparent 2px)
              `,
              backgroundSize: '40px 40px, 40px 40px, 80px 80px',
              backgroundPosition: '0 0, 0 0, 20px 20px'
            }} className="text-blue-500 dark:text-green-400" />
          </div>

          {/* Component categories as circuit modules */}
          <motion.div
            className="relative space-y-12"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {categoryNames.map((category, catIndex) => {
              const Icon = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);
              const items = categories[category];
              const isActive = activeCategory === category;

              return (
                <motion.div
                  key={category}
                  variants={staggerItem}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {/* Module container */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 dark:from-gray-900/40 dark:via-gray-800/40 dark:to-gray-900/40 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Circuit traces connecting to module */}
                    <div className="absolute -left-8 top-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-500/50 dark:to-green-400/50" />
                    <div className="absolute -right-8 top-1/2 w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-500/50 dark:to-green-400/50" />

                    {/* Category header */}
                    <div className="flex items-center gap-4 mb-6">
                      {/* Chip/Module icon */}
                      <motion.div
                        className={`relative w-14 h-14 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-7 h-7 text-white" />

                        {/* LED indicator */}
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 shadow-lg"
                          animate={{
                            opacity: [1, 0.3, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: catIndex * 0.3
                          }}
                        />

                        {/* Chip pins */}
                        <div className="absolute -left-1 top-1/4 w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="absolute -left-1 top-3/4 w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="absolute -right-1 top-1/4 w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="absolute -right-1 top-3/4 w-1 h-1 bg-gray-400 rounded-full" />
                      </motion.div>

                      {/* Category name */}
                      <div>
                        <h3 className={`${primaryFont} font-bold text-xl md:text-2xl ${primaryColor} uppercase tracking-wider`}>
                          {category}
                        </h3>
                        <p className={`${secondaryFont} text-sm ${mutedColor}`}>
                          {items.length} {items.length === 1 ? 'component' : 'components'}
                        </p>
                      </div>
                    </div>

                    {/* Tech items as chips/components */}
                    <div className="flex flex-wrap gap-2">
                      {items.map((tech: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                        >
                          <Badge
                            variant="outline"
                            className="px-3 py-1.5 text-sm font-mono bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 hover:border-blue-500 dark:hover:border-green-400 cursor-default transition-all duration-200 hover:scale-105"
                          >
                            <Code className="w-3 h-3 mr-1.5" />
                            {tech.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Power indicator bar */}
                    <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${colorClass}`}
                        initial={{ width: "0%" }}
                        animate={inView ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 1, delay: catIndex * 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Connection nodes */}
                  <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-green-400 border-2 border-white dark:border-gray-900 shadow-lg" />
                  <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-green-400 border-2 border-white dark:border-gray-900 shadow-lg" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Central processor visualization */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
          >
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-green-400/10 dark:to-cyan-400/10 border-2 border-dashed border-blue-300 dark:border-green-400/30">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-blue-500 dark:text-green-400" />
                <p className={`${secondaryFont} text-sm ${mutedColor}`}>
                  System Architecture: {techStack.items.length} integrated components
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BaseSection>
  );
};
