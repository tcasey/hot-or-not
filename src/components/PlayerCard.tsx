import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { Flame, Ban } from "lucide-react";

interface PlayerCardProps {
  player: any;
  direction: "hot" | "not" | null;
  onSwipe?: (direction: "hot" | "not") => void;
}

const SWIPE_THRESHOLD = 100;

const cardVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 0.8,
    y: 60,
    rotateY: -15,
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    rotateY: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exitHot: {
    opacity: 0,
    x: 400,
    rotate: 20,
    scale: 0.8,
    transition: { duration: 0.4, ease: "easeIn" },
  },
  exitNot: {
    opacity: 0,
    x: -400,
    rotate: -20,
    scale: 0.8,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export default function PlayerCard({ player, direction, onSwipe }: PlayerCardProps) {
  const exitVariant = direction === "hot" ? "exitHot" : "exitNot";

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const hotOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const notOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeDistance = info.offset.x;
    const swipeVelocity = Math.abs(info.velocity.x);

    if (swipeDistance > SWIPE_THRESHOLD || (swipeDistance > 50 && swipeVelocity > 500)) {
      onSwipe?.("hot");
    } else if (swipeDistance < -SWIPE_THRESHOLD || (swipeDistance < -50 && swipeVelocity > 500)) {
      onSwipe?.("not");
    }
  };

  return (
    <motion.div
      key={player?.id || player?.uid}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit={exitVariant}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      className="glass-strong p-6 px-7 sm:p-8 w-full max-w-sm mx-auto cursor-grab active:cursor-grabbing touch-none select-none"
    >
      {/* Swipe indicators */}
      <motion.div
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-xl bg-orange-500/20 border-2 border-orange-400 px-3 py-1.5 pointer-events-none"
        style={{ opacity: hotOpacity }}
      >
        <Flame className="size-5 text-orange-400" />
        <span className="text-orange-300 font-bold text-sm uppercase tracking-wider">Hot</span>
      </motion.div>
      <motion.div
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 rounded-xl bg-purple-500/20 border-2 border-purple-400 px-3 py-1.5 pointer-events-none"
        style={{ opacity: notOpacity }}
      >
        <Ban className="size-5 text-purple-400" />
        <span className="text-purple-300 font-bold text-sm uppercase tracking-wider">Not</span>
      </motion.div>

      {/* Headshot */}
      <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
        <motion.img
          src={player?.headshot?.href}
          alt={`${player?.firstName} ${player?.lastName}`}
          className="w-full h-auto max-h-[260px] sm:max-h-[280px] object-contain mx-auto drop-shadow-2xl pointer-events-none"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Name */}
      <div className="text-center mb-3">
        <motion.p
          className="text-sm text-white/50 font-medium tracking-wider uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {player?.firstName}
        </motion.p>
        <motion.p
          className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {player?.lastName}
        </motion.p>
      </div>

      {/* Team Info */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {player?.team?.logos?.[0]?.href && (
          <img
            src={player.team.logos[0].href}
            alt=""
            className="size-6 object-contain pointer-events-none"
          />
        )}
        <span className="text-sm text-white/60">{player?.team?.name}</span>
        {player?.jersey && (
          <span className="text-sm text-white/40">#{player.jersey}</span>
        )}
        {player?.position?.abbreviation && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
            {player.position.abbreviation}
          </span>
        )}
      </motion.div>

      {/* Bio Stats */}
      <motion.div
        className="space-y-2 border-t border-white/10 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {player?.displayHeight && (
          <div className="flex justify-between text-sm">
            <span className="text-white/40 uppercase tracking-wider text-xs">
              HT/WT
            </span>
            <span className="text-white/80 font-medium">
              {player.displayHeight}
              {player.displayWeight ? `, ${player.displayWeight}` : ""}
            </span>
          </div>
        )}
        {player?.dateOfBirth && (
          <div className="flex justify-between text-sm">
            <span className="text-white/40 uppercase tracking-wider text-xs">
              DOB
            </span>
            <span className="text-white/80 font-medium">
              {player.dateOfBirth}
            </span>
          </div>
        )}
        {player?.draft?.displayText && (
          <div className="flex justify-between text-sm">
            <span className="text-white/40 uppercase tracking-wider text-xs">
              Draft
            </span>
            <span className="text-white/80 font-medium">
              {player.draft.displayText}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
