import React, { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Brain, Cpu, Zap, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { staggerContainer } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const KnowledgeSection = (): JSX.Element => {
  const { knowledge } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <BaseSection title={knowledge.title}>
      <div className={`${itemGap}`} ref={ref}>
        <LayoutGroup>
          <div className="relative min-h-[500px]">
            {/* Responsive Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {knowledge.items.map((item: any, index: number) => {
                const isSelected = selectedId === index;

                return (
                  <motion.div
                    key={index}
                    layout
                    className={`relative ${isSelected ? 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2 z-20' : 'col-span-1 z-10'}`}
                    onClick={() => setSelectedId(isSelected ? null : index)}
                  >
                    <motion.div
                      layout
                      className={`h-full cursor-pointer rounded-2xl overflow-hidden relative transition-shadow duration-300 ${isSelected
                          ? 'bg-white dark:bg-gray-900 shadow-2xl ring-2 ring-blue-500 dark:ring-green-400'
                          : 'bg-white/60 dark:bg-gray-900/60 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl'
                        } backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50`}
                      whileHover={!isSelected ? { scale: 1.02 } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {/* Background Gradient & Pattern */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-green-400/20 dark:to-cyan-400/20" />
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }} className="text-blue-500 dark:text-green-400" />
                      </div>

                      <div className="relative p-6 flex flex-col h-full">
                        {/* Header: Icon & Title */}
                        <motion.div layout="position" className="flex items-center gap-4 mb-4">
                          <motion.div
                            layout
                            className={`rounded-full flex items-center justify-center ${isSelected ? 'w-16 h-16' : 'w-12 h-12'
                              } bg-gradient-to-br from-blue-500 to-purple-600 dark:from-green-400 dark:to-cyan-500 shadow-lg`}
                          >
                            <Brain className={`${isSelected ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
                          </motion.div>

                          <div className="flex-1">
                            <motion.h3
                              layout="position"
                              className={`${primaryFont} font-bold ${isSelected ? 'text-2xl' : 'text-lg'} ${primaryColor}`}
                            >
                              {item.name}
                            </motion.h3>
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-1 text-xs text-blue-500 dark:text-green-400 font-medium mt-1"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Knowledge Node Active</span>
                              </motion.div>
                            )}
                          </div>

                          {/* Close Button (only visible when selected) */}
                          {isSelected && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(null);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          )}
                        </motion.div>

                        {/* Content: Description */}
                        <AnimatePresence mode="wait">
                          {isSelected ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ delay: 0.1 }}
                              className="mt-2"
                            >
                              <p className={`${secondaryFont} ${secondaryColor} text-base leading-relaxed`}>
                                {item.description}
                              </p>

                              {/* Decorative elements for expanded state */}
                              <div className="mt-6 flex items-center gap-2">
                                <div className="h-1 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-green-400 dark:to-cyan-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                  />
                                </div>
                                <span className="text-xs font-mono text-gray-400">SYNCED</span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.p
                              layout="position"
                              className={`${secondaryFont} text-sm ${mutedColor} line-clamp-2`}
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Pulse Indicator (only when not selected) */}
                        {!isSelected && (
                          <motion.div
                            className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-green-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Background CPU Decoration */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-5">
              <Cpu className="w-96 h-96 text-blue-500 dark:text-green-400" />
            </div>
          </div>
        </LayoutGroup>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <p className={`${secondaryFont} text-sm ${mutedColor} flex items-center justify-center gap-2`}>
            <Zap className="w-4 h-4" />
            Click on any node to expand details
          </p>
        </motion.div>
      </div>
    </BaseSection>
  );
};
