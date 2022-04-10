export const useGames = async () => {
  const games = await $fetch('/api/games');

  return useState('games', () => games);
}