import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLeague } from "~/hooks/use-league";
import { gamesQueryOptions } from "~/lib/queries";
import AnimatedBackground from "~/components/AnimatedBackground";
import Header from "~/components/Header";
import GameCard from "~/components/GameCard";
import { LeagueProvider } from "~/hooks/use-league";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: HomeWrapper,
});

function HomeWrapper() {
  return (
    <LeagueProvider>
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1 flex flex-col">
          <HomePage />
        </main>
      </div>
    </LeagueProvider>
  );
}

function parseDate(date: string) {
  if (!date) return date;
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return `${Number(month)}/${day}/${year}`;
}

function HomePage() {
  const { league } = useLeague();
  const navigate = useNavigate();
  const { data: schedule = [], isLoading: loading } = useQuery(
    gamesQueryOptions(league)
  );

  const goToRate = (game: any) => {
    const competitors = game?.competitions?.[0]?.competitors || [];
    const home = competitors.find((c: any) => c.homeAway === "home");
    const away = competitors.find((c: any) => c.homeAway === "away");
    if (home?.id && away?.id) {
      navigate({
        to: "/rate",
        search: { home: home.id, away: away.id, league },
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center px-5 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-8"
      >
        <Calendar className="w-5 h-5 text-white/40" />
        <h2 className="text-xl sm:text-2xl font-bold text-white/90 uppercase tracking-wider">
          {league} Games
        </h2>
      </motion.div>

      <div className="w-full max-w-lg space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass h-20 animate-pulse"
            />
          ))
        ) : schedule.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong p-12 text-center"
          >
            <p className="text-white/50 text-lg mb-2">No games today</p>
            <p className="text-white/30 text-sm">
              Check back later or try a different league
            </p>
          </motion.div>
        ) : (
          schedule.map((day: any, dayIndex: number) => (
            <div key={day.apiDate || dayIndex}>
              {day.apiDate && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: dayIndex * 0.05 }}
                  className="text-xs text-white/30 font-medium uppercase tracking-widest mb-2 px-1"
                >
                  {parseDate(day.apiDate)}
                </motion.p>
              )}
              <div className="space-y-3">
                {day.games?.map((game: any, gameIndex: number) => (
                  <GameCard
                    key={game?.uid || gameIndex}
                    game={game}
                    index={dayIndex * 10 + gameIndex}
                    onClick={() => goToRate(game)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
