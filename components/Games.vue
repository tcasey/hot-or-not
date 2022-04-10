<template>
  <div v-for="game in games" :key="game?.uid" class="card schedule">
    <h3>{{ parseDate(game?.apiDate) }}</h3>

    <div
      v-for="scheduledGame in game.games"
      :key="scheduledGame?.uid"
      class="games"
    >
      <a @click="() => goToRate(scheduledGame)" class="action-link game-name">
        {{ scheduledGame?.shortName }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
const props = defineProps({
  games: Array,
});
const router = useRouter()
const { league, updateLeague } = useLeague();

function goToRate(scheduledGame) {
  const home = getTeamId(scheduledGame, 'home').id
  const away = getTeamId(scheduledGame, 'away').id

  router.push({
    name: 'rate',
    query: {
      home,
      away,
      league: league?.value
    },
  })
}
function getTeamId(game, homeaWay) {
  return game?.competitions?.[0]?.competitors?.map((team) => {
    return { id: team?.id, homeAway: team?.homeAway, shortDisplayName: team?.team?.shortDisplayName }
  }).find(team => team.homeAway === homeaWay);
}

function parseDate(date) {
  // 20220409
  if (date) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    return `${Number(month)}/${day}/${year}`
  }

  return date;
}

</script>

<style scoped>
.card {
  /* border-radius: 8px; */
  /* background-color: var(--color-background-soft); */
  width: auto;
  overflow: auto;
  margin-bottom: 32px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
  flex-direction: column;
}
h3 {
  margin-bottom: 8px;
}
.game-name {
  margin-top: 24px;
}
.games {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
  flex-direction: column;

}

</style>
