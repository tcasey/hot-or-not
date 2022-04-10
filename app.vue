<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>
<script>
export default {
  setup() {
    const { league, updateLeague } = useLeague();

    // updateLeague('nhl')
  },
}
</script>
<style>
@import '@/assets/base.css';

.page {
  margin-top: 64px;
}
</style>
