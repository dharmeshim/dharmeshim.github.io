import { BaseSection } from "../components/BaseSection";
import { MinimalHeader } from "../components/MinimalHeader";
import { siteConfig } from "../config/site";
import { Calendar, MapPin, GraduationCap, School } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../lib/animations";
import { useInView } from "../hooks/useInView";

export const EducationSection = (): JSX.Element => {
  const { education } = siteConfig.sections;
  const { display: displayFont, primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor } = siteConfig.styles.colors;

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <BaseSection title={education.title}>
      <div className="w-full max-w-5xl mx-auto py-12" ref={ref}>
        <motion.div
          className="space-y-20 relative"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <MinimalHeader 
            title={education.title} 
            index="03" 
            subtitle="Academic Background" 
          />
          {/* Vertical Connecting Line */}
          <div className="absolute left-[23px] md:left-[31px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent dark:from-green-400/20 dark:via-cyan-400/20 block" />

          {education.items.map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group relative flex flex-row gap-6 md:gap-8 items-start"
            >
              {/* Visual Node */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] bg-white dark:bg-neutral-900 border-2 border-blue-500/20 dark:border-green-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 dark:group-hover:bg-green-400/10 transition-all duration-500 shadow-xl dark:shadow-none">
                  <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-blue-500 dark:text-green-400" />
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 space-y-4 md:space-y-6 pt-1 md:pt-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 md:gap-3">
                    <School className="w-3 h-3 md:w-4 h-4 text-gray-400" />
                    <span className={`${secondaryFont} text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500`}>
                      {item.institution}
                    </span>
                  </div>

                  <h3 className={`${displayFont} text-2xl md:text-4xl lg:text-5xl font-bold ${primaryColor} tracking-tighter leading-none group-hover:text-blue-500 dark:group-hover:text-green-400 transition-colors`}>
                    {item.course}
                  </h3>

                  {item.branch && (
                    <p className={`${primaryFont} text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400 font-medium tracking-tight`}>
                      {item.branch}
                    </p>
                  )}
                </div>

                {/* Metadata Footer (Integrated) */}
                <div className="flex flex-wrap gap-4 md:gap-8 items-center text-[10px] md:text-xs font-mono text-gray-400 pt-2 md:pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 md:w-4 h-4 opacity-40" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 md:w-4 h-4 opacity-40" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Decorative Accent Background */}
                <div className="absolute inset-0 -mx-8 -my-6 rounded-[3rem] bg-gradient-to-r from-blue-500/[0.03] dark:from-green-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </BaseSection>
  );
};
