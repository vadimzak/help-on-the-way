import { client as apolloClient } from 'shared/providers/apolloProvider';
import { sendMessages } from '@/services/whatsAppCommunicator'
import { GET_SHORT_URL } from '@/graphql/queries/url'
const state = {
    isMessagesAvilable: false,
};

const mutations = {
    setIsMessagesAvilable(state, status) {
        state.isMessagesAvilable = status
    }
};

const actions = {
    sendMessageToGroups
};

export default {
    namespaced: true,
    state,
    getters: {},
    actions,
    mutations
}

async function sendMessageToGroups(context, { groups, ticketId, message }) {
    let messages = await Promise.all(groups.map(async group => {
        let shortUrl = await getShortUrl(group.id, ticketId);
        return {
            group: group.channels,
            message: `${message}\n${shortUrl}`
        };
    }));

    let response = await sendMessages(messages);
    // TODO - error handling, itteraite of response and check if we got any error results
}

function getShortUrl(group_id, ticket_id) {
    return apolloClient.mutate({
        mutation: GET_SHORT_URL,
        variables: { metadata: { group_id, ticket_id } }
    });
}

