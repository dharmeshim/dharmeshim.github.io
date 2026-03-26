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
      <div className="relative w-full max-w-7xl mx-auto py-16 lg:py-24" ref={ref}>
        <motion.div
          className="space-y-16 lg:space-y-24 relative"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <MinimalHeader 
            title={education.title} 
            index="03" 
            subtitle="Academic Background" 
          />
          
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 relative pt-12">
            
            {/* Structural Connecting Line for entire timeline */}
            <div className="absolute left-[23px] lg:left-[39px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent dark:from-green-400/20 dark:via-cyan-400/20 block" />

            <div className="flex-1 w-full space-y-16 lg:space-y-20 relative z-10 w-full">
              {education.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative flex flex-row gap-6 sm:gap-8 lg:gap-12 items-start"
                >
                  {/* Visual Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-2xl lg:rounded-[2rem] bg-white dark:bg-neutral-900 border-2 border-blue-500/20 dark:border-green-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 dark:group-hover:bg-green-400/10 transition-all duration-500 shadow-xl dark:shadow-none">
                      <GraduationCap className="w-5 h-5 lg:w-8 lg:h-8 text-blue-500 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col xl:flex-row xl:justify-between xl:items-start gap-6 pt-1 lg:pt-3">
                    <div className="space-y-3 lg:space-y-4 max-w-3xl">
                      <div className="flex items-center gap-2 lg:gap-4">
                        <School className="w-4 h-4 text-gray-400" />
                        <span className={`${secondaryFont} text-[10px] lg:text-sm font-bold uppercase tracking-widest text-gray-500`}>
                          {item.institution}
                        </span>
                      </div>

                      <h3 className={`${displayFont} text-3xl sm:text-4xl lg:text-5xl font-bold ${primaryColor} tracking-tighter leading-none group-hover:text-blue-500 dark:group-hover:text-green-400 transition-colors`}>
                        {item.course}
                      </h3>

                      {item.branch && (
                        <p className={`${primaryFont} text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight`}>
                          {item.branch}
                        </p>
                      )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex flex-row xl:flex-col gap-4 lg:gap-3 items-center xl:items-end text-[10px] lg:text-xs font-mono text-gray-400 shrink-0 opacity-80 pt-2 xl:pt-4">
                      <div className="flex items-center gap-2">
                        <span>{item.duration}</span>
                        <Calendar className="w-3.5 h-3.5 opacity-40 xl:order-last" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{item.location}</span>
                        <MapPin className="w-3.5 h-3.5 opacity-40 xl:order-last" />
                      </div>
                    </div>

                    {/* Decorative Accent Background */}
                    <div className="absolute inset-0 -mx-6 lg:-mx-10 -my-6 lg:-my-8 rounded-[2rem] bg-gradient-to-r from-blue-500/[0.03] dark:from-green-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </BaseSection>
  );
};
