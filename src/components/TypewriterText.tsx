import { TypeAnimation } from 'react-type-animation';

interface TypewriterTextProps {
  texts: readonly string[];
  speed?: number;
  className?: string;
  /** Pause in ms between each text */
  pauseMs?: number;
  repeat?: number;
}

/**
 * Typewriter text using react-type-animation.
 * Cycles through all `texts` with a blinking cursor.
 */
export const TypewriterText = ({
  texts,
  speed = 40,
  pauseMs = 1200,
  repeat = 1,
  className = '',
}: TypewriterTextProps): JSX.Element => {
  // Build the sequence: [text, pause, text, pause, ...]
  const sequence = texts.flatMap<string | number>(t => [t, pauseMs]);

  return (
    <TypeAnimation
      sequence={sequence}
      speed={speed as Parameters<typeof TypeAnimation>[0]['speed']}
      repeat={repeat}
      cursor={true}
      className={className}
      style={{ whiteSpace: 'pre-line' }}
    />
  );
};