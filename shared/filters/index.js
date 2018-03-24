import formatCategory from './formatCategory'
import formatSubCategory from './formatSubCategory'
import formatTicketTitle from './formatTicketTitle'

function install(Vue) {
    Vue.filter('formatCategory', formatCategory)
    Vue.filter('formatSubCategory', formatSubCategory)
    Vue.filter('formatTicketTitle', formatTicketTitle)
}

export default {
    install,
}