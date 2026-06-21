import { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";

export const TypingSpeedWidget = () => {
  const target = "Speed is the essence of building robust banking systems.";
  const [input, setInput] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [acc, setAcc] = useState(100);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.length === 0) {
      setWpm(0);
      setAcc(100);
      setCompleted(false);
      return;
    }

    if (start === null) {
      setStart(Date.now());
    }

    // Calculate accuracy
    let correct = 0;
    const typed = input.length;
    for (let i = 0; i < typed; i++) {
      if (input[i] === target[i]) correct++;
    }
    setAcc(Math.round((correct / typed) * 100));

    // Calculate WPM
    const elapsedMinutes = start ? (Date.now() - start) / 60000 : 0.01;
    setWpm(Math.round((correct / 5) / Math.max(elapsedMinutes, 0.01)));

    if (input === target) {
      setCompleted(true);
    }
  }, [input, start]);

  const handleReset = () => {
    setInput("");
    setStart(null);
    setWpm(0);
    setAcc(100);
    setCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="p-3.5 sm:p-5 flex flex-col justify-between min-h-[300px] gap-3">
      <div>
        {/* Comparison board */}
        <div className="text-[11px] font-mono leading-relaxed bg-gray-50 dark:bg-zinc-955/40 p-3 rounded-xl border border-gray-100 dark:border-zinc-800/85 select-none break-all">
          {target.split("").map((char, index) => {
            let color = "text-gray-400 dark:text-zinc-650";
            if (index < input.length) {
              color = input[index] === char 
                ? "text-[#385144] dark:text-green-400 font-bold" 
                : "text-red-500 bg-red-50 dark:bg-red-950/40 rounded-sm";
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      <div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          disabled={completed}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing prompt above..."
          className="w-full text-[11px] font-mono py-1.5 px-2.5 border border-gray-255 dark:border-zinc-800 rounded-xl bg-transparent outline-none focus:border-[#385144] dark:focus:border-green-400 text-gray-900 dark:text-white mb-2.5"
        />

        <div className="flex items-center justify-between border-t border-gray-100 dark:border-zinc-850 pt-2">
          <div className="flex items-center gap-3 text-xs font-mono">
            <div>
              <span className="text-[8px] text-gray-400 dark:text-zinc-550 uppercase">WPM</span>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white leading-none">{wpm}</p>
            </div>
            <div>
              <span className="text-[8px] text-gray-400 dark:text-zinc-550 uppercase">ACC</span>
              <p className="text-xs sm:text-sm font-bold text-gray-850 dark:text-white leading-none">{acc}%</p>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-gray-400 hover:text-gray-650 dark:hover:text-zinc-205 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${completed ? "animate-spin text-[#385144] dark:text-green-400" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
