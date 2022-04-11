import {reactive, toRefs } from "vue";
import usePlayer from './usePlayer';
// makes state global
const state = reactive({
  ratings: [],
  homeRatings: 0,
  awayRatings: 0,
  index: 0,
});
// search the list of listItems and return matching results
export default () => {
  const { updatePlayer } = usePlayer();
  const updateRatings = (who, what, athletes, home, away) => {
    // state.ratings = data
    // rate player
    state.ratings = [...state.ratings, { ...who, rating: what }];
    // update index
    state.index = state.index + 1;
    const nextPlayer = athletes?.[state.index];
    const isHomeTeam = home.team.athletes.find(athlete => athlete.id === nextPlayer.id);
    const team = isHomeTeam ? home.team : away.team;
    // update visible player
    updatePlayer({...nextPlayer, team});

    if (state.index === athletes.length) {
      const awayAthletes = away.team.athletes.filter(athlete => athlete?.headshot?.href);
      const homeAthletes = home.team.athletes.filter(athlete => athlete?.headshot?.href);

      const hotHome = state.ratings.filter(
        (ratedPlayer) =>
          ratedPlayer?.rating === "hot" &&
          homeAthletes.some((el) => el.uid === ratedPlayer.uid)
      ).length;
      const hotAway = state.ratings.filter(
        (ratedPlayer) =>
          ratedPlayer?.rating === "hot" &&
          awayAthletes.some((el) => el.uid === ratedPlayer.uid)
      ).length;

      state.homeRatings = parseInt(
        (hotHome / homeAthletes.length) * 100
      ).toFixed(0);
      state.awayRatings = parseInt(
        (hotAway / awayAthletes.length) * 100
      ).toFixed(0);
    }
  }


  return {...toRefs(state), updateRatings};
}