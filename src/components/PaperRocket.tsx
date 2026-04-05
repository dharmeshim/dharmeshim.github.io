import { motion } from "framer-motion";

interface PaperRocketProps {
  className?: string;
}

export const PaperRocket = ({ className = "" }: PaperRocketProps): JSX.Element => {
  // Extract the primary hex for SVG fills if possible, or use standard theme shades
  // We'll use hardcoded shades of the theme green for the origami effect
  const primaryBrand = "#385144";
  const lightBrand = "#527461";
  const darkBrand = "#24352c";

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Main Body - Left Side (Darker) */}
        <motion.path
          d="M50 10 L25 90 L50 110 L50 10Z"
          fill={darkBrand}
          className="dark:fill-green-900"
        />
        
        {/* Main Body - Right Side (Lighter) */}
        <motion.path
          d="M50 10 L75 90 L50 110 L50 10Z"
          fill={primaryBrand}
          className="dark:fill-green-700"
        />
        
        {/* Left Wing */}
        <motion.path
          d="M25 90 L5 105 L25 105 L25 90Z"
          fill={darkBrand}
          className="dark:fill-green-900"
          initial={{ rotate: -5 }}
          animate={{ rotate: 0 }}
        />
        
        {/* Right Wing */}
        <motion.path
          d="M75 90 L95 105 L75 105 L75 90Z"
          fill={lightBrand}
          className="dark:fill-green-500"
          initial={{ rotate: 5 }}
          animate={{ rotate: 0 }}
        />
        
        {/* Center Crease Shade */}
        <path
          d="M50 10 L50 110"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.5"
        />

        {/* Thrust/Tail Effect */}
        <motion.circle
          cx="50"
          cy="115"
          r="2"
          fill={primaryBrand}
          className="dark:fill-green-400"
          animate={{
            scale: [0.5, 2.5, 0.5],
            opacity: [0.3, 0.6, 0],
            y: [0, 20],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.circle
          cx="50"
          cy="115"
          r="1.5"
          fill={primaryBrand}
          className="dark:fill-green-400"
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0.2, 0.5, 0],
            y: [5, 25],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </svg>
    </motion.div>
  );
};
