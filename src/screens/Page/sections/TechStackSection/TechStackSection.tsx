import { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";
import { Code2, Layers, Database, Cloud, GitBranch, Wrench, Binary } from "lucide-react";

export const TechStackSection = (): JSX.Element => {
  const { techStack } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { secondary: secondaryColor } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState(0);

  const getIconForType = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('language')) return Code2;
    if (lowerType.includes('framework')) return Layers;
    if (lowerType.includes('database')) return Database;
    if (lowerType.includes('cloud')) return Cloud;
    if (lowerType.includes('version')) return GitBranch;
    return Wrench;
  };

  const activeGroup = techStack.items[activeTab];

  return (
    <BaseSection title={techStack.title}>
      <div className="w-full" ref={ref}>
        {/* Main Workspace Frame */}
        <motion.div
          className="flex flex-col lg:flex-row min-h-[500px] bg-white/20 dark:bg-black/20 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Sidebar: Schema Navigation */}
          <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-200/30 dark:border-white/5 p-8 flex flex-col gap-8 bg-gray-50/10 dark:bg-transparent">
            <div className="flex items-center gap-3 mb-4">
              <Binary className="w-5 h-5 text-blue-500 dark:text-green-400" />
              <span className={`${secondaryFont} text-[10px] font-bold uppercase tracking-[0.3em] opacity-40`}>Modules</span>
            </div>

            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
              {techStack.items.map((group: any, index: number) => {
                const Icon = getIconForType(group.type);
                const isActive = activeTab === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`
                        relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-500 whitespace-nowrap
                        ${isActive
                        ? 'bg-blue-500/10 dark:bg-green-400/10 text-blue-600 dark:text-green-400 shadow-sm'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}
                      `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                    <span className={`${primaryFont} text-sm font-bold`}>{group.type}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute right-3 w-1 h-4 bg-blue-500 dark:bg-green-400 rounded-full hidden lg:block"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Visual Editor Workspace */}
          <motion.div
            layout
            className="flex-1 p-6 lg:p-16 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8 lg:space-y-12"
              >
                {/* "Code" Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 lg:gap-4 text-gray-500/40 font-mono text-[10px] lg:text-xs">
                    <span>export const</span>
                    <span className="text-blue-500 dark:text-green-400">{activeGroup.type.replace(/\s+/g, '')}</span>
                    <span>: StackArea = &#123;</span>
                  </div>

                  <div className="pl-4 lg:pl-6 space-y-12">
                    {/* Integrated Tech Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {activeGroup.items.map((name: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 + 0.2 }}
                          whileHover={{ y: -5 }}
                          className="group relative"
                        >
                          {/* The "Token" */}
                          <div className={`
                                  relative z-10 p-4 lg:p-6 rounded-2xl lg:rounded-[2rem] bg-white/50 dark:bg-neutral-900 shadow-sm border border-transparent 
                                  group-hover:border-blue-500/30 dark:group-hover:border-green-400/30 transition-all duration-500
                                  group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] dark:group-hover:shadow-none
                                `}>
                            <div className="flex flex-col gap-3">
                              <div className="w-8 h-1 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-blue-500 dark:group-hover:bg-green-400 transition-colors" />
                              <span className={`${primaryFont} text-sm lg:text-lg font-bold ${secondaryColor}`}>
                                {name}
                              </span>
                            </div>
                          </div>

                          {/* Background Glow */}
                          <div className="absolute inset-0 bg-blue-500/5 dark:group-hover:bg-green-400/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="text-gray-500/40 font-mono text-[10px] lg:text-xs mt-8">
                    &#125;;
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Decoration */}
            <div className="absolute bottom-12 right-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10">
              <Code2 className="w-80 h-80 rotate-12" />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Context Metadata */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-green-400 animate-pulse" />
            <span className={`${secondaryFont} text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500`}>Environment Stable</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`${secondaryFont} text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500`}>Version 2.4.0</span>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
