<template>
  <div class="results">
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
</template>

<script setup>
const props = defineProps({
  home: Object,
  away: Object,
  awayRatings: Number,
  homeRatings: Number,
});
</script>

<style>
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
