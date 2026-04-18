import { useEffect, useState } from 'react';

const GLYPHS =
  '!<>-_\\/[]{}—=+*^?#@$%&|~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface ScrambledTitleProps {
  text: string;
  className?: string;
}

export const ScrambledTitle = ({
  text,
  className = '',
}: ScrambledTitleProps) => {
  const [chars, setChars] = useState<string[]>(text.split(''));

  useEffect(() => {
    const textChars = text.split('');

    // Get indices excluding spaces
    const indices = textChars
      .map((c, i) => (c !== ' ' ? i : -1))
      .filter((i) => i !== -1);

    if (indices.length === 0) return;

    // Pick up to 4 random indices
    const shuffled = [...indices].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    // Step 1: scramble selected characters
    const scrambled = [...textChars];
    selected.forEach((i) => {
      scrambled[i] =
        GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    });

    setChars(scrambled);

    // Step 2: restore original text after delay
    const timeout = setTimeout(() => {
      setChars(textChars);
    }, 800);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <span key={i}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
};