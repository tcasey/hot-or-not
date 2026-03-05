import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

interface ResultsProps {
  home: any;
  away: any;
  homeRatings: number;
  awayRatings: number;
  onPlayAgain: () => void;
}

function CountUp({ target, delay = 0 }: { target: number; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.round(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <>{count}</>;
}

function TeamResult({
  team,
  rating,
  delay,
}: {
  team: any;
  rating: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      className="glass-strong p-8 sm:p-10 flex flex-col items-center text-center flex-1 max-w-sm"
    >
      {team?.logos?.[0]?.href && (
        <motion.img
          src={team.logos[0].href}
          alt=""
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-6 drop-shadow-2xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: delay + 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        />
      )}
      <p className="text-white/60 text-sm mb-2">You found</p>
      <div className="text-5xl sm:text-6xl font-black mb-2">
        <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          <CountUp target={rating} delay={(delay + 0.4) * 1000} />%
        </span>
      </div>
      <p className="text-white/60 text-sm">
        of the{" "}
        <span className="text-white/90 font-semibold">
          {team?.displayName}
        </span>{" "}
        attractive
      </p>
    </motion.div>
  );
}

export default function Results({
  home,
  away,
  homeRatings,
  awayRatings,
  onPlayAgain,
}: ResultsProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4"
      >
        The Results Are In
      </motion.h2>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl justify-center items-center sm:items-stretch">
        <TeamResult team={away?.team} rating={awayRatings} delay={0.2} />
        <TeamResult team={home?.team} rating={homeRatings} delay={0.4} />
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayAgain}
        className="glass mt-6 px-8 py-3 flex items-center gap-2 text-white/80 font-medium hover:text-white hover:bg-white/12 transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Play Again
      </motion.button>
    </div>
  );
}
