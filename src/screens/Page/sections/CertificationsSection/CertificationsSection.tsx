import React, { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, Award, ExternalLink, Shield, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "../../../../lib/animations";
import { useInView } from "../../../../hooks/useInView";

export const CertificationsSection = (): JSX.Element => {
  const { certifications } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Group by year
  const groupedCerts = certifications.items.reduce((acc: any, cert: any) => {
    const year = cert.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(cert);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedCerts).sort((a, b) => parseInt(b) - parseInt(a));
  const [selectedYear, setSelectedYear] = useState<string>(sortedYears[0] || "");

  return (
    <BaseSection title={certifications.title}>
      <div className={`${itemGap}`} ref={ref}>
        {/* Year selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {sortedYears.map((year) => (
            <motion.button
              key={year}
              onClick={() => setSelectedYear(year)}
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2 rounded-lg font-medium transition-all duration-300 ${selectedYear === year
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 dark:from-green-400 dark:to-cyan-500 text-white shadow-lg"
                  : "bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700"
                }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {year}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications as credential badges */}
        <AnimatePresence mode="wait">
          {selectedYear && (
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {groupedCerts[selectedYear].map((cert: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    {/* Credential badge - looks like real certification */}
                    <div className="relative h-full p-4 rounded-xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 border-2 border-blue-200/50 dark:border-green-400/30 shadow-lg overflow-hidden">
                      {/* Watermark pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                          backgroundSize: '15px 15px'
                        }} className="text-blue-500 dark:text-green-400" />
                      </div>

                      {/* Verified badge */}
                      <div className="absolute top-2 right-2 z-10">
                        <motion.div
                          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>

                      {/* Award icon */}
                      <div className="relative mb-3 flex justify-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Certification name */}
                      <h4 className={`${primaryFont} font-bold text-sm md:text-base ${primaryColor} text-center mb-2 leading-tight min-h-[2.5rem] flex items-center justify-center`}>
                        {cert.name}
                      </h4>

                      {/* Issuer */}
                      {cert.issuer && (
                        <p className={`${secondaryFont} font-medium ${accentColor} text-xs text-center mb-3`}>
                          {cert.issuer}
                        </p>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-3" />

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        {/* Year */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span className="font-mono">{cert.year}</span>
                        </div>

                        {/* View link */}
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-green-600 dark:hover:bg-green-700 text-white text-xs font-medium transition-colors duration-200"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </a>
                        )}
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-300/30 dark:border-green-400/20 rounded-tl-xl" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-300/30 dark:border-green-400/20 rounded-br-xl" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <Shield className="w-4 h-4 text-blue-500 dark:text-green-400" />
            <p className={`${secondaryFont} text-sm ${mutedColor}`}>
              {certifications.items.length} verified professional certifications
            </p>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
