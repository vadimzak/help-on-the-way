import Vue from 'vue'
import formatDate from './formatDate'
import formatTime from './formatTime'
import formatAddress from '../../../shared/filters/formatAddress'
import formatName from './formatName'
import formatEmpty from './formatEmpty'
import sharedFilters from 'shared/filters'
Vue.use(sharedFilters)
Vue.filter('formatDate', formatDate)
Vue.filter('formatTime', formatTime)
Vue.filter('formatName', formatName)
Vue.filter('formatEmpty', formatEmpty)
