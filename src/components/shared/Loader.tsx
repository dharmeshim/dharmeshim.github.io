import React from "react";
import { siteConfig } from "../../config/site";
import { motion } from "framer-motion";

interface LoaderProps {
    progress?: number;
    status?: string;
}

export const Loader: React.FC<LoaderProps> = ({ progress = 0, status = "Initializing..." }) => {
    const { primary: primaryColor, background } = siteConfig.styles.colors;

    return (
        <motion.div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${background} transition-colors duration-300 overflow-hidden font-mono`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative w-full max-w-md px-6 flex flex-col items-center">
                {/* Loading Header */}
                <div className="w-full flex justify-between items-end mb-2 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span>System Boot</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                {/* Technical Progress Bar */}
                <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-6">
                    <motion.div
                        className="h-full bg-blue-500 dark:bg-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    />
                </div>

                {/* Status Messages */}
                <div className="w-full h-24 overflow-hidden relative">
                    <div className="absolute bottom-0 left-0 w-full flex flex-col-reverse items-start space-y-reverse space-y-1">
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-xs ${primaryColor} flex items-center gap-2`}
                        >
                            <span className="opacity-40">{">"}</span>
                            <span className="truncate">{status}</span>
                        </motion.div>

                        <div className="text-[10px] text-gray-400 dark:text-gray-600 opacity-60 flex items-center gap-2">
                            <span className="opacity-40">{">"}</span>
                            <span>GET /assets/resources/main_stack.json 200 OK</span>
                        </div>

                        <div className="text-[10px] text-gray-400 dark:text-gray-600 opacity-40 flex items-center gap-2">
                            <span className="opacity-40">{">"}</span>
                            <span>Authenticating system kernel... DONE</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Metadata */}
                <div className="mt-12 flex items-center gap-4 text-[9px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-tighter">
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 dark:bg-green-400/50 animate-pulse" />
                        <span>Process ID: {Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <span>v1.0.42-stable</span>
                </div>
            </div>
        </motion.div>
    );
};
