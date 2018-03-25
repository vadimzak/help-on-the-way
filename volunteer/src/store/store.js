import Vue from 'vue'
import Vuex from 'vuex'
import { ASSIGN_TICKET } from '@/graphql/queries/ticket'
import { client as apolloClient } from 'shared/providers/apolloProvider'
Vue.use(Vuex)
const state = {
  user: null,
  count: 0,
  menuOpen: false,
  openTickets: [],
  activeTicket: undefined
}

const mutations = {
  toggleMenu (state) {
    state.menuOpen = !state.menuOpen
  },
  login (state, user) {
    state.user = user
  },
  logout (state) {
    state.user = null
  },
  setActiveTicket (state, ticket) {
    state.activeTicket = ticket
  },
  updateOpenTickets (state, tickets) {
    state.openTickets = tickets
  }
}

const actions = {
  toggleMenu: ({commit}) => commit('toggleMenu'),
  async assignTicket ({state, commit}, {id}) {
    return assignTicket(id, state.user.id)
  }
}

const getters = {
  activeTicket: ({activeTicket}) => activeTicket
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

async function assignTicket (ticketId, volunteerId) {
  return apolloClient.mutate({
    mutation: ASSIGN_TICKET,
    variables: {ticketId: ticketId, volunteerId: volunteerId}
  })
}
