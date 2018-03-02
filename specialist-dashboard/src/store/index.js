import Vue from 'vue';
import Vuex from 'vuex';
import createTicket from './modules/createTicket';
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        createTicket,
    },
    strict: debug,
    plugins: []
});
