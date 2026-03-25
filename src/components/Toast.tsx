import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ToastMessage {
    id: string;
    type: 'info' | 'success' | 'warning';
    message: string;
}

export const Toast = (): JSX.Element => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    useEffect(() => {
        const handleToast = (e: any) => {
            if (e.detail) {
                const id = Math.random().toString(36).substr(2, 9);
                const newMessage = { id, ...e.detail };
                setMessages(prev => [...prev, newMessage]);

                setTimeout(() => {
                    setMessages(prev => prev.filter(m => m.id !== id));
                }, 4000);
            }
        };

        window.addEventListener("portfolio-toast", handleToast);
        return () => window.removeEventListener("portfolio-toast", handleToast);
    }, []);

    return (
        <div className="fixed top-8 right-8 z-[120] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {messages.map((m) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        className="flex items-center gap-3 px-4 py-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-gray-200 dark:border-green-400/20 rounded-xl shadow-xl min-w-[200px]"
                    >
                        {m.type === 'success' && <CheckCircle size={16} className="text-green-500" />}
                        {m.type === 'info' && <Info size={16} className="text-blue-500 dark:text-green-400" />}
                        {m.type === 'warning' && <AlertCircle size={16} className="text-yellow-500" />}

                        <span className="text-xs font-mono font-medium text-gray-800 dark:text-gray-200 uppercase tracking-tight">
                            {m.message}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
