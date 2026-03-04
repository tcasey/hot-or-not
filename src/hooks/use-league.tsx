import { createContext, useContext, useState, type ReactNode } from "react";

type League = "nba" | "nhl";

interface LeagueContextType {
  league: League;
  setLeague: (league: League) => void;
}

const LeagueContext = createContext<LeagueContextType>({
  league: "nba",
  setLeague: () => {},
});

export function LeagueProvider({ children }: { children: ReactNode }) {
  const [league, setLeague] = useState<League>("nba");
  return (
    <LeagueContext.Provider value={{ league, setLeague }}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  return useContext(LeagueContext);
}
