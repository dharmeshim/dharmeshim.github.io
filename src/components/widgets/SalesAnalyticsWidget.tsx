import { useState } from "react";

export const SalesAnalyticsWidget = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const bars = [
    { label: "Q1", value: 84, amount: "$84.2K" },
    { label: "Q2", value: 112, amount: "$112.5K" },
    { label: "Q3", value: 95, amount: "$95.1K" },
    { label: "Q4", value: 191, amount: "$190.6K" },
  ];

  return (
    <div className="p-3.5 sm:p-5 flex flex-col justify-between min-h-[300px] gap-3">
      {/* SVG Area Line Chart */}
      <div className="bg-gray-50 dark:bg-zinc-955/40 rounded-xl p-2 border border-gray-100 dark:border-zinc-800/80">
        <svg viewBox="0 0 240 70" className="w-full h-auto">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#385144" stopOpacity="0.2" className="dark:stop-color-green-400" />
              <stop offset="100%" stopColor="#385144" stopOpacity="0.0" className="dark:stop-color-green-400" />
            </linearGradient>
          </defs>
          <path
            d="M 10 60 Q 50 45 90 20 T 170 35 T 230 10 L 230 60 L 10 60 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M 10 60 Q 50 45 90 20 T 170 35 T 230 10"
            fill="none"
            stroke="#385144"
            strokeWidth="2"
            className="dark:stroke-green-400"
          />
          <circle cx="90" cy="20" r="3.5" className="fill-white dark:fill-zinc-900 stroke-[#385144] dark:stroke-green-400" strokeWidth="1.5" />
          <circle cx="230" cy="10" r="3.5" className="fill-white dark:fill-zinc-900 stroke-[#385144] dark:stroke-green-400" strokeWidth="1.5" />
        </svg>
      </div>

      {/* SVG/HTML Bar Chart */}
      <div className="bg-gray-50 dark:bg-zinc-955/40 rounded-xl p-3 border border-gray-105 dark:border-zinc-800/80 relative">
        <div className="flex justify-between items-end h-16 gap-2">
          {bars.map((bar, i) => {
            const heightPercent = `${(bar.value / 200) * 100}%`;
            const isHovered = hoveredBar === i;

            return (
              <div
                key={bar.label}
                className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div
                  className={`w-full rounded-t-md transition-all duration-305 ${
                    isHovered
                      ? "bg-[#385144] dark:bg-green-400 shadow-[0_-2px_12px_rgba(74,222,128,0.25)]"
                      : "bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700"
                  }`}
                  style={{ height: heightPercent }}
                />
                <span className="text-[9px] font-mono text-gray-400 mt-1">{bar.label}</span>
              </div>
            );
          })}
        </div>

        <div className="absolute top-1.5 right-2 h-3 text-[8px] font-mono text-gray-450 dark:text-zinc-550">
          {hoveredBar !== null ? `Val: ${bars[hoveredBar].amount}` : "Hover bars"}
        </div>
      </div>
    </div>
  );
};
