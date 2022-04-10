<template>
  <div class="page">
    <h2>{{league?.toUpperCase()}} Games</h2>
    <Games :games="games" />
  </div>
  <!-- <Teams :teams="teams" /> -->
</template>

<script>
import { defineComponent , ref } from "vue";

export default defineComponent({
  async setup() {
    // const teams = await useTeams()
    // const games = await useGames()
    // composable for league state
    const { league, updateLeague } = useLeague();

    const [{ data: teams }, { data: games }] = await Promise.all([
      useFetch(`/api/teams?league=${league.value}`),
      useFetch(`/api/games?league=${league.value}`),
    ])

// update teams and games based on league value
   watch(league, async (league, prevLeague) => {
      const { data: updatedTeams } = await useFetch(`/api/teams?league=${league}`);
      const { data: updatedGames } = await useFetch(`/api/games?league=${league}`);

      teams.value = updatedTeams.value;
      games.value = updatedGames.value;
    });

    return {
      games,
      teams,
      league,
    }
  }
})

</script>

<style>
h2 {
  text-align: center;
  margin-bottom: 40px;
}
</style>