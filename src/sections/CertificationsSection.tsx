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
      <div className="relative w-full max-w-7xl mx-auto py-16 lg:py-24" ref={ref}>
        <MinimalHeader 
          title={certifications.title} 
          index="06" 
          subtitle="Achievements" 
        />

        {/* Year Navigator (Swiftable) */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-16 lg:mb-24 mt-12"
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
                relative px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all duration-300
                ${activeYear === year
                  ? 'text-white dark:text-black z-10'
                  : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}
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
            className="space-y-12 w-full"
          >
            {/* Year Indicator (Fluid Background) */}
            <div className="relative w-full">
              <div className={`${secondaryFont} text-[6rem] sm:text-7xl lg:text-[14rem] font-black opacity-[0.03] dark:opacity-[0.04] absolute -left-4 sm:-left-8 -top-12 lg:-top-32 pointer-events-none select-none tracking-tighter`}>
                {activeYear}
              </div>

              {/* Certifications for selected year */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-12 gap-x-16 xl:gap-x-24 relative z-10 pt-8 lg:pt-16">
                {groupedByYear[activeYear].map((cert: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-row gap-5 lg:gap-8 items-start relative w-full"
                  >
                    {/* Visual Marker */}
                    <div className="flex-shrink-0 relative mt-1">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-[2rem] bg-blue-500/5 dark:bg-green-400/5 border border-blue-500/10 dark:border-green-400/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 dark:group-hover:bg-green-400/10 transition-all duration-500 shadow-xl dark:shadow-none">
                        <Award className="w-5 h-5 lg:w-7 lg:h-7 text-blue-500 dark:text-green-400 group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3 lg:space-y-4">
                      <div className="flex items-center gap-3 lg:gap-4 text-gray-400">
                        <span className={`${secondaryFont} text-[10px] lg:text-xs font-bold uppercase tracking-widest`}>{cert.issuer}</span>
                        <Minus className="w-4 lg:w-6 h-[1px] opacity-20" />
                        <span className="font-mono text-[10px] lg:text-xs">{cert.year}</span>
                      </div>

                      <h3 className={`${primaryFont} text-xl lg:text-3xl font-bold ${primaryColor} tracking-tight group-hover:text-blue-500 dark:group-hover:text-green-400 transition-colors leading-[1.2]`}>
                        {cert.name}
                      </h3>

                      {cert.link && (
                        <div className="pt-2">
                          <motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs font-bold text-gray-500 hover:text-blue-500 dark:hover:text-green-400 transition-colors uppercase tracking-[0.2em]"
                            whileHover={{ x: 5 }}
                          >
                            <span>Verify Credential</span>
                            <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                          </motion.a>
                        </div>
                      )}
                    </div>

                    {/* Accent Background (Fluid) */}
                    <div className="absolute inset-0 -mx-6 lg:-mx-8 -my-6 lg:-my-8 rounded-[2rem] lg:rounded-[3rem] bg-blue-500/[0.02] dark:bg-green-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Knowledge-style Stats Footer */}
        <motion.div
          className="mt-20 lg:mt-32 pt-12 border-t border-gray-200 dark:border-white/5 flex flex-wrap justify-between items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4 text-gray-500">
            <span className="w-8 h-px bg-blue-500 dark:bg-green-400" />
            <span className={`${secondaryFont} text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em]`}>Continuous Validation</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            <div className="text-center">
              <div className={`${secondaryFont} text-2xl lg:text-4xl font-black ${primaryColor} tracking-tighter`}>{certifications.items.length}</div>
              <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-1">Achievements</div>
            </div>
            <div className="text-center">
              <div className={`${secondaryFont} text-2xl lg:text-4xl font-black ${primaryColor} tracking-tighter`}>{years.length}</div>
              <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-1">Year Volumes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
