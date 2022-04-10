<template>
  <div>
    <Team v-for="{ team } in teams" :key="team.uid" :team="team" />
  </div>
</template>

<script setup>
import { defineComponent , ref } from "vue";
const props = defineProps({
  teams: Array,
});

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
  text-align: justify;
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
</style>