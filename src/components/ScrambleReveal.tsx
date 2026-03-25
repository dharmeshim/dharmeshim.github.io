import { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#';

const ScrambleLetter = ({ char, durationMs }: { char: string, durationMs: number }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    if (!isScrambling || char === ' ') return;

    let frameId: number;
    const startTime = Date.now();

    const scramble = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= durationMs) {
        setDisplayChar(char);
        setIsScrambling(false);
      } else {
        setDisplayChar(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
        // Throttle significantly more to make the symbols highly readable and the scramble "slower"
        setTimeout(() => {
          frameId = requestAnimationFrame(scramble);
        }, 75);
      }
    };

    frameId = requestAnimationFrame(scramble);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isScrambling, char, durationMs]);

  const handleMouseEnter = () => {
    if (!isScrambling && char !== ' ') {
      setIsScrambling(true);
    }
  };

  const handleMouseLeave = () => {
    if (isScrambling) {
      setIsScrambling(false);
      setDisplayChar(char);
    }
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-colors hover:text-blue-500 dark:hover:text-green-400 cursor-default"
    >
      {char === ' ' ? '\u00A0' : displayChar}
    </span>
  );
};

interface ScrambleRevealProps {
  text: string;
  className?: string;
  duration?: number; // Total duration in seconds (here converted to ms per letter)
  delay?: number; // unused now but kept for prop compatibility
}

export const ScrambleReveal = ({
  text,
  className = '',
  duration = 0.4,
}: ScrambleRevealProps) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <ScrambleLetter key={`${index}-${char}`} char={char} durationMs={duration * 1000} />
      ))}
    </span>
  );
};
