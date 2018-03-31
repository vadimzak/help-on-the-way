import formatCategory from './formatCategory'
import formatSubCategory from './formatSubCategory'
import formatTicketTitle from './formatTicketTitle'
import formatMinutes from './formatMinutes'
import formatDate from './formatDate'

function install(Vue) {
    Vue.filter('formatCategory', formatCategory)
    Vue.filter('formatSubCategory', formatSubCategory)
    Vue.filter('formatTicketTitle', formatTicketTitle)
    Vue.filter('formatMinutes', formatMinutes)
    Vue.filter('formatDate', formatDate)
}

export default {
    install,
}