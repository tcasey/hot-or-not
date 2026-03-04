import express from "express";

const app = express();
const PORT = 3001;

// Dynamic import for sportsdataverse (ESM)
let sdv: any;

async function loadSdv() {
  const mod = await import("sportsdataverse");
  sdv = mod.default || mod;
}

// Games endpoint
app.get("/api/games", async (req, res) => {
  try {
    const league = (req.query.league as string) || "nba";
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const leagueApi = sdv[league];
    if (!leagueApi?.getSchedule) {
      return res.json([]);
    }

    const result = await leagueApi.getSchedule(yyyy, mm, dd);
    const games = Object.values(result).filter(
      (game: any) => game?.apiDate
    );
    res.json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.json([]);
  }
});

// Teams endpoint
app.get("/api/teams", async (req, res) => {
  try {
    const league = (req.query.league as string) || "nba";
    const result = await sdv[league].getTeamList();
    res.json(result?.sports?.[0]?.leagues?.[0]?.teams || []);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.json([]);
  }
});

// Players (team roster) endpoint
app.get("/api/players", async (req, res) => {
  try {
    const teamId = req.query.id as string;
    const league = (req.query.league as string) || "nba";
    const result = await sdv[league].getTeamPlayers(teamId);
    res.json(result);
  } catch (err) {
    console.error("Error fetching players:", err);
    res.json(null);
  }
});

// Individual player endpoint
app.get("/api/player", async (req, res) => {
  try {
    const playerId = req.query.id as string;
    const league = (req.query.league as string) || "nba";
    const result = await sdv[league].getPlayerInfo(playerId);
    res.json(result);
  } catch (err) {
    console.error("Error fetching player:", err);
    res.json(null);
  }
});

// Game box score endpoint
app.get("/api/game", async (req, res) => {
  try {
    const gameId = req.query.id as string;
    const league = (req.query.league as string) || "nba";
    const result = await sdv[league].getBoxScore(gameId);
    res.json(result);
  } catch (err) {
    console.error("Error fetching game:", err);
    res.json(null);
  }
});

// Images endpoint
app.get("/api/images", async (req, res) => {
  const playerId = req.query.id as string;
  const source = (req.query.source as string) || "nba";

  let headshot: string | undefined;

  if (source.toLowerCase() === "nba") {
    headshot = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;
  }

  res.json({ headshot });
});

async function start() {
  await loadSdv();
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

start();
