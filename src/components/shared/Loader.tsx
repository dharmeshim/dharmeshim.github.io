import { TypewriterText } from "../ui/TypewriterText";
import { siteConfig } from "../../config/site";

export const Loader = () => {
  const { secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, background } = siteConfig.styles.colors;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${background} transition-colors duration-300`}>
      <h1 className={`text-3xl ${secondaryFont} ${primaryColor}`}>
        <TypewriterText texts={["hello world"]} speed={100} delay={1000} />
      </h1>
    </div>
  );
}; 