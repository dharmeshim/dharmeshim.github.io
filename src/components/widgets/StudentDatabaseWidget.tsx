import { useState } from "react";

export const StudentDatabaseWidget = () => {
  const [filter, setFilter] = useState<"All" | "CSE" | "ECE">("All");

  const records = [
    { id: "2021CSE01", name: "Dharmesh Prasad", branch: "CSE", status: "Active" },
    { id: "2021CSE44", name: "Aditya Sharma", branch: "ECE", status: "Active" },
    { id: "2021CSE12", name: "Pooja Patel", branch: "CSE", status: "On Leave" },
    { id: "2021CSE08", name: "Rohan Das", branch: "CSE", status: "Active" },
  ];

  const filtered = filter === "All" ? records : records.filter((r) => r.branch === filter);

  return (
    <div className="p-3.5 sm:p-5 flex flex-col gap-3">
      {/* Filter keys */}
      <div className="flex gap-1.5">
        {(["All", "CSE", "ECE"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setFilter(b)}
            className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-mono rounded-md border transition-all ${
              filter === b
                ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white"
                : "border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-55 dark:hover:bg-zinc-800/40"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Records list */}
      <div className="flex flex-col gap-2">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-2.5 border border-gray-100 dark:border-zinc-800/60 bg-gray-50/80 dark:bg-zinc-950/40 rounded-xl gap-2"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-zinc-800/80 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-700 dark:text-zinc-300 flex-shrink-0">
                {record.name[0]}
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] sm:text-xs font-bold text-gray-800 dark:text-zinc-200 leading-tight truncate">{record.name}</p>
                <p className="text-[8px] sm:text-[9px] font-mono text-gray-400 dark:text-zinc-550 mt-0.5 truncate">{record.id} • {record.branch}</p>
              </div>
            </div>
            
            <span className={`px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold flex-shrink-0 ${
              record.status === "Active"
                ? "bg-green-100/50 dark:bg-green-955/20 text-green-600 dark:text-green-400"
                : "bg-amber-100/50 dark:bg-amber-955/20 text-amber-600 dark:text-amber-400"
            }`}>
              {record.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
