import Vue from 'vue'
import formatDate from './formatDate'
import formatAddress from './formatAddress'
import formatName from './formatName'
import formatCategory from './formatCategory'
import formatSubCategory from './formatSubCategory'
import formatMinutes from './formatMinutes'

Vue.filter('formatDate', formatDate)
Vue.filter('formatAddress', formatAddress)
Vue.filter('formatName', formatName)
Vue.filter('formatCategory', formatCategory)
Vue.filter('formatSubCategory', formatSubCategory)
Vue.filter('formatMinutes', formatMinutes)
