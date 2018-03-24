import { TicketStatus } from '@/constants/enums/index';
import categoriesTree from 'shared/constants/categoriesTree';
const state = {
    categories: categoriesTree,
};
  
  // getters
const getters = {
    outdoorCategories(state) {
        const categories = state.categories;
        return Object.keys(state.categories)
            .map(key => categories[key])
            .map(category => category.self)
            .filter(category => category && !category.isIndoor);

    },
    indoorCategories(state) {
        const categories = state.categories;
        return Object.keys(state.categories)
            .map(key => categories[key])
            .map(category => category.self)
            .filter(category => category && category.isIndoor);
    },

};
  
  // actions
const actions = {
};
  
  // mutations
  const mutations = {
  }
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}