import Vue from 'vue'
import Vuex from 'vuex'
import { GET_BY_ID } from '@/graphql/queries/ticket'
import { client as apolloClient } from 'shared/providers/apolloProvider'
Vue.use(Vuex)
const state = {
  user: null,
  count: 0,
  menuOpen: false,
  tickets: [],
  ticketToMove: undefined,
  activeTicket: undefined
}

const get = (path, object) =>
  path.reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, object)

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
  setActiveTicket (state, {data}) {
    const ticket = get(['getTicketById', 'ticketForVolunteer'], data)
    state.activeTicket = ticket
  }
}

const actions = {
  toggleMenu: ({commit}) => commit('toggleMenu'),
  async fetchTickets () {
    const tickets = await getTickets()
  },
  async setActiveTicketById ({state, commit}, {id}) {
    const ticket = await getTicketById(id)
    commit('setActiveTicket', ticket)
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

async function getTicketById (ticketId) {
  return apolloClient.mutate({
    mutation: GET_BY_ID,
    variables: {ticketId: ticketId}
  })
}
