import Vue from 'vue'
import formatAddress from './formatAddress'
import formatName from './formatName'
import formatEmpty from './formatEmpty'
import sharedFilters from 'shared/filters'
Vue.use(sharedFilters)
Vue.filter('formatAddress', formatAddress)
Vue.filter('formatName', formatName)
Vue.filter('formatEmpty', formatEmpty)
