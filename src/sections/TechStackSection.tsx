import { useState } from "react";
import { BaseSection } from "../components/BaseSection";
import { SectionHeader } from "../components/SectionHeader";
import { siteConfig } from "../config/site";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Code2, Layers, Database, Cloud, GitBranch, Wrench } from "lucide-react";
import { ScrollingTicker } from "../components/ScrollingTicker";

export const TechStackSection = (): JSX.Element => {
  const { techStack } = siteConfig.sections;
  const { secondary: monoFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, accent, accentSoft, accentBg, accentBorder, accentBorderHover } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState(0);

  // All tech names for the marquee (row 1)
  const allNames = techStack.items.flatMap((g) => g.items).join('   ');
  // All types for the marquee (row 2, opposite direction)
  const allTypes = techStack.items.flatMap((g) =>
    g.items.map(() => g.type)
  ).filter((v, i, a) => a.indexOf(v) === i).join('   ');

  const getIconForType = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('language')) return Code2;
    if (t.includes('framework')) return Layers;
    if (t.includes('database')) return Database;
    if (t.includes('cloud')) return Cloud;
    if (t.includes('version')) return GitBranch;
    return Wrench;
  };

  const activeGroup = techStack.items[activeTab];

  return (
    <BaseSection title={techStack.title}>
      <div className="w-full" ref={ref}>
        <motion.div
          className="w-full flex flex-col"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title={techStack.title}
            index="05"
            subtitle="Architecture & Tooling"
          />

          {/* ─── Tabbed detail view ─── */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Sidebar tabs */}
            <div className="w-full lg:w-56 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
              {techStack.items.map((group, index) => {
                const Icon = getIconForType(group.type);
                const isActive = activeTab === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-left transition-all duration-300 whitespace-nowrap shrink-0 ${isActive
                      ? `${accentSoft} ${accent} shadow-sm`
                      : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-40'} shrink-0`} />
                    <span className={`${monoFont} text-xs font-bold`}>{group.type}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabDot"
                        className={`ml-auto w-1.5 h-1.5 rounded-full ${accentBg} hidden lg:block`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content panel */}
            <div className="flex-1 relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                  {activeGroup.items.map((name, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 + 0.1, duration: 0.4 }}
                      whileHover={{ y: -4 }}
                      className={`group relative p-4 lg:p-5 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-transparent ${accentBorderHover} transition-all duration-400 shadow-sm`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className={`w-6 h-0.5 rounded-full bg-gray-200 dark:bg-white/10 group-hover:${accentBg.split(' ')[0].replace('bg-', 'bg-')} dark:group-hover:bg-green-400 transition-colors`} />
                        <span className={`text-sm font-semibold ${primaryColor}`}
                          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                          {name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Footer ─── */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${accentBg} animate-pulse`} />
              <span className={`${monoFont} text-[10px] uppercase tracking-[0.3em] text-gray-500`}>
                {techStack.items.reduce((acc, g) => acc + g.items.length, 0)} Technologies mastered
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`${monoFont} text-[10px] uppercase tracking-[0.3em] text-gray-500`}>
                {techStack.items.length} domains
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </BaseSection>
  );
};
