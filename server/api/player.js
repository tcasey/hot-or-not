import sdv from 'sportsdataverse';

export default async (req, res) => {
  const query = useQuery(req);
  const teamId = query?.team;
  const league = query?.league || 'nba';
  const playerId = query?.id;

  const players = await sdv?.[league]?.getTeamPlayers(teamId);
  // return players
  const player = players?.team?.athletes?.find(player => player?.id?.toString() === playerId);

  return player;
}