import { useState, useCallback } from "react";

interface Athlete {
  id?: string;
  uid?: string;
  headshot?: { href?: string };
  [key: string]: unknown;
}

interface Rating {
  uid?: string;
  rating: "hot" | "not";
}

interface TeamData {
  team: {
    athletes: Athlete[];
    displayName?: string;
    logos?: { href?: string }[];
    [key: string]: unknown;
  };
}

export function useRating() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [index, setIndex] = useState(0);
  const [homeRatings, setHomeRatings] = useState<number | null>(null);
  const [awayRatings, setAwayRatings] = useState<number | null>(null);

  const updateRatings = useCallback(
    (
      who: Athlete,
      what: "hot" | "not",
      athletes: Athlete[],
      home: TeamData,
      away: TeamData
    ) => {
      const newRatings = [...ratings, { ...who, rating: what } as Rating];
      setRatings(newRatings);

      const newIndex = index + 1;
      setIndex(newIndex);

      if (newIndex === athletes.length) {
        const homeAthletes = home.team.athletes.filter(
          (a) => a?.headshot?.href
        );
        const awayAthletes = away.team.athletes.filter(
          (a) => a?.headshot?.href
        );

        const hotHome = newRatings.filter(
          (r) =>
            r.rating === "hot" &&
            homeAthletes.some((a) => a.uid === r.uid)
        ).length;
        const hotAway = newRatings.filter(
          (r) =>
            r.rating === "hot" &&
            awayAthletes.some((a) => a.uid === r.uid)
        ).length;

        setHomeRatings(Math.round((hotHome / homeAthletes.length) * 100));
        setAwayRatings(Math.round((hotAway / awayAthletes.length) * 100));
      }

      return newIndex;
    },
    [ratings, index]
  );

  const reset = useCallback(() => {
    setRatings([]);
    setIndex(0);
    setHomeRatings(null);
    setAwayRatings(null);
  }, []);

  return { ratings, index, homeRatings, awayRatings, updateRatings, reset };
}
