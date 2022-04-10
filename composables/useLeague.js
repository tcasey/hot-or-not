import {reactive, toRefs } from "vue";
// makes state global
const state = reactive({
  league: 'nba'
});
// search the list of listItems and return matching results
export default () => {
  const updateLeague = (data) => {
    state.league = data
  }


  return {...toRefs(state), updateLeague};
}