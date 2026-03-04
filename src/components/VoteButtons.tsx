import { motion } from "framer-motion";
import { Flame, Ban } from "lucide-react";

interface VoteButtonsProps {
  onHot: () => void;
  onNot: () => void;
}

export default function VoteButtons({ onHot, onNot }: VoteButtonsProps) {
  return (
    <div className="flex gap-4 sm:gap-6 justify-center w-full max-w-sm mx-auto">
      {/* NOT button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onNot}
        className="flex-1 glass group relative overflow-hidden py-4 sm:py-5 flex items-center justify-center gap-2 cursor-pointer hover:border-purple-400/40 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 relative z-10" />
        <span className="hidden sm:inline text-white/80 font-semibold relative z-10">
          Not
        </span>
      </motion.button>

      {/* HOT button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onHot}
        className="flex-1 glass group relative overflow-hidden py-4 sm:py-5 flex items-center justify-center gap-2 cursor-pointer hover:border-orange-400/40 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300 relative z-10" />
        <span className="hidden sm:inline text-white/80 font-semibold relative z-10">
          Hot
        </span>
      </motion.button>
    </div>
  );
}
