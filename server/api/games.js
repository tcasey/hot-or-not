import sdv from 'sportsdataverse';

export default async (req, res) => {
  const query = useQuery(req);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const league = query?.league || 'nba';
  let result;

  switch (league) {
    case 'cfb':
      result = await sdv.cfb.getSchedule(yyyy, mm, dd)
      break
    case 'mbb':
      result = await sdv.mbb.getSchedule(yyyy, mm, dd)
      break;
    case 'nba':
      result = await sdv.nba.getSchedule(yyyy, mm, dd)
      break;
    case 'ncaa':
      result = await sdv.ncaa.getSchedule(yyyy, mm, dd)
      break;
    case 'nfl':
      result = await sdv.nfl.getSchedule(yyyy, mm, dd)
      break;
    case 'nhl':
      result = await sdv.nhl.getSchedule(yyyy, mm, dd)
      break;
    case 'wbb':
      result = await sdv.wbb.getSchedule(yyyy, mm, dd)
      break;
    case 'wnba':
      result = await sdv.wnba.getSchedule(yyyy, mm, dd)
      break;
    default:
      result = await sdv.nba.getSchedule(yyyy, mm, dd)
      break;
  }
  // const result = await sdv?.[league]?.getSchedule(yyyy, mm, dd)

  return Object.values(result).filter(game => game?.apiDate);
}