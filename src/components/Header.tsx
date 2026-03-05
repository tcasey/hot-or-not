import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLeague } from "~/hooks/use-league";
import { Flame, Ban } from "lucide-react";
import { cn } from "~/lib/utils";
import type { League } from "~/lib/queries";

export default function Header() {
  const { league, setLeague } = useLeague();
  const navigate = useNavigate();

  const goHome = (newLeague: League) => {
    setLeague(newLeague);
    navigate({ to: "/" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 glass border-b border-white/10"
      style={{ borderRadius: 0 }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
        <button
          onClick={() => goHome(league)}
          className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-0.5 text-lg">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-white/40">/</span>
            <Ban className="w-5 h-5 text-purple-400" />
          </div>
        </button>

        <h1 className="hidden sm:block text-lg font-semibold tracking-tight bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          hot or not
        </h1>

        <div className="flex-1" />

        <div className="flex gap-1 p-1 rounded-full glass-subtle">
          {(["nba", "nhl"] as const).map((l) => (
            <button
              key={l}
              onClick={() => goHome(l)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors uppercase tracking-wider",
                league === l
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              {league === l && (
                <motion.div
                  layoutId="league-pill"
                  className="absolute inset-0 rounded-full bg-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{l}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
