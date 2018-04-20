import Vue from 'vue'
import formatAddress from '../../../shared/filters/formatAddress'
import formatName from './formatName'
import formatEmpty from './formatEmpty'
import formatTicketStatus from './formatTicketStatus'
import sharedFilters from 'shared/filters'
Vue.use(sharedFilters)
Vue.filter('formatName', formatName)
Vue.filter('formatEmpty', formatEmpty)
Vue.filter('formatTicketStatus', formatTicketStatus)
