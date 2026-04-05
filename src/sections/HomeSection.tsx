import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { siteConfig } from '../config/site';
import profile from '../config/Profile.json';
import { Signature } from '../components/Signature';
import { TypingAnimation } from '../components/TypingAnimation';

export const HomeSection = (): JSX.Element => {
  const { secondary: monoFont } = siteConfig.styles.fonts;
  const { primary: primaryColor, secondary: secondaryColor, accent } = siteConfig.styles.colors;

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 28 });

  const layer1X = useTransform(springX, [-0.5, 0.5], ['-10px', '10px']);
  const layer1Y = useTransform(springY, [-0.5, 0.5], ['-6px', '6px']);
  const layer2X = useTransform(springX, [-0.5, 0.5], ['5px', '-5px']);
  const layer2Y = useTransform(springY, [-0.5, 0.5], ['4px', '-4px']);

  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.height / 2) / rect.height);
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={wrapperRef}
      className="relative flex flex-col min-h-[100dvh] w-full overflow-hidden"
      style={{ paddingLeft: 'max(24px, 4vw)', paddingRight: 'max(24px, 4vw)', paddingTop: '10vh', paddingBottom: '8vh' }}
    >
      {/* ─── Main content ─── */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center"
        style={{ x: layer1X, y: layer1Y }}
      >
        {/* Tagline — large display headline */}
        <h1
          className="font-black uppercase leading-[0.88] tracking-tighter select-none"
          style={{
            fontSize: 'clamp(3rem, 10vw, 13rem)',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
          aria-label={profile.tagLine}
        >
          {/* First half — filled */}
          <span className="text-gray-900 dark:text-white block">
            {profile.tagLine.split(' ').slice(0, 3).join(' ')}
          </span>
          {/* Second half — outlined */}
          <span
            className={`block ${primaryColor}`}
            style={{
              WebkitTextStroke: '1.5px currentColor',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {profile.tagLine.split(' ').slice(3).join(' ')}
          </span>
        </h1>

        {/* Company — TypingAnimation animation */}
        <motion.div
          className="mt-6 md:mt-10 overflow-hidden"
          style={{ x: layer2X, y: layer2Y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p
            className={`${monoFont} text-xs md:text-sm tracking-[0.35em] uppercase ${secondaryColor} opacity-70`}
          >
            <span className={accent}>@</span>&nbsp;
            <TypingAnimation
              text={`${profile.experience[0].company}`}
              speed={48}
              delay={600}
              showCursor={true}
            />
          </p>
        </motion.div>
      </motion.div>

      {/* ─── Signature block — bottom right ─── */}
      <motion.div
        className="relative z-10 flex flex-col items-end self-end gap-3 mt-auto"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Signature
          name={profile.name}
          className={`w-40 md:w-64 opacity-80 ${primaryColor}`}
        />
        <div
          className={`${monoFont} text-[8px] md:text-[9px] tracking-[0.3em] uppercase ${secondaryColor} opacity-40 text-right translate-x-1`}
        >
          {profile.experience[0].role}
        </div>
      </motion.div>

      {/* ─── Scroll indicator ─── */}
      <motion.div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${monoFont} text-[9px] tracking-[0.3em] uppercase opacity-30 pointer-events-none`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8, ease: 'easeOut' }}
      >
        <span>Scroll</span>
        <motion.div
          className="w-px h-8 bg-current origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </motion.div>
    </section>
  );
};
