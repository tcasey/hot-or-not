<template>
  <div class="player">
    <div class="details">
      <div class="image-wrapper">
        <img :src="player?.headshot?.href" class="headshot" />
      </div>
      <div class="name">
        <p class="first-name">{{player?.firstName}}</p>
        <p class="last-name">{{player?.lastName}}</p>
      </div>
      <div class="team-info">
        <img class="logo" :src="player?.team?.logos?.[0]?.href" />
        <p>{{player?.team?.name}}</p>
        <p>#{{player.jersey}}</p>
        <p>{{player.position.abbreviation}}</p>
      </div>
    </div>
    <div class="bio">
      <div class="row">
        <p class="key">HT/WT</p>
        <p class="value">{{player.displayHeight}}, {{player.displayWeight}}</p>
      </div>
      <div class="row">
        <p class="key">DOB</p>
        <p class="value">{{player.dateOfBirth}}</p>
      </div>
      <div class="row">
        <p class="key">COLLEGE</p>
        <p class="value">{{'n/a'}}</p>
      </div>
      <div class="row">
        <p class="key">DRAFT INFO</p>
        <p class="value">{{player?.draft?.displayText || 'n/a'}}</p>
      </div>
      <!-- <div class="row"> -->
        <!-- <p class="key">STATUS</p> -->
        <!-- <p>{{player.injuries}}</p> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    player: Object,
    allowDetails: Boolean
  });


</script>

<style scoped>
.image-wrapper {
  overflow: hidden;
  max-width: 400px;
  display: flex;
  justify-content: center;
}
.player {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 320px;
}

.details {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 32px;
}
.team-info {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: row;
  text-align: center;
}
.team-info .logo {
  width: 24px;
}
.team-info p {
  margin: 0 4px;
}
.headshot {
  height: auto;
  width: auto;
  margin-bottom: 32px;
}
.name {
  margin-bottom: 32px;
}
.first-name {
  font: var(--title-5);
}
.last-name {
  font: var(--title-1);
}

@media only screen and (max-width: 600px) {
  .first-name {
    font: var(--body-1);
  }
  .last-name {
    font: var(--title-4);
  }
  .image-wrapper {
    max-width: 240px;
  }
}
.bio {
  width: 100%;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
}
.key {
  font: var(--body-3);
}
.value {
  font: var(--body-3);
  font-weight: 700;
}
</style>