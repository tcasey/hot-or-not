<template>
  <div class="player">
    <p>{{player?.fullName || 'Mystery Player'}}</p>
    <img :src="player?.headshot?.href" class="headshot" />
  </div>
</template>

<script setup>
  const props = defineProps({
    player: Object,
    allowDetails: Boolean
  });


</script>

<style scoped>
.player {
  width: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 320px;
}

.headshot {
  /* max-width: 240px; */
  height: auto;
  width: auto;
}
</style>