import sdv from 'sportsdataverse';

export default async (req, res) => {
  const query = useQuery(req);
  const teamId = query?.id;
  const league = query?.league || 'nba';

  const teamList = await sdv[league].getTeamPlayers(teamId);

  return teamList
}