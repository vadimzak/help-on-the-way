import { CREATE, UPDATE  } from '@/graphql/queries/person';
import { client as apolloClient } from 'shared/providers/apolloProvider';
import { PersonTypes } from '@/constants/enums/index';
import _ from 'lodash';
const state = {
    current: {},
};
  
const getters = {};
  
  // actions
const actions = {
    async save({ commit, state, getters }, ) {
        const { current } = state;
            const updatedPerson = await createOrUpdate(current);
            commit('updateCurrent', updatedPerson);
    },
};
  
  // mutations
const mutations = {
    setCurrent(state, person) {
        state.current = person
    },
    updateCurrent(state,personUpdate) {
        state.current = {...state.current, ...personUpdate}
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  

async function createOrUpdate(person) {
    person = normalizePerson(person)
    if (person.id) {
        return updatePerson(person);
    }
    return createPerson(person);
}

function normalizePerson(person) {
    const copy = { ...person }
    copy.addressId = person.address.id
    delete copy.address
    delete copy.__typename
    return copy
}
async function createPerson(person) {
    const response = await  apolloClient.mutate({
        mutation: CREATE,
        variables: { person,},
    });
    person = response.data.createPerson.person
    return  { id: person.id }
}

async function updatePerson(person) {
    const response =  await apolloClient.mutate({
        mutation: UPDATE,
        variables: { person, id: person.id},
    })
    return { id: person.id }
}