import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, MapPin, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const EducationSection = (): JSX.Element => {
  const { education } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <BaseSection title={education.title}>
      <div className={`${itemGap}`} ref={ref}>
        {/* Timeline container */}
        <div className="relative">
          {/* Central timeline line - Hidden on mobile, visible on md+ */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50 dark:from-purple-400/50 dark:via-pink-400/50 dark:to-purple-400/50" />

          <motion.div
            className="space-y-12 md:space-y-16"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {education.items.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative"
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 pl-12 md:pl-0`}>
                    {/* Content card */}
                    <motion.div
                      className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                      whileHover={{ scale: 1.02, x: isLeft ? -8 : 8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="relative p-6 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        {/* Type indicator */}
                        <div className={`absolute top-4 right-4 md:right-auto ${isLeft ? 'md:left-4' : 'md:right-4'}`}>
                          <div className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                            Education
                          </div>
                        </div>

                        {/* Institution */}
                        <h3 className={`${primaryFont} font-bold text-xl md:text-2xl ${primaryColor} mt-8 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors`}>
                          {item.institution}
                        </h3>

                        {/* Degree/Description */}
                        {item.description && (
                          <p className={`${secondaryFont} font-medium ${accentColor} text-base mb-4`}>
                            {item.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className={`flex flex-wrap gap-3 justify-start ${isLeft ? 'md:justify-end' : 'md:justify-start'} mt-4`}>
                          {item.duration && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span className="font-mono">{item.duration}</span>
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline node */}
                    <motion.div
                      className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                    >
                      <div className="w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 z-10">
                        <GraduationCap className="w-4 h-4 md:w-7 md:h-7 text-white" />
                      </div>
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-purple-500/30 dark:bg-purple-400/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Empty space for alternating layout on desktop */}
                    <div className="hidden md:block w-5/12" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </BaseSection>
  );
};