import { useRef, ReactElement, ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
}

/**
 * Awwwards-level Magnetic Wrapper using Framer Motion.
 * Attracts the wrapped element towards the mouse cursor within a defined radius.
 * Ideal for high-end CTAs and interactive icons.
 */
export const Magnetic = ({ children, strength = 0.5, radius = 50 }: MagneticProps): JSX.Element => {
  const magneticRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Framer Motion springs for perfectly smooth returning
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!magneticRef.current || shouldReduceMotion) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = magneticRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={magneticRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex relative z-20"
    >
      {children}
    </motion.div>
  );
};
