import {reactive, toRefs } from "vue";
// makes state global
const state = reactive({
  player: {}
});
// search the list of listItems and return matching results
export default (defaultState) => {
  state.player = defaultState;

  const updatePlayer = (data) => {
    state.player = data
  }


  return {...toRefs(state), updatePlayer};
}