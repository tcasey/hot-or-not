import sdv from 'sportsdataverse';

export default async (req, res) => {
  const query = useQuery(req);
  const league = query?.league || 'nba';
  console.log({query, league})
  const result = await sdv[league].getTeamList();

  return result?.sports?.[0]?.leagues?.[0]?.teams;
}
