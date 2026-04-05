import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = (): JSX.Element => {
    const [isSpreading, setIsSpreading] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleToggle = () => {
        setIsSpreading(true);
        setTimeout(() => {
            toggleDarkMode();
            setIsSpreading(false);
        }, 300);
    };

    return (
        <>
            {/* Color Spreading Overlay */}
            <AnimatePresence>
                {isSpreading && (
                    <motion.div
                        className="fixed inset-0 z-[70] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute top-8 right-8 w-12 h-12 bg-[#385144] rounded-full dark:bg-green-400"
                            initial={{ scale: 0, opacity: 0.8 }}
                            animate={{ scale: 100, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Theme Toggle Button */}
            <motion.button
                onClick={handleToggle}
                className={`fixed top-8 right-8 z-50 p-2 cursor-pointer transition-all duration-400 rounded-full
          ${isDarkMode
                        ? 'text-white hover:bg-white/10'
                        : 'text-gray-900 hover:bg-black/5'
                    }`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isDarkMode ? 0 : 180 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                        <Moon className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                </motion.div>
            </motion.button>
        </>
    );
};
