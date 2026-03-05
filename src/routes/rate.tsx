import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { useRating } from "~/hooks/use-rating";
import { LeagueProvider, useLeague } from "~/hooks/use-league";
import { playersQueryOptions, type League } from "~/lib/queries";
import AnimatedBackground from "~/components/AnimatedBackground";
import Header from "~/components/Header";
import PlayerCard from "~/components/PlayerCard";
import VoteButtons from "~/components/VoteButtons";
import ProgressBar from "~/components/ProgressBar";
import Results from "~/components/Results";

type RateSearch = {
  home: string;
  away: string;
  league: League;
};

export const Route = createFileRoute("/rate")({
  validateSearch: (search: Record<string, unknown>): RateSearch => ({
    home: (search.home as string) || "",
    away: (search.away as string) || "",
    league: ((search.league as string) || "nba") as League,
  }),
  component: RateWrapper,
});

function RateWrapper() {
  const { league } = Route.useSearch();
  return (
    <LeagueProvider>
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1 flex flex-col">
          <RatePage />
        </main>
      </div>
    </LeagueProvider>
  );
}

function RatePage() {
  const { home: homeId, away: awayId, league: leagueParam } = Route.useSearch();
  const navigate = useNavigate();
  const { setLeague } = useLeague();

  const [athletes, setAthletes] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [direction, setDirection] = useState<"hot" | "not" | null>(null);
  const [homeData, setHomeData] = useState<any>(null);
  const [awayData, setAwayData] = useState<any>(null);
  const [ready, setReady] = useState(false);

  const { index, homeRatings, awayRatings, updateRatings, reset } = useRating();

  // Set league from URL
  useState(() => {
    if (leagueParam === "nba" || leagueParam === "nhl") {
      setLeague(leagueParam);
    }
  });

  const { isLoading: homeLoading } = useQuery({
    ...playersQueryOptions(homeId, leagueParam),
    enabled: !!homeId,
  });

  const { isLoading: awayLoading } = useQuery({
    ...playersQueryOptions(awayId, leagueParam),
    enabled: !!awayId,
  });

  // Combine both team queries
  const homeQuery = useQuery({
    ...playersQueryOptions(homeId, leagueParam),
    enabled: !!homeId,
  });
  const awayQuery = useQuery({
    ...playersQueryOptions(awayId, leagueParam),
    enabled: !!awayId,
  });

  const loading = homeQuery.isLoading || awayQuery.isLoading;

  // Set up athletes once data is ready
  if (!ready && homeQuery.data && awayQuery.data) {
    const home = homeQuery.data;
    const away = awayQuery.data;
    setHomeData(home);
    setAwayData(away);

    const homeAthletes =
      home?.team?.athletes?.filter((a: any) => a?.headshot?.href) || [];
    const awayAthletes =
      away?.team?.athletes?.filter((a: any) => a?.headshot?.href) || [];
    const allAthletes = [...homeAthletes, ...awayAthletes];
    setAthletes(allAthletes);

    if (allAthletes.length > 0) {
      const first = allAthletes[0];
      const isHome = home?.team?.athletes?.find(
        (a: any) => a?.id === first?.id
      );
      setCurrentPlayer({
        ...first,
        team: isHome ? home.team : away.team,
      });
    }

    setReady(true);
  }

  const vote = useCallback(
    (rating: "hot" | "not") => {
      if (!currentPlayer || !homeData || !awayData) return;

      setDirection(rating);

      setTimeout(() => {
        const newIndex = updateRatings(
          currentPlayer,
          rating,
          athletes,
          homeData,
          awayData
        );

        if (newIndex < athletes.length) {
          const next = athletes[newIndex];
          const isHome = homeData.team.athletes.find(
            (a: any) => a?.id === next?.id
          );
          setCurrentPlayer({
            ...next,
            team: isHome ? homeData.team : awayData.team,
          });
        }
        setDirection(null);
      }, 300);
    },
    [currentPlayer, athletes, homeData, awayData, updateRatings]
  );

  const playAgain = () => {
    reset();
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-white/40" />
        </motion.div>
      </div>
    );
  }

  if (homeRatings !== null && awayRatings !== null) {
    return (
      <Results
        home={homeData}
        away={awayData}
        homeRatings={homeRatings}
        awayRatings={awayRatings}
        onPlayAgain={playAgain}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
      <ProgressBar current={index} total={athletes.length} />

      <div className="w-full max-w-sm" style={{ minHeight: 480 }}>
        <AnimatePresence mode="wait">
          {currentPlayer && !direction && (
            <PlayerCard
              key={currentPlayer.id || currentPlayer.uid || index}
              player={currentPlayer}
              direction={direction}
            />
          )}
        </AnimatePresence>
      </div>

      <VoteButtons onHot={() => vote("hot")} onNot={() => vote("not")} />
    </div>
  );
}
