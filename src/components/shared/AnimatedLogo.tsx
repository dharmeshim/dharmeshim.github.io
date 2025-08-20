import { useMemo, useEffect, useState } from "react";
import { siteConfig } from "../../config/site";

export const AnimatedLogo = (): JSX.Element => {
  const { logo } = siteConfig.layout;
  const { primary: primaryColor } = siteConfig.styles.colors;
  const { name } = siteConfig;

  return (
    <div
      className="fixed top-8 left-8 z-40 transition-all duration-500 ease-out"
    >
      <div
        className={`${logo.scrolledSize} ${primaryColor} flex items-center justify-center font-bold text-center leading-none transition-all duration-500 ease-out`}
      >
        <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{name}</span>
      </div>
    </div>
  );
};