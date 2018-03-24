import Vue from 'vue'
import formatDate from './formatDate'
import formatAddress from './formatAddress'
import formatName from './formatName'
import formatMinutes from './formatMinutes'
import formatEmpty from './formatEmpty'
import sharedFilters from 'shared/filters'
Vue.use(sharedFilters)
Vue.filter('formatDate', formatDate)
Vue.filter('formatAddress', formatAddress)
Vue.filter('formatName', formatName)
Vue.filter('formatMinutes', formatMinutes)
Vue.filter('formatEmpty', formatEmpty)
