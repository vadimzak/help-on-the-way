const state = {
    user: null,
};
  
  // getters
const getters = {};
  
  // actions
const actions = {
    logout( { commit } ) {
        commit('setUser', null)
        window.location.href = `${process.env.SERVER_BASE_URL}/logout/`
    }
};
  
  // mutations
const mutations = {
    setUser(state, user) {
        state.user = user;
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}