import { Hono } from "hono";

let sdv: any;

export async function loadSdv() {
  if (!sdv) {
    const mod = await import("sportsdataverse");
    sdv = mod.default || mod;
  }
  return sdv;
}

const app = new Hono()
  .basePath("/api")

  .get("/games", async (c) => {
    try {
      const s = await loadSdv();
      const league = c.req.query("league") || "nba";
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const leagueApi = s[league];
      if (!leagueApi?.getSchedule) return c.json([]);

      const result = await leagueApi.getSchedule(yyyy, mm, dd);
      const games = Object.values(result).filter(
        (game: any) => game?.apiDate
      );
      return c.json(games);
    } catch (err) {
      console.error("Error fetching games:", err);
      return c.json([]);
    }
  })

  .get("/teams", async (c) => {
    try {
      const s = await loadSdv();
      const league = c.req.query("league") || "nba";
      const result = await s[league].getTeamList();
      return c.json(result?.sports?.[0]?.leagues?.[0]?.teams || []);
    } catch (err) {
      console.error("Error fetching teams:", err);
      return c.json([]);
    }
  })

  .get("/players", async (c) => {
    try {
      const s = await loadSdv();
      const teamId = c.req.query("id");
      const league = c.req.query("league") || "nba";
      const result = await s[league].getTeamPlayers(teamId);
      return c.json(result);
    } catch (err) {
      console.error("Error fetching players:", err);
      return c.json(null);
    }
  })

  .get("/player", async (c) => {
    try {
      const s = await loadSdv();
      const playerId = c.req.query("id");
      const league = c.req.query("league") || "nba";
      const result = await s[league].getPlayerInfo(playerId);
      return c.json(result);
    } catch (err) {
      console.error("Error fetching player:", err);
      return c.json(null);
    }
  })

  .get("/game", async (c) => {
    try {
      const s = await loadSdv();
      const gameId = c.req.query("id");
      const league = c.req.query("league") || "nba";
      const result = await s[league].getBoxScore(gameId);
      return c.json(result);
    } catch (err) {
      console.error("Error fetching game:", err);
      return c.json(null);
    }
  })

  .get("/images", async (c) => {
    const playerId = c.req.query("id");
    const source = c.req.query("source") || "nba";

    let headshot: string | undefined;
    if (source.toLowerCase() === "nba") {
      headshot = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;
    }

    return c.json({ headshot });
  });

export type AppType = typeof app;
export { app };
