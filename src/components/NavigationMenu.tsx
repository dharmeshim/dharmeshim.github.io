import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Sun } from "lucide-react";
import { siteConfig } from "../config/site";
import { scrollToSection, getSectionId } from "../lib/navigation";
import { useDarkMode } from "../hooks/useDarkMode";

interface NavigationMenuProps {
  activeSection: string;
  progress: number[];
}

export const NavigationMenu = ({ activeSection }: NavigationMenuProps): JSX.Element => {
  const { navigation, styles } = siteConfig;
  const { secondary: monoFont } = styles.fonts;
  const { accent, accentBorderFull } = styles.colors;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navItems = navigation.items.map((item) => ({
    ...item,
    isActive: getSectionId(item.href) === activeSection,
  }));

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileOpen(false);
  };

  const handleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <>
      {/* ─── Desktop: Centered floating glassmorphic pill ─── */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center"
        aria-label="Main navigation"
      >
        <motion.div
          className="flex items-center gap-1 px-3 py-2.5 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/40"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <NavPill
              key={index}
              item={item}
              monoFont={monoFont}
              onNavigate={handleNavClick}
            />
          ))}

          {/* Divider */}
          <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />

          {/* Dark mode toggle */}
          <motion.button
            onClick={handleDarkMode}
            className={`relative p-2 rounded-xl transition-all duration-300 ${
              isDarkMode
                ? "bg-white/10 text-white hover:bg-white/20"
                : "text-gray-600 hover:bg-black/5"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.div
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>
      </nav>

      {/* ─── Mobile: Bottom bar + slide-up drawer ─── */}
      <div className="md:hidden">
        {/* Bottom bar */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/8"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Active section label */}
          <span className={`${monoFont} text-[10px] uppercase tracking-[0.25em] ${accent}`}>
            {navItems.find((n) => n.isActive)?.label ?? "Home"}
          </span>

          <div className="flex items-center gap-3">
            {/* Dark mode */}
            <button
              onClick={handleDarkMode}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="flex flex-col gap-1.5 p-2 rounded-xl"
              aria-label="Open navigation"
            >
              <span className={`w-5 h-px ${isDarkMode ? "bg-white" : "bg-gray-900"} block`} />
              <span className={`w-3 h-px ${isDarkMode ? "bg-white" : "bg-gray-900"} block`} />
            </button>
          </div>
        </motion.div>

        {/* Full-screen drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="fixed inset-0 z-[60] bg-white dark:bg-black flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className={`absolute top-8 right-8 p-3 rounded-full border ${accentBorderFull} ${accent}`}
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Nav items */}
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-4xl font-bold tracking-tight transition-colors duration-300 ${
                      item.isActive
                        ? accent
                        : "text-gray-300 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Index counter */}
              <motion.div
                className={`absolute bottom-12 left-8 ${monoFont} text-[10px] tracking-[0.3em] uppercase text-gray-400`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {String(navItems.findIndex((n) => n.isActive) + 1).padStart(2, "0")} /{" "}
                {String(navItems.length).padStart(2, "0")}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

/* ─── Nav Pill Item ─────────────────────────────────────────────────────────── */
interface NavPillProps {
  item: { label: string; href: string; isActive: boolean };
  monoFont: string;
  onNavigate: (href: string) => void;
}

const NavPill = ({ item, monoFont, onNavigate }: NavPillProps) => {
  return (
    <motion.button
      onClick={() => onNavigate(item.href)}
      className={`relative px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-colors duration-200 ${
        item.isActive
          ? "text-[#385144] dark:text-green-400"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      } ${monoFont}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {item.isActive && (
        <motion.div
          layoutId="navActivePill"
          className="absolute inset-0 rounded-xl bg-[#385144]/8 dark:bg-green-400/10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </motion.button>
  );
};