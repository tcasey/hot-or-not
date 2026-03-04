import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useLeague } from "../hooks/use-league";
import { useRating } from "../hooks/use-rating";
import PlayerCard from "../components/PlayerCard";
import VoteButtons from "../components/VoteButtons";
import ProgressBar from "../components/ProgressBar";
import Results from "../components/Results";
import PageTransition from "../components/PageTransition";
import { Loader2 } from "lucide-react";

export default function RatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLeague } = useLeague();

  const homeId = searchParams.get("home");
  const awayId = searchParams.get("away");
  const leagueParam = searchParams.get("league") || "nba";

  const [home, setHome] = useState<any>(null);
  const [away, setAway] = useState<any>(null);
  const [athletes, setAthletes] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<"hot" | "not" | null>(null);

  const { index, homeRatings, awayRatings, updateRatings, reset } = useRating();

  // Set league from URL param
  useEffect(() => {
    if (leagueParam === "nba" || leagueParam === "nhl") {
      setLeague(leagueParam);
    }
  }, [leagueParam, setLeague]);

  // Fetch team rosters
  useEffect(() => {
    if (!homeId || !awayId) return;

    setLoading(true);
    Promise.all([
      fetch(`/api/players?id=${homeId}&league=${leagueParam}`).then((r) => r.json()),
      fetch(`/api/players?id=${awayId}&league=${leagueParam}`).then((r) => r.json()),
    ])
      .then(([homeData, awayData]) => {
        setHome(homeData);
        setAway(awayData);

        const homeAthletes = homeData?.team?.athletes?.filter(
          (a: any) => a?.headshot?.href
        ) || [];
        const awayAthletes = awayData?.team?.athletes?.filter(
          (a: any) => a?.headshot?.href
        ) || [];
        const allAthletes = [...homeAthletes, ...awayAthletes];
        setAthletes(allAthletes);

        if (allAthletes.length > 0) {
          const first = allAthletes[0];
          const isHome = homeData?.team?.athletes?.find(
            (a: any) => a?.id === first?.id
          );
          setCurrentPlayer({
            ...first,
            team: isHome ? homeData.team : awayData.team,
          });
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [homeId, awayId, leagueParam]);

  const vote = useCallback(
    (rating: "hot" | "not") => {
      if (!currentPlayer || !home || !away) return;

      setDirection(rating);

      // Small delay to let exit animation play
      setTimeout(() => {
        const newIndex = updateRatings(currentPlayer, rating, athletes, home, away);

        if (newIndex < athletes.length) {
          const next = athletes[newIndex];
          const isHome = home.team.athletes.find(
            (a: any) => a?.id === next?.id
          );
          setCurrentPlayer({
            ...next,
            team: isHome ? home.team : away.team,
          });
        }
        setDirection(null);
      }, 300);
    },
    [currentPlayer, athletes, home, away, updateRatings]
  );

  const playAgain = () => {
    reset();
    navigate("/");
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-white/40" />
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  // Show results when all players are rated
  if (homeRatings !== null && awayRatings !== null) {
    return (
      <PageTransition>
        <Results
          home={home}
          away={away}
          homeRatings={homeRatings}
          awayRatings={awayRatings}
          onPlayAgain={playAgain}
        />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
        {/* Progress */}
        <ProgressBar current={index} total={athletes.length} />

        {/* Player Card with AnimatePresence for enter/exit */}
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

        {/* Vote Buttons */}
        <VoteButtons
          onHot={() => vote("hot")}
          onNot={() => vote("not")}
        />
      </div>
    </PageTransition>
  );
}
