import { GET_ADDRESS  } from '@/graphql/queries/address';
import { buildGeomString } from '@/graphql/utils/geomUtil';
import { client as apolloClient } from 'shared/providers/apolloProvider';
import _ from 'lodash';
const state = {};
  
const getters = {};
  
const actions = {
    async get(context, address) {
        return await getAddress(address);
    },
};
  
const mutations = {}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  

async function getAddress(address) {
    address = formatAddress(address);
    const response = await  apolloClient.mutate({
        mutation: GET_ADDRESS,
        variables: { address: address},
    });
    return  Object.assign({}, address, response.data.getAddress.address)
}


function formatAddress(address) {
    const formatedAddress = { ...address };
    delete formatedAddress.__typename;
    delete formatedAddress.id;
    if (formatedAddress.location) {
        formatedAddress.geom = buildGeomString(address.location);
        delete formatedAddress.location;
    }
    return formatedAddress;
}