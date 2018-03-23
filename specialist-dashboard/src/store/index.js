import Vue from 'vue';
import Vuex from 'vuex';
import createTicket from './modules/createTicket';
import categories from './modules/categories';
import auth from './modules/auth';
import address from './modules/address';
import person from './modules/person';
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        createTicket,
        categories,
        auth,
        address,
        person
    },
    strict: debug,
    plugins: []
});
