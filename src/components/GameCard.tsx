import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface GameCardProps {
  game: any;
  index: number;
  onClick: () => void;
}

export default function GameCard({ game, index, onClick }: GameCardProps) {
  const competitors = game?.competitions?.[0]?.competitors || [];
  const home = competitors.find((c: any) => c.homeAway === "home");
  const away = competitors.find((c: any) => c.homeAway === "away");

  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass w-full p-5 flex items-center gap-4 cursor-pointer group hover:bg-white/12 transition-all duration-300"
    >
      {/* Away team */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        <span className="text-white/90 font-semibold text-sm sm:text-base truncate text-right">
          {away?.team?.shortDisplayName || away?.team?.displayName || "Away"}
        </span>
        {away?.team?.logo && (
          <img
            src={away.team.logo}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg"
          />
        )}
      </div>

      {/* VS divider */}
      <div className="flex-shrink-0 px-3">
        <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
          vs
        </span>
      </div>

      {/* Home team */}
      <div className="flex items-center gap-3 flex-1">
        {home?.team?.logo && (
          <img
            src={home.team.logo}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg"
          />
        )}
        <span className="text-white/90 font-semibold text-sm sm:text-base truncate">
          {home?.team?.shortDisplayName || home?.team?.displayName || "Home"}
        </span>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all flex-shrink-0" />
    </motion.button>
  );
}
