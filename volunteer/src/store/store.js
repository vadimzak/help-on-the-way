import Vue from 'vue'
import Vuex from 'vuex'
import { ASSIGN_TICKET, GET_BY_ID, UPDATE_TICKET_SCHEDULE } from '@/graphql/queries/ticket'
import { client as apolloClient } from 'shared/providers/apolloProvider'
Vue.use(Vuex)
const state = {
  user: null,
  count: 0,
  menuOpen: false,
  openTickets: [],
  assignedTickets: [],
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
  setAssignedTickets (state, tickets) {
    state.assignedTickets = tickets
  },
  updateOpenTickets (state, tickets) {
    state.openTickets = tickets
  },
  updateActiveTicket (state, update) {
    state.activeTicket = { ...state.activeTicket, ...update }
  },
  removeOpenTicket (state, id) {
    state.openTickets = state.openTickets.filter(t => t.id !== id)
  }
}

const actions = {
  toggleMenu: ({commit}) => commit('toggleMenu'),
  assignTicket ({state, commit}, {id}) {
    return assignTicket(id, state.user.id)
  },
  getTicketById ({ commit }, ticketId) {
    return getTicketById(ticketId)
  },
  async updateTicketScheduleDate ({ state, commit }, updatedSchedule) {
    if (!state.activeTicket) {
      return
    }
    await scheduleTicket(state.activeTicket.id, updatedSchedule.dueDate, updatedSchedule.dueTime)
    commit('updateActiveTicket', updatedSchedule)
  }
}

const getters = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

async function assignTicket (ticketId, volunteerId) {
  return apolloClient.mutate({
    mutation: ASSIGN_TICKET,
    variables: { ticketId: ticketId }
  })
}

async function getTicketById (ticketId) {
  const response = await apolloClient.query({
    query: GET_BY_ID,
    variables: { ticketId }
  }
  )
  return response.data.ticket
}

function scheduleTicket (ticketId, dueDate, dueTime) {
  return apolloClient.mutate({
    mutation: UPDATE_TICKET_SCHEDULE,
    variables: { ticketId: ticketId, dueDate, dueTime }
  })
}
