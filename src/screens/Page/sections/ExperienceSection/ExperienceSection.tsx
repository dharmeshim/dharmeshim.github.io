import React from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const ExperienceSection = (): JSX.Element => {
  const { experience } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Group experiences by company
  const groupedExperiences = experience.items.reduce((acc: any[], exp: any) => {
    const existingCompany = acc.find(item => item.company === exp.company);
    if (existingCompany) {
      existingCompany.roles.push({
        role: exp.role,
        duration: exp.duration,
        description: exp.description
      });
    } else {
      acc.push({
        company: exp.company,
        location: exp.location,
        roles: [{
          role: exp.role,
          duration: exp.duration,
          description: exp.description
        }]
      });
    }
    return acc;
  }, []);

  return (
    <BaseSection title={experience.title}>
      <div className={`${itemGap}`} ref={ref}>
        <motion.div
          className="space-y-24"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {groupedExperiences.map((companyExp, companyIndex) => (
            <motion.div
              key={companyIndex}
              className={`group relative border-l-2 border-gray-300 pl-16 md:pl-20 lg:pl-24 hover:border-blue-500 transition-all duration-500 dark:border-gray-600 dark:hover:border-green-400 ${normalTransition} rounded-r-lg`}
              variants={staggerItem}
              whileHover={{ x: 4 }}
            >
              {/* Timeline dot - animated on scroll */}
              <motion.div
                className="absolute left-0 top-0 w-5 h-5 bg-gray-400 rounded-full border-4 border-white group-hover:bg-blue-500 transition-all duration-500 transform -translate-x-2.5 dark:bg-gray-600 dark:border-black dark:group-hover:bg-green-400"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: companyIndex * 0.2, type: "spring", stiffness: 260, damping: 20 }}
              />

              {/* Content */}
              <div className="space-y-6">
                {/* Company name as subtitle with icon */}
                <div className="space-y-2">
                  <motion.div
                    className={`${secondaryFont} font-medium ${mutedColor} text-sm md:text-base flex items-center gap-3`}
                    whileHover={{ x: 4 }}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{companyExp.company}</span>
                  </motion.div>
                </div>

                {/* Roles */}
                <div className="space-y-8">
                  {companyExp.roles.map((roleData: any, roleIndex: number) => (
                    <div key={roleIndex} className="space-y-4">
                      {/* Role as main heading */}
                      <div className="space-y-3">
                        <motion.h3
                          className={`${primaryFont} font-light ${primaryColor} text-2xl md:text-3xl lg:text-4xl tracking-tight`}
                          whileHover={{ x: 4 }}
                        >
                          {roleData.role}
                        </motion.h3>
                      </div>

                      {/* Description */}
                      {roleData.description && (
                        <div className={`${primaryFont} font-light ${secondaryColor} text-base md:text-lg leading-relaxed max-w-5xl`}>
                          {roleData.description}
                        </div>
                      )}

                      {/* Duration */}
                      {roleData.duration && (
                        <motion.div
                          className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
                          whileHover={{ x: 2 }}
                        >
                          <Calendar className="w-4 h-4" />
                          <span className="font-mono">{roleData.duration}</span>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer - Location (shown once per company) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                  {companyExp.location && (
                    <motion.div
                      className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
                      whileHover={{ x: 2 }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{companyExp.location}</span>
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