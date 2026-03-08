import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full max-w-sm mx-auto px-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-white/40 font-medium">
          Player {Math.min(current + 1, total)} of {total}
        </span>
        <span className="text-xs text-white/40 font-medium">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
