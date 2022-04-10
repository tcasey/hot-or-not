import { useQuery } from 'h3'
export default async (req, res) => {
  const query = useQuery(req);
  const playerId = query?.id;
  // TODO: handle source as an array
  const source = query?.source;
  let headshot;
  let social;

  if (source.toLocaleLowerCase() === 'nba') {
    headshot = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;
  }
  if (source.toLocaleLowerCase() === 'social') {

  }

  return { headshot, social };

  // return new Promise(async (resolve) => {
  //   // const res = await fetch(images);

  //   resolve({ headshot, social });
  // });
}