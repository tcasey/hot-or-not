import { createServerFn } from "@tanstack/react-start";
import { loadSdv } from "../../server/app";

export const fetchGames = createServerFn({ method: "GET" })
  .inputValidator((data: { league: string }) => data)
  .handler(async ({ data }) => {
    try {
      const sdv = await loadSdv();
      const league = data.league || "nba";
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const leagueApi = sdv[league];
      if (!leagueApi?.getSchedule) return [];

      const result = await leagueApi.getSchedule(yyyy, mm, dd);
      const games = Object.values(result).filter(
        (game: any) => game?.apiDate
      );
      return games;
    } catch (err) {
      console.error("Error fetching games:", err);
      return [];
    }
  });

export const fetchPlayers = createServerFn({ method: "GET" })
  .inputValidator((data: { teamId: string; league: string }) => data)
  .handler(async ({ data }) => {
    try {
      const sdv = await loadSdv();
      const result = await sdv[data.league || "nba"].getTeamPlayers(
        data.teamId
      );
      return result;
    } catch (err) {
      console.error("Error fetching players:", err);
      return null;
    }
  });
