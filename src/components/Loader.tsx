import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/site';
import gsap from 'gsap';

interface LoaderProps {
  progress?: number;
  status?: string;
  isVisible?: boolean;
}

const BOOT_LOGS = [
  'Authenticating system kernel... DONE',
  'GET /assets/resources/main_stack.json 200 OK',
  'Loading portfolio modules...',
];

export const Loader = ({
  progress = 0,
  status = 'Initializing...',
  isVisible = true,
}: LoaderProps): JSX.Element => {
  const { background } = siteConfig.styles.colors;
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  // GSAP entrance timeline
  useEffect(() => {
    if (!containerRef.current || !isVisible) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        '.loader-meta',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' }
      );
      tl.fromTo(
        '.loader-log',
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${background} overflow-hidden font-mono`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Radial spotlight */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.04)_0%,transparent_70%)]" />

          <div className="relative w-full max-w-sm px-6 flex flex-col gap-0">
            {/* Header */}
            <div className="loader-meta flex justify-between items-end mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              <span>System Boot</span>
              <motion.span
                key={Math.round(progress)}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="loader-meta w-full h-[2px] bg-gray-200/50 dark:bg-white/10 rounded-full overflow-hidden mb-8">
              <motion.div
                ref={progressBarRef}
                className="h-full bg-blue-500 dark:bg-green-400 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Log stream */}
            <div ref={logsRef} className="flex flex-col gap-2">
              {BOOT_LOGS.map((log, i) => (
                <div
                  key={i}
                  className="loader-log flex items-center gap-2 text-[10px] text-gray-400/60 dark:text-gray-500/60"
                >
                  <span className="opacity-50">›</span>
                  <span>{log}</span>
                </div>
              ))}

              {/* Live status */}
              <motion.div
                key={status}
                className="flex items-center gap-2 text-xs text-gray-900 dark:text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span className="opacity-50">›</span>
                <span>{status}</span>
                <span className="w-1 h-3.5 bg-blue-500 dark:bg-green-400 animate-[pulse_0.9s_ease-in-out_infinite] ml-0.5" />
              </motion.div>
            </div>

            {/* Metadata footer */}
            <div className="loader-meta mt-10 flex items-center gap-4 text-[9px] text-gray-400/40 dark:text-gray-600/40 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60 dark:bg-green-400/60 animate-pulse" />
                <span>PID: 0x{Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase()}</span>
              </div>
              <span>v1.0.0-stable</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
