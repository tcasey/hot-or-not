import sdv from 'sportsdataverse';

export default async (req, res) => {
  const result = await sdv.nba.getTeamList();

  return result?.sports?.[0]?.leagues?.[0]?.teams;
}
