import { CREATE_TICKET, UPDATE_TICKET } from '@/graphql/queries/ticket';
import { apolloClient } from '@/graphql/apolloClient';
import ticketStatuses from '@/constants/enums/TicketStatus';
const state = {
    ticket: {
        status: ticketStatuses.draft
    },
    currentStep: 1,
};
  
  // getters
const getters = {
    ticketServerModel(state) {
        const mapFullModelToId = {
            elder: 'elder_id',
            startAddress: 'startAddressId',
            destinationAddress: 'destinationAddressId',
            endAddress: 'endAddressId',
            issuingPerson: 'issuingPerson',
        };
        return Object.keys(state.ticket).reduce((serverModel, currentField) => {
            const mappedName = mapFullModelToId[currentField];
            if (mappedName) {
                const currentValue = state.ticket[currentField];
                serverModel[mappedName] = currentValue ? currentValue.id : undefined;
            } else {
                serverModel[currentField] = state.ticket[currentField];
            }
            return serverModel;
        }, {});
    }
};
  
  // actions
const actions = {
    async saveAndAdvanceStep({ commit, state, getters }, ) {
        const { ticket } = state;
        // we don't have all the required fields, so we must continue
        if (ticket.elder && ticket.startAddres) {
            const updatedTicket = await createOrUpdateTicket(getters.ticketServerModel);
            commit('updateTicket', updatedTicket);
        }
        commit('moveStep');
    },
};
  
  // mutations
  const mutations = {
    updateTicket (state, ticketUpdate) {
        Object.assign(state.ticket, ticketUpdate);
    },
  
    moveStep(state) {
          state.currentStep++;
    },
  }
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  

async function createOrUpdateTicket(ticketServerModel) {
    const method = ticketServerModel.id ? UPDATE_TICKET : CREATE_TICKET;
    return apolloClient.mutate({
        mutation: method,
        variables: { ticket: ticketServerModel },
    });

}