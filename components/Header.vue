<template>
  <header>
    <div class="app-header">
      <slot name="logo">
        <NuxtLink to="/" style="text-decoration: none; color: inherit;">
          <div class="logo">🔥/🚫</div>
        </NuxtLink>
      </slot>
      <slot name="title"><h1 className="app-header__name">hot or not</h1></slot>
      <span className="app-header__spacer" />
      <slot name="toolbar"></slot>
      <slot name="avatar"></slot>
    </div>
    <slot name="commandbar" class="command-bar"></slot>
  </header>
</template>

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
  flex-grow: 1;
}
.app-header h1 {
  font: var(--subtitle-1);
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