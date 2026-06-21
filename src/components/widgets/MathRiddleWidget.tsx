import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

export const MathRiddleWidget = () => {
  const questions = [
    {
      q: "Find the next number in the series:\n2, 6, 12, 20, 30, ...",
      options: ["38", "40", "42", "46"],
      ans: "42",
      desc: "Formula: n² + n (e.g., 5² + 5 = 30, next is 6² + 6 = 42)"
    },
    {
      q: "If 1 + 4 = 5, 2 + 5 = 12, and 3 + 6 = 21, then what is 8 + 11?",
      options: ["40", "96", "52", "97"],
      ans: "96",
      desc: "Formula: a + (a * b) (e.g., 8 + 8 * 11 = 96)"
    },
    {
      q: "A bat and ball cost $1.10. The bat costs $1.00 more than the ball. How much is the ball?",
      options: ["$0.10", "$0.05", "$0.01", "$0.15"],
      ans: "$0.05",
      desc: "x + (x + 1) = 1.10 => 2x = 0.10 => ball = 5 cents"
    }
  ];

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (opt: string) => {
    if (selected !== null) return;
    setSelected(opt);
    setIsCorrect(opt === questions[qIndex].ans);
  };

  const handleNext = () => {
    setSelected(null);
    setIsCorrect(null);
    setQIndex((prev) => (prev + 1) % questions.length);
  };

  const current = questions[qIndex];

  return (
    <div className="p-3.5 sm:p-5 flex flex-col justify-between min-h-[300px] gap-3">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono text-gray-400 dark:text-zinc-550 uppercase font-bold">
            Question {qIndex + 1} of {questions.length}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-gray-750 dark:text-zinc-300 leading-relaxed font-medium bg-gray-55 dark:bg-zinc-955/40 p-2.5 rounded-xl border border-gray-100 dark:border-zinc-800/80 whitespace-pre-line">
          {current.q}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {current.options.map((opt) => {
            const isSelected = selected === opt;
            const isAns = opt === current.ans;
            
            let btnClass = "border-gray-250 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/40 text-gray-750 dark:text-zinc-300";
            if (selected !== null) {
              if (isAns) {
                btnClass = "border-green-500 dark:border-green-400 bg-green-50/20 dark:bg-green-955/20 text-green-700 dark:text-green-400";
              } else if (isSelected) {
                btnClass = "border-red-500 dark:border-red-400 bg-red-50/20 dark:bg-red-955/20 text-red-700 dark:text-red-400";
              } else {
                btnClass = "border-gray-100 dark:border-zinc-900 opacity-45 text-gray-400 dark:text-zinc-650 cursor-not-allowed";
              }
            }

            return (
              <button
                key={opt}
                disabled={selected !== null}
                onClick={() => handleSelect(opt)}
                className={`py-1.5 px-2 border text-[10px] sm:text-xs font-mono font-bold rounded-lg transition-all ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-start gap-2 bg-gray-50 dark:bg-zinc-955/40 p-2.5 rounded-xl border border-gray-105 dark:border-zinc-800/80">
              {isCorrect ? (
                <Check className="w-3.5 h-3.5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-3.5 h-3.5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-none">
                  {isCorrect ? "Correct!" : "Oops, not quite!"}
                </p>
                <p className="text-[9px] text-gray-500 dark:text-zinc-400 leading-normal mt-1">
                  {current.desc}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-[11px] font-bold transition-all shadow-md hover:opacity-90"
            >
              Next
              <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
