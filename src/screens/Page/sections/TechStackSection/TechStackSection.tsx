import { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";
import { Code2, Layers, Database, Cloud, Box, GitBranch, Wrench } from "lucide-react";

export const TechStackSection = (): JSX.Element => {
  const { techStack } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, muted: mutedColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Group by type
  const groupedTech = techStack.items.reduce((acc: any, item: any) => {
    const type = item.type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  // Sort groups by count (descending), then by priority
  const typeOrder = ['programming language', 'framework', 'database', 'cloud', 'containerization', 'version control', 'Tool'];
  const sortedGroups = Object.entries(groupedTech).sort(([typeA, itemsA]: [string, any], [typeB, itemsB]: [string, any]) => {
    const countDiff = itemsB.length - itemsA.length;
    if (countDiff !== 0) return countDiff;

    const aIndex = typeOrder.indexOf(typeA);
    const bIndex = typeOrder.indexOf(typeB);
    // If not in priority list, push to end
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Get icon for type based on keywords
  const getIconForType = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('language')) return Code2;
    if (lowerType.includes('framework')) return Layers;
    if (lowerType.includes('database') || lowerType.includes('db')) return Database;
    if (lowerType.includes('cloud')) return Cloud;
    if (lowerType.includes('container')) return Box;
    if (lowerType.includes('version') || lowerType.includes('control')) return GitBranch;
    if (lowerType.includes('tool')) return Wrench;
    return Code2; // default
  };

  return (
    <BaseSection title={techStack.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          className="space-y-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {sortedGroups.map(([type, items]: [string, any], groupIndex) => {
            const Icon = getIconForType(type);

            return (
              <motion.div
                key={type}
                variants={staggerItem}
                className="group relative"
              >
                <div className={`
                  flex items-start gap-8 py-10
                  border-b border-gray-200/30 dark:border-gray-800/30
                  transition-all duration-200
                `}>
                  {/* Left side: Accent line and Icon */}
                  <div className="flex items-start gap-4 min-w-[4rem]">
                    {/* Vertical accent line */}
                    <div className="relative pt-2">
                      <div className={`
                        w-0.5 h-6 transition-all duration-300
                        bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-400 dark:group-hover:bg-green-500
                      `} />
                    </div>

                    {/* Icon */}
                    <div className={`
                      pt-1
                      ${mutedColor} group-hover:text-blue-500 dark:group-hover:text-green-400
                      transition-colors duration-200
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-5">
                    {/* Type Header */}
                    <div className="space-y-2">
                      <h3 className={`
                        ${primaryFont} font-light ${primaryColor} 
                        text-xl md:text-2xl tracking-tight lowercase
                        transition-colors duration-200
                        group-hover:text-blue-500 dark:group-hover:text-green-400
                      `}>
                        {type}
                      </h3>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-3">
                      {(items as any[]).map((tech: any, index: number) => {
                        const itemKey = `${groupIndex}-${index}`;
                        const isHovered = hoveredIndex === itemKey;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{
                              delay: groupIndex * 0.1 + index * 0.05,
                              duration: 0.4
                            }}
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                            onHoverStart={() => setHoveredIndex(itemKey)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="relative"
                          >
                            {/* Skill badge */}
                            <div className={`
                              relative
                              ${primaryFont} font-light text-sm md:text-base
                              px-4 py-2
                              bg-gray-50 dark:bg-gray-900/50
                              border border-gray-200/50 dark:border-gray-800/50
                              rounded-lg
                              transition-all duration-200
                              hover:border-blue-500 dark:hover:border-green-400
                              hover:bg-white dark:hover:bg-gray-900
                              hover:shadow-md
                              cursor-default
                            `}>
                              {tech.name}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <div className={`mt-16 text-center ${secondaryFont} text-sm ${mutedColor}`}>
          <p className="font-mono">
            {techStack.items.length} {techStack.items.length === 1 ? 'technology' : 'technologies'}
          </p>
        </div>
      </div>
    </BaseSection>
  );
};
