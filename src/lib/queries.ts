import { queryOptions } from "@tanstack/react-query";
import { fetchGames, fetchPlayers } from "./server-fns";

export type League = "nba" | "nhl";

export const gamesQueryOptions = (league: League) =>
  queryOptions({
    queryKey: ["games", league],
    queryFn: () => fetchGames({ data: { league } }),
  });

export const playersQueryOptions = (teamId: string, league: League) =>
  queryOptions({
    queryKey: ["players", teamId, league],
    queryFn: () => fetchPlayers({ data: { teamId, league } }),
  });
