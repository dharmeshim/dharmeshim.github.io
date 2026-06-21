import { useState } from "react";

export const TrieSearchWidget = () => {
  const [input, setInput] = useState("dha");
  const cleanInput = input.trim().toLowerCase();

  const isDharmeshActive = cleanInput.length > 0 && "dharmesh".startsWith(cleanInput);
  const isPythonActive = cleanInput.length > 0 && "python".startsWith(cleanInput);

  const getNodeClass = (char: string, index: number) => {
    let active = false;
    if (isDharmeshActive && "dharmesh"[index] === char) {
      active = index < cleanInput.length;
    } else if (isPythonActive) {
      if (char === "h_py" && index === 3 && cleanInput.length > 3 && cleanInput[3] === "h") {
        active = true;
      } else if (char !== "h_py" && "python"[index] === char) {
        active = index < cleanInput.length;
      }
    }
    return active
      ? "fill-[#385144] dark:fill-green-400 stroke-[#385144] dark:stroke-green-400 transition-all duration-300"
      : "fill-gray-100 dark:fill-zinc-800/80 stroke-gray-300 dark:stroke-zinc-700 transition-all duration-300";
  };

  const getLineClass = (char: string, index: number) => {
    let active = false;
    if (isDharmeshActive && "dharmesh"[index] === char) {
      active = index < cleanInput.length;
    } else if (isPythonActive) {
      if (char === "h_py" && index === 3 && cleanInput.length > 3 && cleanInput[3] === "h") {
        active = true;
      } else if (char !== "h_py" && "python"[index] === char) {
        active = index < cleanInput.length;
      }
    }
    return active
      ? "stroke-[#385144] dark:stroke-green-400 transition-all duration-300"
      : "stroke-gray-200 dark:stroke-zinc-800 transition-all duration-300";
  };

  const getTextClass = (char: string, index: number) => {
    let active = false;
    if (isDharmeshActive && "dharmesh"[index] === char) {
      active = index < cleanInput.length;
    } else if (isPythonActive) {
      if (char === "h_py" && index === 3 && cleanInput.length > 3 && cleanInput[3] === "h") {
        active = true;
      } else if (char !== "h_py" && "python"[index] === char) {
        active = index < cleanInput.length;
      }
    }
    return active
      ? "text-[8px] font-bold fill-white dark:fill-zinc-900"
      : "text-[8px] fill-gray-500 dark:fill-zinc-400";
  };

  return (
    <div className="p-3.5 sm:p-5 flex flex-col gap-3.5">
      {/* SVG Trie Nodes Representation */}
      <div className="bg-gray-50 dark:bg-zinc-955/60 rounded-xl p-2.5 border border-gray-105 dark:border-zinc-800/80">
        <svg viewBox="0 0 200 155" className="w-full h-auto">
          {/* Root Node */}
          <circle cx="100" cy="12" r="8" className="fill-gray-300 dark:fill-zinc-700" />
          <text x="100" y="14.5" textAnchor="middle" className="text-[6px] font-bold fill-gray-600 dark:fill-zinc-300">★</text>
          
          {/* Branch Lines */}
          <line x1="100" y1="12" x2="60" y2="35" className={getLineClass("d", 0)} strokeWidth="1.5" />
          <line x1="60" y1="35" x2="60" y2="58" className={getLineClass("h", 1)} strokeWidth="1.5" />
          <line x1="60" y1="58" x2="60" y2="81" className={getLineClass("a", 2)} strokeWidth="1.5" />
          <line x1="60" y1="81" x2="60" y2="104" className={getLineClass("r", 3)} strokeWidth="1.5" />
          <line x1="60" y1="104" x2="60" y2="127" className={getLineClass("m", 4)} strokeWidth="1.5" />
          
          <line x1="100" y1="12" x2="140" y2="35" className={getLineClass("p", 0)} strokeWidth="1.5" />
          <line x1="140" y1="35" x2="140" y2="58" className={getLineClass("y", 1)} strokeWidth="1.5" />
          <line x1="140" y1="58" x2="140" y2="81" className={getLineClass("t", 2)} strokeWidth="1.5" />
          <line x1="140" y1="81" x2="140" y2="104" className={getLineClass("h_py", 3)} strokeWidth="1.5" />
          <line x1="140" y1="104" x2="140" y2="127" className={getLineClass("o", 4)} strokeWidth="1.5" />

          {/* Left Nodes */}
          <circle cx="60" cy="35" r="9" className={getNodeClass("d", 0)} />
          <text x="60" y="37.5" textAnchor="middle" className={getTextClass("d", 0)}>d</text>
          
          <circle cx="60" cy="58" r="9" className={getNodeClass("h", 1)} />
          <text x="60" y="60.5" textAnchor="middle" className={getTextClass("h", 1)}>h</text>
          
          <circle cx="60" cy="81" r="9" className={getNodeClass("a", 2)} />
          <text x="60" y="83.5" textAnchor="middle" className={getTextClass("a", 2)}>a</text>
          
          <circle cx="60" cy="104" r="9" className={getNodeClass("r", 3)} />
          <text x="60" y="106.5" textAnchor="middle" className={getTextClass("r", 3)}>r</text>
          
          <circle cx="60" cy="127" r="9" className={getNodeClass("m", 4)} />
          <text x="60" y="129.5" textAnchor="middle" className={getTextClass("m", 4)}>m</text>

          {/* Right Nodes */}
          <circle cx="140" cy="35" r="9" className={getNodeClass("p", 0)} />
          <text x="140" y="37.5" textAnchor="middle" className={getTextClass("p", 0)}>p</text>
          
          <circle cx="140" cy="58" r="9" className={getNodeClass("y", 1)} />
          <text x="140" y="60.5" textAnchor="middle" className={getTextClass("y", 1)}>y</text>
          
          <circle cx="140" cy="81" r="9" className={getNodeClass("t", 2)} />
          <text x="140" y="83.5" textAnchor="middle" className={getTextClass("t", 2)}>t</text>
          
          <circle cx="140" cy="104" r="9" className={getNodeClass("h_py", 3)} />
          <text x="140" y="106.5" textAnchor="middle" className={getTextClass("h_py", 3)}>h</text>
          
          <circle cx="140" cy="127" r="9" className={getNodeClass("o", 4)} />
          <text x="140" y="129.5" textAnchor="middle" className={getTextClass("o", 4)}>o</text>
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-mono text-gray-400 dark:text-zinc-555 uppercase font-bold">Search:</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 8))}
          placeholder="dha or pyt..."
          className="flex-1 text-[11px] font-mono bg-transparent border-b border-gray-205 dark:border-zinc-800 pb-0.5 focus:border-[#385144] dark:focus:border-green-400 outline-none text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
};
