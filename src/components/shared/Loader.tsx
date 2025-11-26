import { TypewriterText } from "../ui/TypewriterText";
import { siteConfig } from "../../config/site";
import { motion } from "framer-motion";
import { fadeIn, scaleIn } from "../../lib/animations";

export const Loader = () => {
  const { secondary: secondaryFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, background } = siteConfig.styles.colors;

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${background} transition-colors duration-300`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className={`text-3xl ${secondaryFont} ${primaryColor}`}
        initial="hidden"
        animate="visible"
        variants={scaleIn}
      >
        <TypewriterText texts={["hello world"]} speed={100} delay={1000} />
      </motion.h1>
    </motion.div>
  );
};