import React, { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  texts: readonly string[];
  speed?: number;
  delay?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  speed = 200,
  delay = 500,
  className = "",
}) => {
  const [completedTexts, setCompletedTexts] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Use ref to avoid dependency issues
  const textsRef = useRef(texts);
  const speedRef = useRef(speed);
  const delayRef = useRef(delay);
  
  // Update refs when props change
  useEffect(() => {
    textsRef.current = texts;
    speedRef.current = speed;
    delayRef.current = delay;
  }, [texts, speed, delay]);

  useEffect(() => {
    if (currentTextIndex >= textsRef.current.length) {
      return; // All texts completed
    }

    const currentText = textsRef.current[currentTextIndex];
    
    if (isTyping && currentCharIndex < currentText.length) {
      // Typing current word character by character
      const timeout = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + 1);
      }, speedRef.current);
      return () => clearTimeout(timeout);
    } else if (isTyping && currentCharIndex >= currentText.length) {
      // Finished typing current word, add it to completed and move to next
      const timeout = setTimeout(() => {
        setCompletedTexts(prev => [...prev, currentText]);
        setCurrentTextIndex(currentTextIndex + 1);
        setCurrentCharIndex(0);
        setIsTyping(true);
      }, delayRef.current);
      return () => clearTimeout(timeout);
    }
  }, [currentTextIndex, currentCharIndex, isTyping]);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Display all completed words */}
      {completedTexts.map((text, index) => (
        <div key={index} className="leading-tight animate-in fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          {text}
        </div>
      ))}
      
      {/* Currently typing word with cursor inline */}
      {currentTextIndex < textsRef.current.length && (
        <div className="leading-tight animate-in fade-in-up">
          {textsRef.current[currentTextIndex].slice(0, currentCharIndex)}
          <span className="inline-block w-0.5 h-6 bg-current ml-1 animate-blink" />
        </div>
      )}
      
      {/* Show blinking cursor at the end when all are done */}
      {currentTextIndex >= textsRef.current.length && completedTexts.length > 0 && (
        <div className="leading-tight">
          <span className="inline-block w-0.5 h-6 bg-current ml-1 animate-blink" />
        </div>
      )}
    </div>
  );
}; 