import { useState } from "react";
import { BaseSection } from "../components/BaseSection";
import { siteConfig } from "../config/site";
import { MinimalHeader } from "../components/MinimalHeader";
import { Award, ExternalLink, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp } from "../lib/animations";
import { useInView } from "../hooks/useInView";

export const CertificationsSection = (): JSX.Element => {
  const { certifications } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Group certifications by year
  const groupedByYear = certifications.items.reduce((acc: any, cert: any) => {
    const year = cert.year || 'Other';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(cert);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
    <BaseSection title={certifications.title}>
      <div className="w-full max-w-5xl mx-auto py-12" ref={ref}>
        <MinimalHeader 
          title={certifications.title} 
          index="06" 
          subtitle="Achievements" 
        />

        {/* Year Navigator (Swiftable) */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {years.map((year) => (
            <motion.button
              key={year}
              variants={staggerItem}
              onClick={() => setActiveYear(year)}
              className={`
                relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                ${activeYear === year
                  ? 'text-white dark:text-black z-10'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}
              `}
            >
              {activeYear === year && (
                <motion.div
                  layoutId="activeYearBg"
                  className="absolute inset-0 bg-blue-500 dark:bg-green-400 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {year}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="space-y-12"
          >
            {/* Year Indicator (Fluid Background) */}
            <div className="relative">
              <div className={`${secondaryFont} text-7xl lg:text-[12rem] font-black opacity-[0.03] dark:opacity-[0.05] absolute -left-8 -top-16 lg:-top-32 pointer-events-none select-none`}>
                {activeYear}
              </div>

              {/* Certifications for selected year */}
              <div className="space-y-12 relative z-10">
                {groupedByYear[activeYear].map((cert: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-row gap-6 md:gap-8 items-center relative"
                  >
                    {/* Visual Marker */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-blue-500/5 dark:bg-green-400/5 border border-blue-500/10 dark:border-green-400/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 dark:group-hover:bg-green-400/10 transition-all duration-500">
                        <Award className="w-5 h-5 md:w-6 md:h-6 text-blue-500 dark:text-green-400 group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2 md:space-y-3">
                      <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                        <span className={`${secondaryFont} text-[9px] md:text-[10px] font-bold uppercase tracking-widest`}>{cert.issuer}</span>
                        <Minus className="w-3 md:w-4 h-[1px] opacity-20" />
                        <span className="font-mono text-[9px] md:text-[10px]">{cert.year}</span>
                      </div>

                      <h3 className={`${primaryFont} text-xl md:text-2xl lg:text-3xl font-bold ${primaryColor} tracking-tight group-hover:text-blue-500 dark:group-hover:text-green-400 transition-colors`}>
                        {cert.name}
                      </h3>

                      {cert.link && (
                        <motion.a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-gray-400 hover:text-blue-500 dark:hover:text-green-400 transition-colors uppercase tracking-widest pt-1 md:pt-2"
                          whileHover={{ x: 5 }}
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="w-2.5 h-2.5 md:w-3 h-3" />
                        </motion.a>
                      )}
                    </div>

                    {/* Accent Background (Fluid) */}
                    <div className="absolute inset-0 -mx-6 -my-4 rounded-[40px] bg-blue-500/[0.02] dark:bg-green-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Knowledge-style Stats Footer */}
        <motion.div
          className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4 text-gray-500">
            <span className="w-8 h-[2px] bg-blue-500 dark:bg-green-400" />
            <span className={`${secondaryFont} text-xs font-bold uppercase tracking-[0.3em]`}>Continuous Validation</span>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <div className={`${secondaryFont} text-2xl font-bold ${primaryColor}`}>{certifications.items.length}</div>
              <div className="text-[9px] uppercase tracking-widest text-gray-500">Achievements</div>
            </div>
            <div className="text-center">
              <div className={`${secondaryFont} text-2xl font-bold ${primaryColor}`}>{years.length}</div>
              <div className="text-[9px] uppercase tracking-widest text-gray-500">Year Volumes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
