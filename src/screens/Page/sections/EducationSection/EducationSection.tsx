import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const EducationSection = (): JSX.Element => {
  const { education } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <BaseSection title={education.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          className="space-y-24"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {education.items.map((item, index) => (
            <motion.div
              key={index}
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
              variants={staggerItem}
              whileHover={{ x: 4 }}
            >
              {/* Timeline dot - animated on scroll */}
              <motion.div
                className="absolute left-0 top-0 w-5 h-5 bg-gray-400 rounded-full border-4 border-white group-hover:bg-blue-500 transition-all duration-500 transform -translate-x-2.5 dark:bg-gray-600 dark:border-black dark:group-hover:bg-green-400"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 260, damping: 20 }}
              />

              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="space-y-3">
                      {item.course && (
                        <motion.h3
                          className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight`}
                          whileHover={{ x: 4 }}
                        >
                          {item.course}
                        </motion.h3>
                      )}
                      {item.branch && (
                        <p className={`${primaryFont} font-light ${secondaryColor} text-base md:text-lg leading-relaxed max-w-5xl`}>
                          {item.branch}
                        </p>
                      )}
                      <p className={`${secondaryFont} font-medium ${accentColor} text-base md:text-lg`}>
                        {item.institution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                  {item.duration && (
                    <motion.div
                      className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
                      whileHover={{ x: 2 }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{item.duration}</span>
                    </motion.div>
                  )}

                  {item.location && (
                    <motion.div
                      className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
                      whileHover={{ x: 2 }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </BaseSection>
  );
};