import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";

export const Inspector = (): JSX.Element => {
    const [data, setData] = useState<Record<string, any>>({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleInspect = (e: any) => {
            if (e.detail) {
                setData(e.detail.data || {});
                setIsVisible(e.detail.visible);
            }
        };

        window.addEventListener("portfolio-inspect", handleInspect);
        return () => window.removeEventListener("portfolio-inspect", handleInspect);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 10 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.95,
                x: isVisible ? 0 : 10
            }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`fixed top-8 right-8 z-[110] w-64 pointer-events-none ${isVisible ? 'block' : 'hidden'}`}
        >
            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-gray-200 dark:border-green-400/20 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-3 border-b border-gray-200 dark:border-green-400/10 pb-2">
                    <Info size={14} className="text-blue-500 dark:text-green-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        Properties Inspector
                    </span>
                </div>

                <div className="space-y-2">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-mono uppercase text-gray-400 dark:text-gray-600 tracking-wide">
                                {key}
                            </span>
                            <span className="text-xs font-mono text-gray-800 dark:text-gray-200 break-words font-medium">
                                {Array.isArray(value) ? `[${value.join(", ")}]` : value}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 dark:bg-green-400/50 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20 dark:bg-green-400/20" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/10 dark:bg-green-400/10" />
                    </div>
                    <span className="text-[8px] font-mono text-gray-400/40 uppercase">
                        System Live
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
