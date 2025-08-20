import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { BaseSection } from "../../../../components/sections/BaseSection";
import { siteConfig } from "../../../../config/site";

export const TestimonialsSection = (): JSX.Element => {
  const { testimonials } = siteConfig.sections;
  const { primary: primaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor } = siteConfig.styles.colors;
  const { itemGap } = siteConfig.styles.spacing;

  return (
    <BaseSection title={testimonials.title}>
      <div className={`${itemGap}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {testimonials.items.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-none bg-transparent p-0"
            >
              <CardContent className="p-0 space-y-3 md:space-y-4">
                <div className={`${primaryFont} font-light ${primaryColor} text-base md:text-lg leading-relaxed italic`}>
                  "{testimonial.text}"
                </div>
                <div className="space-y-1 md:space-y-1">
                  <div className={`${primaryFont} font-bold ${primaryColor} text-base md:text-lg`}>
                    {testimonial.name}
                  </div>
                  {testimonial.role && (
                    <div className={`${primaryFont} font-medium ${secondaryColor} text-sm md:text-base opacity-70`}>
                      {testimonial.role}
                    </div>
                  )}
                  {testimonial.company && (
                    <div className={`${primaryFont} font-medium ${secondaryColor} text-sm md:text-base opacity-70`}>
                      {testimonial.company}
                    </div>
                  )}
                  {testimonial.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 dark:text-yellow-400">★</span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};
