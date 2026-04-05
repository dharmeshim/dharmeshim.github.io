import { useState, useEffect, useRef } from 'react';

interface TypingAnimationProps {
  /** The text to type out */
  text: string;
  /** Speed in ms per character */
  speed?: number;
  /** Delay before typing starts (ms) */
  delay?: number;
  className?: string;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Called when typing completes */
  onComplete?: () => void;
}

/**
 * React Bits-style TypingAnimation animation.
 * Types text character by character with a blinking cursor.
 */
export const TypingAnimation = ({
  text,
  speed = 55,
  delay = 0,
  className = '',
  showCursor = true,
  onComplete,
}: TypingAnimationProps) => {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;

    const startTyping = () => {
      const tick = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          frameRef.current = setTimeout(tick, speed);
        } else {
          setDone(true);
          onComplete?.();
        }
      };
      tick();
    };

    const initTimer = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(initTimer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, speed, delay, onComplete]);

  // Blinking cursor
  useEffect(() => {
    cursorRef.current = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => { if (cursorRef.current) clearInterval(cursorRef.current); };
  }, []);

  return (
    <span className={`${className}`}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[0.06em] h-[1.1em] ml-[0.05em] align-middle bg-current transition-opacity duration-100 ${
            done ? (cursorVisible ? 'opacity-100' : 'opacity-0') : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};
