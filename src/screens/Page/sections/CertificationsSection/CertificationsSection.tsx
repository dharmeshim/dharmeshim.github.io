import React, { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, Award, ExternalLink, Shield, CheckCircle2, Terminal, FileCode, Hash } from "lucide-react";
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

  // Generate a pseudo-hash for each certification (for visual effect)
  const generateHash = (name: string, index: number) => {
    const hash = (name + index).split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return Math.abs(hash).toString(16).substring(0, 7);
  };

  return (
    <BaseSection title={certifications.title}>
      <div className={`${itemGap}`} ref={ref}>
        {/* Terminal-style header */}
        <motion.div
          className="mb-8 p-4 rounded-lg bg-gray-900 dark:bg-black border border-gray-700 dark:border-gray-800 font-mono text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-green-400">~/certifications</span>
            <span className="text-gray-500">$</span>
            <span className="text-gray-300">ls -la --year={selectedYear}</span>
          </div>
          <div className="text-gray-500 text-xs">
            total {groupedCerts[selectedYear]?.length || 0} verified credentials
          </div>
        </motion.div>

        {/* Year selector - styled as git tags */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {sortedYears.map((year) => (
            <motion.button
              key={year}
              onClick={() => setSelectedYear(year)}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${selectedYear === year
                ? "bg-blue-500 dark:bg-green-500 text-white shadow-lg shadow-blue-500/30 dark:shadow-green-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              <span className="flex items-center gap-2">
                <Hash className="w-3 h-3" />
                {year}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications as code files */}
        <AnimatePresence mode="wait">
          {selectedYear && (
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="space-y-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {groupedCerts[selectedYear].map((cert: any, index: number) => {
                  const hash = generateHash(cert.name, index);
                  const certNumber = String(index + 1).padStart(2, '0');

                  return (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      className="group relative"
                    >
                      {/* Code file style layout */}
                      <div
                        className={`
                          flex items-start gap-6 py-6 px-4
                          border-b border-gray-200/30 dark:border-gray-800/30
                          hover:bg-gray-50/50 dark:hover:bg-gray-900/30
                          transition-all duration-200
                          cursor-default
                        `}
                      >
                        {/* Left side: Line number and accent */}
                        <div className="flex items-start gap-4 min-w-[3rem]">
                          {/* Vertical accent line */}
                          <div className="relative pt-2">
                            <div className={`
                              w-0.5 h-6 transition-all duration-300
                              bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-400 dark:group-hover:bg-green-500
                            `} />
                          </div>

                          {/* Line number */}
                          <div className={`
                            ${secondaryFont} font-mono text-sm
                            ${mutedColor} group-hover:text-blue-500 dark:group-hover:text-green-400
                            transition-colors duration-200 pt-1
                          `}>
                            {certNumber}
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="flex-1 space-y-3">
                          {/* File icon and name */}
                          <div className="flex items-start gap-3">
                            <FileCode className={`w-5 h-5 mt-1 ${accentColor} group-hover:text-blue-500 dark:group-hover:text-green-400 transition-colors`} />
                            <div className="flex-1">
                              <h4 className={`${primaryFont} font-light ${primaryColor} text-lg md:text-xl tracking-tight group-hover:text-blue-500 dark:group-hover:text-green-400 transition-colors`}>
                                {cert.name}
                              </h4>
                              {cert.issuer && (
                                <p className={`${secondaryFont} text-sm ${mutedColor} mt-1`}>
                                  issued by <span className="font-medium">{cert.issuer}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Metadata - styled like git commit info */}
                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                            {/* Commit hash style */}
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <Hash className="w-3 h-3" />
                              <span className="text-blue-600 dark:text-green-400">{hash}</span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{cert.year}</span>
                            </div>

                            {/* Verified badge */}
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>verified</span>
                            </div>
                          </div>

                          {/* View link */}
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`
                                inline-flex items-center gap-2 text-sm font-mono
                                ${mutedColor} hover:text-blue-500 dark:hover:text-green-400
                                transition-colors duration-200
                              `}
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>view credential</span>
                            </a>
                          )}
                        </div>

                        {/* Award icon on right */}
                        <div className="hidden sm:block">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Award className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal-style footer */}
        <motion.div
          className="mt-8 p-3 rounded-lg bg-gray-900 dark:bg-black border border-gray-700 dark:border-gray-800 font-mono text-xs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-3 h-3 text-green-400" />
            <span className="text-green-400">{certifications.items.length}</span>
            <span>professional certifications verified</span>
            <span className="text-gray-600">•</span>
            <span>{sortedYears.length} years</span>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
