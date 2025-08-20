import React, { useState } from "react";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";
import { Calendar, Award, ExternalLink, Star, Zap } from "lucide-react";

export const CertificationsSection = (): JSX.Element => {
  const { certifications } = siteConfig.sections;
  const { primary: primaryFont, secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, muted: mutedColor, accent: accentColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;
  const { normal: normalTransition } = siteConfig.styles.transitions;

  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  // Group certifications by year for better organization
  const groupedCerts = certifications.items.reduce((acc: any, cert: any) => {
    const year = cert.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(cert);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedCerts).sort((a, b) => parseInt(b) - parseInt(a));
  
  // Set default selected year to the latest year
  const [selectedYear, setSelectedYear] = useState<string>(sortedYears[0] || "");

  return (
    <BaseSection title={certifications.title}>
      <div className={`${itemGap}`}>
        {/* Year Headers in Single Row */}
        <div className="flex flex-wrap gap-3 mb-12">
          {sortedYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${
                selectedYear === year
                  ? "bg-blue-500 dark:bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
              }`}
            >
              <Calendar className={`w-4 h-4 ${
                selectedYear === year
                  ? "text-white"
                  : "text-blue-500 dark:text-green-400"
              }`} />
              <span className={`${secondaryFont} font-medium text-base`}>
                {year}
              </span>
            </button>
          ))}
        </div>

        {/* Certifications for Selected Year */}
        {selectedYear && (
          <div className="space-y-8">
            {/* Certifications Grid for selected year */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {groupedCerts[selectedYear].map((cert: any, index: number) => (
                <div
                  key={index}
                  className={`group relative p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-green-400 transition-all duration-500 hover:scale-105 cursor-pointer ${normalTransition}`}
                  onMouseEnter={() => setHoveredCert(cert.name)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  {/* Certification Badge */}
                  <div className="absolute -top-2 left-4">
                    <div className="px-2 py-1 bg-blue-100 dark:bg-green-900 text-blue-800 dark:text-green-200 rounded-full text-xs font-bold">
                      <Award className="inline w-3 h-3 mr-1" />
                      Certified
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Icon */}
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-green-900 group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-6 h-6 text-blue-500 dark:text-green-400" />
                      </div>
                    </div>

                    {/* Certification Name */}
                    <h4 className={`${primaryFont} font-light ${primaryColor} text-lg text-center tracking-tight leading-tight`}>
                      {cert.name}
                    </h4>

                    {/* Issuer */}
                    {cert.issuer && (
                      <div className="text-center">
                        <p className={`${secondaryFont} font-medium ${accentColor} text-sm`}>
                          {cert.issuer}
                        </p>
                      </div>
                    )}

                    {/* Year */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                        <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className={`${secondaryFont} text-xs ${mutedColor} font-mono`}>
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    {/* View Certificate Link */}
                    {cert.link && (
                      <div className="text-center pt-2">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors duration-300 group-hover:scale-105 ${normalTransition}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="text-xs font-medium">View Certificate</span>
                        </a>
                      </div>
                    )}
                  </div>
               
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseSection>
  );
};
