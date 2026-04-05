import { BaseSection } from "../components/BaseSection";
import { SectionHeader } from "../components/SectionHeader";
import { siteConfig } from "../config/site";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceSection = (): JSX.Element => {
  const { experience } = siteConfig.sections;

  // Group experiences by company
  const groupedExperiences = experience.items.reduce((acc: CompanyExp[], exp) => {
    const existing = acc.find((item) => item.company === exp.company);
    if (existing) {
      existing.roles.push({ role: exp.role, duration: exp.duration, description: exp.description });
    } else {
      acc.push({
        company: exp.company,
        location: exp.location,
        roles: [{ role: exp.role, duration: exp.duration, description: exp.description }],
      });
    }
    return acc;
  }, []);

  return (
    <BaseSection title={experience.title}>
      <div className="relative w-full max-w-7xl mx-auto pb-16 lg:pb-24">
        <SectionHeader
          title={experience.title}
          index="01"
          subtitle="Professional Journey"
        />

        <div className="w-full flex flex-col divide-y divide-gray-100 dark:divide-white/5">
          {groupedExperiences.map((companyExp, i) => (
            <CompanyBlock key={i} companyExp={companyExp} index={i} />
          ))}
        </div>
      </div>
    </BaseSection>
  );
};

/* ─── Types ────────────────────────────────────────────────────────────────── */
interface Role {
  role: string;
  duration: string;
  description: string;
}
interface CompanyExp {
  company: string;
  location: string;
  roles: Role[];
}

/* ─── Company Block ────────────────────────────────────────────────────────── */
const CompanyBlock = ({ companyExp, index }: { companyExp: CompanyExp; index: number }) => {
  const { secondary: monoFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, accent, accentSoft, accentBg, accentBorder } = siteConfig.styles.colors;

  return (
    <div className="group/company w-full py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20">

        {/* ─── Left: Company info (NOT sticky) ─── */}
        <motion.div
          className="lg:w-2/5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
        >
          <h3
            className="font-black uppercase leading-[0.9] tracking-tighter"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            {companyExp.company.split(' ').map((word, wi) => (
              <span key={wi} className={wi % 2 === 0 ? `text-gray-900 dark:text-white` : `${primaryColor}`}>
                {word}{' '}
              </span>
            ))}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className={`${monoFont} text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border ${accentBorder} ${accentSoft} rounded-full text-gray-500 dark:text-gray-400`}>
              {companyExp.roles.length > 1 ? `${companyExp.roles.length} Roles` : '1 Role'}
            </span>
            {companyExp.location && (
              <div className={`flex items-center gap-1.5 ${monoFont} text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest`}>
                <MapPin className="w-3 h-3" />
                <span>{companyExp.location}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── Right: Roles ─── */}
        <div className="flex-1 w-full relative lg:pl-12">
          {/* Vertical rule */}
          <motion.div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Hover accent line */}
          <div className={`hidden lg:block absolute left-0 top-0 bottom-0 w-px origin-top scale-y-0 group-hover/company:scale-y-100 ${accentBg} transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none`} />

          <div className="space-y-12 lg:space-y-16">
            {companyExp.roles.map((role, ri) => (
              <RoleCard key={ri} role={role} index={ri} accent={accent} accentBg={accentBg} monoFont={monoFont} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Role Card ─────────────────────────────────────────────────────────────── */
const RoleCard = ({ role, index, accent, accentBg, monoFont }: { role: Role; index: number; accent: string; accentBg: string; monoFont: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group/role relative flex flex-col gap-3"
    >
      {/* Timeline dot */}
      <div className="hidden lg:block absolute -left-12 top-3">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: index * 0.12 + 0.25 }}
          className={`w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 group-hover/role:${accentBg.split(' ')[0].replace('bg-', 'bg-')} dark:group-hover:bg-green-400 transition-colors duration-400`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
        <h4
          className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {role.role}
        </h4>
        <div className={`flex items-center gap-2 ${monoFont} text-[10px] uppercase tracking-widest text-gray-400 shrink-0`}>
          <Calendar className="w-3.5 h-3.5" />
          {role.duration}
        </div>
      </div>

      {role.description && (
        <p className="text-sm lg:text-base leading-relaxed text-gray-500 dark:text-gray-400 max-w-2xl group-hover/role:text-gray-700 dark:group-hover/role:text-gray-300 transition-colors duration-400"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          {role.description}
        </p>
      )}

      {/* Accent tag */}
      <div className={`flex items-center gap-2 mt-1`}>
        <div className={`w-4 h-px ${accent.replace('text-', 'bg-')} opacity-60`} />
        <span className={`${monoFont} text-[9px] uppercase tracking-[0.2em] ${accent} opacity-60`}>
          {index === 0 ? 'Current' : 'Previous'}
        </span>
      </div>
    </motion.div>
  );
};
