import { useState } from "react";
import { BaseSection } from "../components/BaseSection";
import { siteConfig } from "../config/site";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "../lib/animations";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "../components/SectionHeader";
import {
  Code2, Database, Cpu, Globe, ShieldCheck, Layers3, BrainCircuit, BookOpen,
} from "lucide-react";

const getIconForKnowledge = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes("backend") || t.includes("server")) return Code2;
  if (t.includes("database") || t.includes("data")) return Database;
  if (t.includes("frontend") || t.includes("ui")) return Globe;
  if (t.includes("cloud") || t.includes("devops")) return Layers3;
  if (t.includes("security") || t.includes("auth")) return ShieldCheck;
  if (t.includes("machine") || t.includes("ai") || t.includes("ml")) return BrainCircuit;
  if (t.includes("system") || t.includes("architecture")) return Cpu;
  return BookOpen;
};

export const KnowledgeSection = (): JSX.Element => {
  const { knowledge } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const {
    primary: primaryColor,
    secondary: secondaryColor,
    accentBg,
    accentSoft,
    accentBorder,
  } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  return (
    <BaseSection title={knowledge.title}>
      <div className="w-full relative py-12" ref={ref}>

        <motion.div
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="lg:col-span-12">
            <SectionHeader
              title={knowledge.title}
              index="04"
              subtitle="Core Competencies"
            />
          </div>

          {/* Left Side: Navigation Nodes */}
          <div className="lg:col-span-5 space-y-8 relative">
            {knowledge.items.map((item: any, index: number) => {
              const isActive = activeCategory === index;
              const Icon = getIconForKnowledge(item.type || item.name);

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(index)}
                  onClick={() => setActiveCategory(index)}
                >
                  <motion.div
                    className={`
                      relative z-10 flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl lg:rounded-3xl
                      cursor-pointer transition-all duration-500
                      ${isActive
                        ? `${accentSoft} border ${accentBorder} shadow-xl scale-[1.02] lg:scale-105`
                        : 'hover:bg-gray-100 dark:hover:bg-white/5 opacity-40 hover:opacity-100'}
                    `}
                  >
                    {/* Icon */}
                    <div className={`
                      p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-colors flex items-center justify-center shrink-0
                      ${isActive
                        ? `${accentBg} text-white dark:text-black shadow-lg`
                        : 'bg-gray-200 dark:bg-white/5 text-gray-400'}
                    `}>
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>

                    <div className="flex-1">
                      <div className={`${secondaryFont} text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-50`}>
                        {item.type}
                      </div>
                      <h3 className={`${primaryFont} text-lg lg:text-2xl font-bold ${primaryColor}`}>
                        {item.name}
                      </h3>
                    </div>
                  </motion.div>

                  {/* Connecting Line to Content Area (Desktop only) */}
                  {isActive && (
                    <motion.div
                      layoutId="navLine"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-[#385144] dark:from-green-400 to-transparent hidden lg:block"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Detailed Skills Panel */}
          <div className="lg:col-span-7 relative min-h-[400px] lg:min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeCategory !== null && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="h-full flex flex-col justify-center space-y-8 lg:space-y-12"
                >
                  <div className="p-6 lg:p-12 bg-white/30 dark:bg-black/20 backdrop-blur-xl rounded-[2rem] lg:rounded-[40px] border border-gray-200/50 dark:border-gray-800/50 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 space-y-8 lg:space-y-12">
                      <p className={`${primaryFont} text-lg lg:text-2xl leading-relaxed ${secondaryColor} font-medium`}>
                        {knowledge.items[activeCategory].description}
                      </p>

                      {/* Skill Bubbles */}
                      <div className="flex flex-wrap gap-2 lg:gap-4">
                        {knowledge.items[activeCategory].keySkills?.map((skill: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 + 0.2 }}
                            whileHover={{ scale: 1.08 }}
                            className="group relative"
                          >
                            <span className={`
                              inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-full
                              text-xs lg:text-sm font-mono font-bold
                              bg-white dark:bg-neutral-900
                              border border-gray-200 dark:border-gray-800
                              text-gray-600 dark:text-gray-300 shadow-sm
                              transition-all duration-300
                              group-hover:border-[#385144] dark:group-hover:border-green-400
                              group-hover:text-[#385144] dark:group-hover:text-green-400
                            `}>
                              {skill}
                            </span>
                            <div className={`absolute inset-0 ${accentSoft} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Abstract Background Glow */}
                    <div className={`absolute -bottom-24 -right-24 w-80 h-80 ${accentSoft} rounded-full blur-[80px]`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4 text-gray-500">
            <span className={`w-8 h-[2px] ${accentBg}`} />
            <span className={`${secondaryFont} text-xs font-bold uppercase tracking-[0.3em]`}>Continuous Growth</span>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <div className={`${secondaryFont} text-2xl font-bold ${primaryColor}`}>{knowledge.items.length}</div>
              <div className="text-[9px] uppercase tracking-widest text-gray-500">Domains</div>
            </div>
            <div className="text-center">
              <div className={`${secondaryFont} text-2xl font-bold ${primaryColor}`}>
                {knowledge.items.reduce((acc: number, item: any) => acc + (item.keySkills?.length || 0), 0)}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-gray-500">Specializations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
