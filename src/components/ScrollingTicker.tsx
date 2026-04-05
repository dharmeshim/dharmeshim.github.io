import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';

// Wraps a value between min and max (for infinite looping)
const wrap = (min: number, max: number, v: number): number => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface ScrollingTickerProps {
  texts: string[];
  velocity?: number;
  className?: string;
  /** Gap between items */
  gap?: number;
  /** Separator between repeated text copies */
  separator?: string;
}

interface VelocityTrackProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const VelocityTrack = ({ children, baseVelocity }: VelocityTrackProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const ScrollingTicker = useVelocity(scrollY);
  const smoothVelocity = useSpring(ScrollingTicker, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

/**
 * React Bits-style ScrollingTicker marquee.
 * Scrolling faster makes the marquee accelerate; stopping decelerates it.
 * Supports multiple rows with opposite scroll directions.
 */
export const ScrollingTicker = ({
  texts,
  velocity = 60,
  className = '',
  separator = '·',
}: ScrollingTickerProps) => {
  // Repeat items enough times to fill viewport width
  const repeat = 6;

  return (
    <div className={`select-none ${className}`}>
      {texts.map((text, row) => {
        const items = Array.from({ length: repeat }, () => text);
        const dir = row % 2 === 0 ? 1 : -1;

        return (
          <VelocityTrack key={row} baseVelocity={velocity * dir}>
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-0">
                <span>{item}</span>
                <span className="mx-4 opacity-30">{separator}</span>
              </span>
            ))}
          </VelocityTrack>
        );
      })}
    </div>
  );
};
