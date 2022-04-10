import nba from 'nba';
import sdv from 'sportsdataverse';
import { useQuery } from 'h3'

export default async (req, res) => {
  const query = useQuery(req);
  const teamId = query?.id;

  // let players = [];

  // const list = nba.searchPlayers(' ');
  // const nbaList = await nbaClient.allPlayersList();
  const teamList = await sdv.nba.getTeamPlayers(teamId);
  // console.log({nbaList})

  // for (const player of list) {
  //   const playerId = player?.playerId;
  //   const { headshot } = await $fetch(`/api/images?id=${playerId}&source=nba`);

  //   players.push({...player, playerId, headshot})
  // }

  return teamList
}