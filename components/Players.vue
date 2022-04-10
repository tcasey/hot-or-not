<template>
  <!-- <Player v-for="player in athletes" :key="player.uid" :player="player" /> -->
  <Player :player="player" />
</template>

<script setup>
import { defineComponent , ref } from "vue";

const props = defineProps({
  team: Object,
});
const {player, updatePlayer} = usePlayer()
const { data: players } = await useFetch(`/api/players?id=${props?.team?.id}`)

const athletes = ref(players.value.team.athletes.filter(athlete => athlete.headshot.href));

updatePlayer(athletes?.value?.[0])

</script>

<style scoped>
.card {
  border-radius: 8px;
  background-color: var(--color-background-soft);
  width: auto;
  overflow: auto;
  margin-bottom: 32px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h4 {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
h5 {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.headshot {
  max-width: 120px;
  height: auto;
  width: auto;
}
</style>