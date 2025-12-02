import { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const KnowledgeSection = (): JSX.Element => {
  const { knowledge } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Get color for type (used for accent line)
  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'technologies':
        return 'bg-blue-500 dark:bg-blue-400';
      case 'domain':
        return 'bg-purple-500 dark:bg-purple-400';
      default:
        return 'bg-gray-400 dark:bg-gray-500';
    }
  };

  return (
    <BaseSection title={knowledge.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {knowledge.items.map((item: any, index: number) => {
            const isExpanded = expandedItem === index;
            const hasDescription = item.description && item.description.trim().length > 0;
            const typeColor = getTypeColor(item.type);

            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group relative"
              >
                {/* Clickable area */}
                <div
                  onClick={() => hasDescription && toggleItem(index)}
                  className={`
                    flex items-start gap-6 py-8
                    border-b border-gray-200/30 dark:border-gray-800/30
                    ${hasDescription ? 'cursor-pointer' : ''}
                    transition-all duration-200
                  `}
                >
                  {/* Left side: Colored accent line (represents type) */}
                  <div className="flex items-start gap-3 min-w-[2rem]">
                    {/* Vertical accent line - color coded by type */}
                    <div className="relative pt-2">
                      <div className={`
                        w-0.5 h-5 transition-all duration-300
                        ${isExpanded
                          ? typeColor
                          : `${typeColor} opacity-40 group-hover:opacity-100`
                        }
                      `} />
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-4 min-w-0">
                    {/* Title */}
                    <div>
                      <h3 className={`
                        ${primaryFont} font-light ${primaryColor}
                        text-xl md:text-2xl tracking-tight
                        transition-colors duration-200
                        ${hasDescription ? 'group-hover:text-blue-500 dark:group-hover:text-green-400' : ''}
                      `}>
                        {item.name}
                      </h3>
                    </div>

                    {/* Key Skills */}
                    {item.keySkills && item.keySkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.keySkills.map((skill: string, i: number) => (
                          <span
                            key={i}
                            className={`
                              ${secondaryFont} font-mono text-xs ${mutedColor}
                              px-2.5 py-1
                              bg-gray-50 dark:bg-gray-900/50
                              border border-gray-200/50 dark:border-gray-800/50
                              rounded
                              transition-colors duration-200
                              group-hover:border-gray-300 dark:group-hover:border-gray-700
                            `}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expandable description */}
                    {hasDescription && (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2">
                              {/* Type label on expansion */}
                              {item.type && (
                                <div className={`${secondaryFont} font-mono text-xs ${mutedColor} uppercase tracking-wider`}>
                                  {item.type}
                                </div>
                              )}
                              {/* Description */}
                              <div className={`
                                ${secondaryFont} text-sm ${secondaryColor} leading-relaxed
                                pl-4 border-l-2 border-gray-200 dark:border-gray-800
                              `}>
                                {item.description}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Chevron indicator */}
                  {hasDescription && (
                    <div className={`
                      pt-1 transition-all duration-200 flex-shrink-0
                      ${isExpanded
                        ? 'text-blue-500 dark:text-green-400'
                        : `${mutedColor} group-hover:text-blue-500 dark:group-hover:text-green-400`
                      }
                    `}>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer info with type legend */}
        <div className={`mt-12 space-y-4`}>
          {/* Type legend */}
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-500 dark:bg-blue-400" />
              <span className={`${secondaryFont} font-mono ${mutedColor}`}>technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-purple-500 dark:bg-purple-400" />
              <span className={`${secondaryFont} font-mono ${mutedColor}`}>domain</span>
            </div>
          </div>

          {/* Count */}
          <div className={`text-center ${secondaryFont} text-sm ${mutedColor}`}>
            <p className="font-mono">
              {knowledge.items.length} {knowledge.items.length === 1 ? 'area' : 'areas'}
              <span className="mx-2">•</span>
              click to expand details
            </p>
          </div>
        </div>
      </div>
    </BaseSection>
  );
};
