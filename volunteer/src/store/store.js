import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  count: 0,
  user: {
    firstName: 'John'
  },
  menuOpen: false,
}

const mutations = {
  toggleMenu(state) {
    state.menuOpen = !state.menuOpen
  }
}

const actions = {
    toggleMenu: ({commit}) => commit('toggleMenu'),
  }

const getters = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
