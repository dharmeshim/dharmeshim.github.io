import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
    Home,
    User,
    Briefcase,
    Share2,
    Mail
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "../../config/site";
import { scrollToSection } from "../../lib/navigation";

const dockItems = [
    { id: "home", icon: Home, label: "Home", target: "#home" },
    { id: "experience", icon: User, label: "Exp", target: "#experience" },
    { id: "projects", icon: Briefcase, label: "Work", target: "#projects" },
    { id: "share", icon: Share2, label: "Share", target: "share" },
    { id: "contact", icon: Mail, label: "Mail", target: "#contact" },
];

interface SystemDockProps {
    containerRef?: React.RefObject<HTMLDivElement>;
}

export const SystemDock: React.FC<SystemDockProps> = ({ containerRef }): JSX.Element => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const scrollStopTimeout = useRef<NodeJS.Timeout | null>(null);

    const { scrollY } = useScroll({
        container: containerRef
    });

    useMotionValueEvent(scrollY, "change", (latest) => {
        // 1. Hide immediately when scrolling starts
        setIsVisible(false);

        // 2. Clear existing timeout
        if (scrollStopTimeout.current) {
            clearTimeout(scrollStopTimeout.current);
        }

        // 3. Set timeout to show after scrolling stops
        scrollStopTimeout.current = setTimeout(() => {
            // Only show if we are past the Hero section (e.g., 100px)
            if (latest > 100) {
                setIsVisible(true);
            }
        }, 150); // Delay before dock emerges
    });

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);
        };
    }, []);

    const handleAction = async (item: typeof dockItems[0]) => {
        if (item.id === "share") {
            const shareData = {
                title: siteConfig.name,
                text: `Check out ${siteConfig.name}'s portfolio! ${siteConfig.description}`,
                url: window.location.origin
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback to copying link or opening mail
                    const shareUrl = `${window.location.origin}\n\nResume: ${window.location.origin}${siteConfig.sections.contact.resume.link}`;
                    await navigator.clipboard.writeText(shareUrl);
                    alert("Portfolio and Resume links copied to clipboard!");
                }
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            scrollToSection(item.id);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-6 inset-x-0 mx-auto w-fit z-[100]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                    <div
                        className="relative group flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-white/95 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-2xl transition-all duration-300"
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {/* Dock Items */}
                        {dockItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleAction(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                className="relative flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                whileHover={{ y: -8, scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <item.icon size={20} className={hoveredItem === item.id ? "text-blue-500 dark:text-green-400" : ""} />

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {hoveredItem === item.id && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                            animate={{ opacity: 1, y: -45, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                            className="absolute px-3 py-1 bg-neutral-900 text-white text-[10px] font-mono rounded-md pointer-events-none whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}

                        {/* Ambient indicator */}
                        <div className="absolute -bottom-1 inset-x-0 mx-auto w-8 h-1 bg-blue-500/20 dark:bg-green-400/20 rounded-full blur-sm" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
