<template>
  <header>
    <div class="app-header">
      <slot name="logo">
        <a class="action-link" @click="() => goHome('nba')" style="text-decoration: none; color: inherit;">
          <div class="logo">🔥/🚫</div>
        </a>
      </slot>
      <slot name="title"><h1 class="app-header__name">hot or not</h1></slot>
      <span class="app-header__spacer"></span>
    <slot name="toolbar">
        <a class="action-link" @click="() => goHome('nba')">nba</a>
        <a class="action-link" @click="() => goHome('nhl')">nhl</a>
        <!-- <a class="action-link" @click="() => goHome('wnba')">wnba</a> -->
        <!-- <a class="action-link" @click="() => updateLeague('mbb')">mbb</a> -->
      </slot>
      <slot name="avatar"></slot>
    </div>
    <!-- toggle modes to see schedule, teams, or all players -->
    <slot name="commandbar" class="command-bar"></slot>
  </header>
</template>

<script>
export default {
  setup() {
    const { league, updateLeague } = useLeague();
    const router = useRouter()

    function goHome(league) {
      router.push({
        path: '/'
      })
      updateLeague(league);
    }

    return { league, goHome, updateLeague }
  },
}
</script>

<style scoped>

.app-header {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 0 56px;
  height: 64px;
  background-color: var(--color-background-mute);
}
.app-header__spacer {
  display: flex;
  flex-grow: 1;
  width: auto;
}
.app-header .app-header__name {
  font: var(--subtitle-1);
}

@media only screen and (max-width: 600px) {
  .app-header .app-header__name {
    display: none;
  }
}

.command-bar {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 0 56px;
  height: 48px;
  background-color: var(--color-background-mute);
  border-top: solid 1px var(--color-border);
}
</style>