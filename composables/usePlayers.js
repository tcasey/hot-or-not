export const usePlayers = async () => {
  const players = await $fetch('/api/players');

  return useState('players', () => players);
}