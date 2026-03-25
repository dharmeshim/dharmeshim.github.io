import { BaseSection } from "../components/BaseSection";
import { MinimalHeader } from "../components/MinimalHeader";
import { siteConfig } from "../config/site";
import { Calendar, MapPin, Building2, GitCommit } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../lib/animations";
import { useInView } from "../hooks/useInView";

export const ExperienceSection = (): JSX.Element => {
  const { experience } = siteConfig.sections;

  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

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
      <div className="relative w-full max-w-6xl mx-auto" ref={inViewRef}>
        <motion.div
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
           variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.2 } }
           }}
        >
          <MinimalHeader 
            title={experience.title} 
            index="01" 
            subtitle="Career Timeline" 
          />
          {/* Main Git Branch Line */}
          <div className="absolute left-8 lg:left-1/2 top-4 bottom-4 w-1 lg:-translate-x-1/2 overflow-hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-pink-500/20 dark:from-green-400/20 dark:via-cyan-400/50 dark:to-blue-400/20 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </div>

          <motion.div
            className="space-y-12 md:space-y-32 relative pt-8"
            variants={staggerContainer}
          >
            {groupedExperiences.map((companyExp, companyIndex) => {
              const isLeft = companyIndex % 2 === 0;
              return (
                <motion.div
                  key={companyIndex}
                  className={`flex flex-row lg:flex-row items-start lg:items-center justify-start lg:justify-center w-full group`}
                  variants={staggerItem}
                >
                  {/* Left Side (Desktop Only) */}
                  <div className={`hidden lg:block w-1/2 px-12 text-right ${!isLeft ? 'invisible pointer-events-none' : ''}`}>
                    <ExperienceContent companyExp={companyExp} align="right" />
                  </div>

                  {/* Center Node (Commit) */}
                  <div className="relative z-10 w-16 lg:w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <motion.div
                      className={`w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-blue-500 dark:border-green-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(52,211,153,0.5)]`}
                      whileHover={{ scale: 1.5 }}
                    />
                    {/* Decorative Branch Line */}
                    <div className={`absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-green-400/30 to-transparent w-32 hidden lg:block ${isLeft ? 'left-8' : 'right-8'}`} />
                  </div>

                  {/* Right Side / Mobile Content */}
                  <div className={`flex-1 lg:w-1/2 px-4 md:px-12 text-left ${isLeft ? 'lg:invisible lg:pointer-events-none' : ''}`}>
                    <ExperienceContent companyExp={companyExp} align="left" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </BaseSection>
  );
};

const ExperienceContent = ({ companyExp, align }: { companyExp: any, align: 'left' | 'right' }) => {
  const { display: displayFont, primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, muted: mutedColor } = siteConfig.styles.colors;

  return (
    <div
      className={`space-y-6 ${align === 'right' ? 'lg:items-end' : 'lg:items-start'} group/exp`}
    >
      {/* Company Tag */}
      <motion.div
        className={`flex items-center gap-2 ${secondaryFont} text-xs font-bold uppercase tracking-widest ${mutedColor}`}
        whileHover={{ x: align === 'right' ? -4 : 4 }}
      >
        <Building2 className="w-4 h-4 text-blue-500 dark:text-green-400" />
        <span>{companyExp.company}</span>
      </motion.div>

      {/* Roles List */}
      <div className="space-y-8">
        {companyExp.roles.map((roleData: any, roleIndex: number) => (
          <div key={roleIndex} className="space-y-3">
            <h3 className={`${displayFont} text-3xl lg:text-4xl font-bold ${primaryColor} tracking-tighter`}>
              {roleData.role}
            </h3>
            <div className={`flex items-center gap-3 ${secondaryFont} text-[10px] uppercase tracking-wider ${mutedColor} ${align === 'right' ? 'lg:justify-end' : ''}`}>
              <Calendar className="w-3 h-3" />
              <span>{roleData.duration}</span>
              {companyExp.location && (
                <>
                  <span className="opacity-30">|</span>
                  <MapPin className="w-3 h-3" />
                  <span>{companyExp.location}</span>
                </>
              )}
            </div>
            {roleData.description && (
              <p className={`${primaryFont} text-base lg:text-lg leading-relaxed text-gray-500 dark:text-gray-400 max-w-xl ${align === 'right' ? 'lg:ml-auto' : ''}`}>
                {roleData.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Git Footprint (Playful) */}
      <div className={`flex gap-2 items-center text-[10px] font-mono opacity-20 ${align === 'right' ? 'lg:justify-end' : ''}`}>
        <GitCommit className="w-3 h-3" />
        <span>7 commits merged to main</span>
      </div>
    </div>
  );
};
