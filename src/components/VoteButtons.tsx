import { motion } from "framer-motion";
import { Flame, Ban } from "lucide-react";

interface VoteButtonsProps {
  onHot: () => void;
  onNot: () => void;
}

export default function VoteButtons({ onHot, onNot }: VoteButtonsProps) {
  return (
    <div className="flex gap-5 justify-center w-full max-w-sm mx-auto px-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={onNot}
        className="flex-1 glass group relative overflow-hidden py-5 sm:py-6 flex items-center justify-center gap-3 cursor-pointer hover:border-purple-400/40 transition-all duration-300 min-h-[64px] sm:min-h-[72px] active:bg-purple-500/15"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
        <Ban className="size-7 sm:size-8 text-purple-300 relative z-10" />
        <span className="text-white/80 font-bold text-lg relative z-10">
          Not
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={onHot}
        className="flex-1 glass group relative overflow-hidden py-5 sm:py-6 flex items-center justify-center gap-3 cursor-pointer hover:border-orange-400/40 transition-all duration-300 min-h-[64px] sm:min-h-[72px] active:bg-orange-500/15"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
        <Flame className="size-7 sm:size-8 text-orange-300 relative z-10" />
        <span className="text-white/80 font-bold text-lg relative z-10">
          Hot
        </span>
      </motion.button>
    </div>
  );
}
