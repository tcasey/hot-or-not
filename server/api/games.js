import sdv from 'sportsdataverse';

export default async (req, res) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const result = await sdv.nba.getSchedule(yyyy, mm, dd)

  return Object.values(result).filter(game => game.apiDate);
}