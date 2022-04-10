export const useTeams = async () => {
  const teams = await $fetch('/api/teams');

  return useState('teams', () => teams);
}