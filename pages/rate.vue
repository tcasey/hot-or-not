<template>
  <div class="page">
    <div class="rate" v-if="!homeRatings && !awayRatings">
      <!-- change button content based on window -->
      <a
        class="button hot"
        @click="() => updateRatings(player, 'hot', athletes, home, away)"
        ><span>🔥 hot 🔥</span></a
      >
      <Player :player="player" />
      <a
        class="button not"
        @click="() => updateRatings(player, 'not', athletes, home, away)"
        ><span>🚫 not 🚫</span></a
      >
    </div>
    <div v-else class="results">
      <div class="home">
        <img :src="home?.team?.logos?.[0]?.href" />
        <p>
          You found <strong>{{ homeRatings }}%</strong> of the
          {{ home?.team?.displayName }} attractive
        </p>
        <!-- <div class="player-results">
          <div v-for="ratedPlayer in homeRatings" :key="ratedPlayer?.guid" class="player-result">
            <Player :player="ratedPlayer" />
            <p>{{ratedPlayer?.rating === 'hot' ? '🔥🔥🔥' : '🚫🚫🚫' }}</p>
          </div>
        </div> -->
      </div>
      <div class="away">
        <img :src="away?.team?.logos?.[0]?.href" />
        <p>
          You found <strong>{{ awayRatings }}%</strong> of the
          {{ away?.team?.displayName }} attractive
        </p>
        <!-- <div class="player-results">
          <div v-for="ratedPlayer in awayRatings" :key="ratedPlayer?.guid" class="player-result">
            <Player :player="ratedPlayer" />
            <p>{{ratedPlayer?.rating === 'hot' ? '🔥🔥🔥' : '🚫🚫🚫' }}</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
// should be team id
const homeTeamId = computed(() => route.query.home);
const awayTeamId = computed(() => route.query.away);

// composable for player state
const { player, updatePlayer } = usePlayer();
// fetch players of the home team
const { data: home } = await useAsyncData(
  "home",
  () => $fetch(`/api/players?id=${homeTeamId.value}`)
);
// fetch players of the home team
const { data: away } = await useAsyncData(
  "away",
  () => $fetch(`/api/players?id=${awayTeamId.value}`)
);


// parse out athletes from players/team data
const athletes = ref([
  ...home?.value?.team?.athletes,
  ...away?.value?.team?.athletes,
]);

// // initial player to rate
const { ratings, homeRatings, awayRatings, index, updateRatings } = useRating();
// set default player
updatePlayer(athletes?.value?.[index?.value]);
</script>

<style>
.rate {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 32px;
}
.rate img {
  max-width: 400px;
}
.results {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
@media only screen and (max-width: 900px) {
  .results {
    flex-direction: column;
  }
}
.home, .away {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.home p, .away p {
  text-align: center;
}
@media only screen and (max-width: 600px) {
  .rate img {
    max-width: 164px;
  }
  .hot span,
  .not span {
    display: none;
  }
  .hot:after {
    content: "🔥";
  }
  .not:after {
    content: "🚫";
  }
}
.results img {
  max-width: 300px;
  margin-bottom: 24px;
}
.player-results {
  margin-top: 64px;
}
.player-result {
  padding-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.player-results img {
  max-width: 64px;
}
h5 {
  text-align: center;
  /* margin-bottom: 24px; */
}
strong {
  font-weight: 800;
}
</style>
