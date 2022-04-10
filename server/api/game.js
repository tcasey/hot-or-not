// import sdv from 'sportsdataverse';
// import { useQuery } from 'h3'

// export default async (req, res) => {
//   const query = useQuery(req);
//   const gameId = query?.id;
//   const result = await sdv.nba.getSummary(gameId);

//   return result
// }

import sdv from 'sportsdataverse';
import { useQuery } from 'h3';

export default async (req, res) => {
  const query = useQuery(req);
  const gameId = query?.id;
  const league = query?.league || 'nba';
  const result = await sdv[league].getBoxScore(gameId)

  return result;
}