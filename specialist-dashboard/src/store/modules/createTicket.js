import { CREATE_TICKET, UPDATE_TICKET, GET_BY_ID } from '@/graphql/queries/ticket';
import { client as apolloClient } from 'shared/providers/apolloProvider';
import { TicketStatus } from '@/constants/enums/index';
import moment from 'moment';
import _ from 'lodash';
import { stat } from 'fs';
const state = {
    ticket: undefined,
    statusCount: {},
    list: [],
    currentPreview: undefined,
    currentFilter: 'OPEN',
    currentStep: 1,
};
  
const getters = {};
  
  // actions
const actions = {
    async saveCurrentTicket({ commit, state, getters }, ) {
        const { ticket } = state;
        // we don't have all the required fields, so we must continue, or nothing was modified
        if (ticket.elder && ticket.startAddress && ticket.isDirty) {
            const updatedTicket = await createOrUpdateTicket(ticket);
            updatedTicket.isDirty = false // the ticket is no longer dirty
            commit('updateTicket', updatedTicket);
        }
    },
    createTicketForElder({}, elder) {
        return createOrUpdateTicket({ elder, startAddress: elder.address, status: TicketStatus.draft.value});
    },
    getTicketById({}, id) {
        return getTicketById(id)
    },
    updateTicketStatus({ commit }, {id, status}) {
        if (id && status) {
            commit('updateTicket', { status });
            return updateTicket({ id, status });
        }    
    }
};
  
  // mutations
const mutations = {
    newTicket(state) {
        state.ticket =  {
            status: TicketStatus.draft.value,
            details: {},
            remarks: {},
            groups: [],
        }
        state.currentStep = 1
    },
    setActiveTicket(state, ticket) {
        if (ticket) {
            state.currentStep = 3
        } else {
            state.currentStep = 1
        }
        state.ticket = normalizeTicket(ticket)
    },
    updateTicket (state, ticketUpdate) {
        state.ticket = _.merge({}, state.ticket, {isDirty: true}, ticketUpdate);
    },
    setTicketGroups(state, { groups }) {
        state.ticket = { ...state.ticket, groups: groups };
      },
    setNeedToKnowPoints(state, points) {
        state.ticket.details = { ...state.ticket.details, needToKnow: points, }
        state.ticket = { ...state.ticket, isDirty: true }  
    },
    setTicketDueDate(state, dueDate) {
        this.commit('createTicket/updateTicket', { dueDate, fixedDueDate: !!dueDate }) 
    },
    setTicketDueTime(state, dueTime) {
        this.commit('createTicket/updateTicket', { dueTime, fixedDueTime: true, details: { flexibleTime: null } }) 
    },
    setTicketFlexibleTime(state, time) {
        this.commit('createTicket/updateTicket', { dueTime: null, fixedDueTime: false, details: { flexibleTime: time } }) 
    },
    nextStep(state) {
        // skip route step for indoor tickets
        if (+state.currentStep === 3 && state.ticket.isIndoor) {
            state.currentStep = 5;
            return;
        }
        state.currentStep++;  
    },
    setStep(state, step) {
          state.currentStep = +step
      },
    goBackStep(state) {
        // skip route step for indoor tickets
        if (+state.currentStep === 5 && state.ticket.isIndoor) {
            state.currentStep = 3; 
            return;
        }      
          state.currentStep = Math.max(1, state.currentStep - 1);
    },
    setStatusCount(state, count) {
        state.statusCount = count
    },
    setList(state, list) {
        state.list = list
    },
    setCurrentPreview(state, ticket) {
        state.currentPreview = ticket
    },
    setFilter(state, filter) {
        state.currentFilter = filter
    }
  }
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
 

/**
 * Normalizes a ticket object, to match the expected structure by our client code,
 * Used mainly for normalizing tickets which we just fetched from the server
 */
function normalizeTicket(ticket) {
    if (!ticket) {
        return
    }
    // no need to normalize tickets that didn't return from the server
    if (!ticket.id) {
        return ticket
    }
    ticket = _.cloneDeep(ticket)
    ticket.groups = ticket.groups || []
    if (ticket.groups && ticket.groups.nodes) {
        // server will return array of { group: {...actualGroupFields} }
        // maps to array of actual groups without the wrapping object
        ticket.groups = ticket.groups.nodes.map( g => g.group)
    }
    if (!ticket.details) {
        ticket.details = {}
    }
    return ticket
}



async function createOrUpdateTicket(ticket) {
    const ticketServerModel = mapToServerModel(ticket)
    if (ticketServerModel.id) {
        return updateTicket(ticketServerModel);
    }
    return createTicket(ticketServerModel);
}


async function createTicket(ticket) {
    const response = await  apolloClient.mutate({
        mutation: CREATE_TICKET,
        variables: { ticket: ticket},
    });
    ticket = response.data.createTicket.ticket;
    return { id: ticket.id };

}

async function getTicketById(id) {
    const response = await  apolloClient.query({
        query: GET_BY_ID,
        variables: { id },
    });
    const ticket = response.data.ticket;
    return ticket;

}

async function updateTicket(ticket) {
    const response =  await apolloClient.mutate({
        mutation: UPDATE_TICKET,
        variables: { ticket: ticket, id: ticket.id},
    });

    return {};
}

function mapToServerModel(ticket) {
    if (!ticket) {
        return {}
    }
    const mapFullModelToId = {
        elder: 'elderId',
        startAddress: 'startAddressId',
        destinationAddress: 'destinationAddressId',
        endAddress: 'endAddressId',
        issuingPerson: 'issuingPerson',
    };
    const stripFields = { groups: true, volunteers: true, __typename: true, isDirty: true };
    
    const transformers = {
        dueDate(val) {
                return val ? moment(val).utc().toDate() : val // normalize to UTC iso string
        }
    }

    return Object.keys(ticket).reduce((serverModel, currentField) => {
        const mappedName = mapFullModelToId[currentField];
        if (mappedName) {
            const currentValue = ticket[currentField];
            serverModel[mappedName] = currentValue ? currentValue.id : undefined;
        } else if (!stripFields[currentField]) {
            const transform = transformers[currentField];
            serverModel[currentField] = transform ? transform(ticket[currentField]) : ticket[currentField];
        }
        return serverModel;
    }, {});
}