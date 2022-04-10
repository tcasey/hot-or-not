import { useQuery } from 'h3'
import nba from 'nba';

export default async (req, res) => {
  const query = useQuery(req);
  const playerId = query?.id;
  const players = nba.searchPlayers(' ')
  const player = players.filter(player => player.playerId.toString() === playerId);

  return player?.[0];
}