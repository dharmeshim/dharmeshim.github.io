import { BaseSection } from "../components/BaseSection";
import { MinimalHeader } from "../components/MinimalHeader";
import { siteConfig } from "../config/site";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceSection = (): JSX.Element => {
  const { experience } = siteConfig.sections;

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
      <div className="relative w-full max-w-7xl mx-auto pb-16 lg:pb-24">
        <MinimalHeader
          title={experience.title}
          index="01"
          subtitle="Professional Journey"
        />

        <div className="w-full mt-16 flex flex-col pt-8 lg:pt-0">
          {groupedExperiences.map((companyExp, companyIndex) => (
            <CompanyBlock key={companyIndex} companyExp={companyExp} index={companyIndex} />
          ))}
        </div>
      </div>
    </BaseSection>
  );
};

// ----------------------------------------------------------------------
// Awwwards-style Kinetic Typography Component for Company Name
// ----------------------------------------------------------------------
const KineticCompanyTitle = ({ text, fontClass, colorClass }: { text: string, fontClass: string, colorClass: string }) => {
  const words = text.split(' ');

  return (
    <h3
      className={`${fontClass} ${colorClass} text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter break-words leading-[0.9] flex flex-wrap gap-x-3 gap-y-1 mb-2 perspective-[1000px] group/title cursor-default`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="flex">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={cIdx}
              className="inline-block origin-bottom transition-all duration-300 ease-out will-change-transform"
              whileHover={{
                y: -5,
                scale: 1.05,
                rotate: Math.random() * 8 - 4,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <span>{char}</span>
            </motion.span>
          ))}
        </span>
      ))}
    </h3>
  );
};

const CompanyBlock = ({ companyExp, index }: { companyExp: any, index: number }) => {
  const { display: displayFont, secondary: secondaryFont } = siteConfig.styles.fonts;

  return (
    <div className="w-full flex flex-col group/company relative">

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Sticky Left Panel - Pins company info during scroll */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 z-10 will-change-transform">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* New Kinetic Typography Title */}
            <div>
               <KineticCompanyTitle text={companyExp.company} fontClass={displayFont} colorClass={siteConfig.styles.colors.primary} />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-block ${secondaryFont} text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border border-gray-200 dark:border-white/10 rounded-full w-max text-gray-500 dark:text-gray-400 group-hover/company:text-gray-900 dark:group-hover/company:text-white group-hover/company:border-black/30 dark:group-hover/company:border-white/30 transition-colors duration-500`}>
                {companyExp.roles.length > 1 ? `${companyExp.roles.length} Roles` : '1 Role'}
              </span>

              {companyExp.location && (
                <div className={`flex items-center gap-2 ${secondaryFont} text-[10px] text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full font-semibold`}>
                  <MapPin className="w-3 h-3" />
                  <span>{companyExp.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Panel Roles list */}
        <div className="flex-1 w-full space-y-12 lg:pl-12 relative">
          {/* Structural Vertical Grid Line (Continuous, joins top line) */}
          <motion.div
            className="hidden lg:block absolute left-0 -top-16 bottom-0 w-[1.5px] bg-gray-200 dark:bg-white/10 origin-top z-10"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Ambient Vertical Reveal on Hover */}
          <div className="hidden lg:block absolute left-0 -top-16 bottom-0 w-[1.5px] origin-top bg-gray-900 dark:bg-white scale-y-0 group-hover/company:scale-y-100 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none" />

          {companyExp.roles.map((roleData: any, roleIndex: number) => (
            <ExperienceRoleCard role={roleData} key={roleIndex} index={roleIndex} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ExperienceRoleCard = ({ role, index }: { role: any, index: number }) => {
  const { display: displayFont, primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group/role relative flex flex-col gap-4"
    >
      {/* Subtle timeline dot and animated leader line */}
      <div className="hidden lg:block absolute -left-12 top-4 z-20">
        <div className="relative flex items-center">
          {/* Dot on the vertical axis */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: "spring" }}
            className="absolute -left-[3.5px] w-[8px] h-[8px] rounded-full bg-gray-300 dark:bg-white/30 group-hover/role:bg-gray-900 dark:group-hover/role:bg-white group-hover/role:scale-150 group-hover/role:shadow-[0_0_12px_rgba(0,0,0,0.15)] dark:group-hover/role:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-500 will-change-transform z-20"
          />

          {/* Leader Line extending from right edge of dot to text */}
          <motion.div
            className="absolute left-[3.5px] h-[1.5px] w-6 bg-gray-200 dark:bg-white/10 origin-left transition-colors duration-500 group-hover/role:bg-gray-900 dark:group-hover/role:bg-white z-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
        <h4 className={`${displayFont} text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:group-hover/role:text-black dark:lg:group-hover/role:text-white transition-colors duration-500 inline-flex items-center`}>
          <span className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {role.role}
          </span>
        </h4>
        <div className={`flex items-center gap-2 ${secondaryFont} text-xs uppercase tracking-widest text-gray-500 shrink-0 font-medium`}>
          <Calendar className="w-3.5 h-3.5" />
          {role.duration}
        </div>
      </div>

      {role.description && (
        <p className={`${primaryFont} text-base lg:text-lg leading-relaxed text-gray-500 dark:text-gray-400 max-w-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover/role:text-gray-800 dark:lg:group-hover/role:text-gray-200`}>
          {role.description}
        </p>
      )}
    </motion.div>
  )
}
