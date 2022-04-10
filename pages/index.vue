<template>
  <div class="page">
    <h2>NBA Games</h2>
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

    const [{ data: teams }, { data: games }] = await Promise.all([
      useFetch(`/api/teams`),
      useFetch(`/api/games`),
    ])

    return {
      games,
      teams,
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