import {reactive, toRefs } from "vue";
import useLeague from './useLeague';
// makes state global
const state = reactive({
  games: {}
});
// search the list of listItems and return matching results
export default () => {
  const { league } = useLeague();

  const updateGames = () => {
    const { data } = await fetch(`/api/games?league=${league}`);
    console.log({data})
    state.games = data
  }


  return {...toRefs(state), updateGames};
}
// export const useGames = async () => {
//   // const games = await $fetch('/api/games');
//   const [{ data: teams }, { data: games }] = await Promise.all([
//     useFetch(`/api/teams?league=${league.value}`),
//     useFetch(`/api/games?league=${league.value}`),
//   ])

//   return useState('games', () => games);
// }