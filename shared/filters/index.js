import formatCategory from './formatCategory'
import formatSubCategory from './formatSubCategory'
import formatTicketTitle from './formatTicketTitle'
import formatMinutes from './formatMinutes'
import formatAddress from "./formatAddress";
import formatTime from "./formatTime";
import formatTicketTime from "./formatTicketTime";
import formatTicketAddressAlias from "./formatTicketAddressAlias";

function install(Vue) {
    Vue.filter('formatCategory', formatCategory)
    Vue.filter('formatSubCategory', formatSubCategory)
    Vue.filter('formatTicketTitle', formatTicketTitle)
    Vue.filter('formatMinutes', formatMinutes)
    Vue.filter('formatAddress', formatAddress)
    Vue.filter('formatTime', formatTime)
    Vue.filter('formatTicketTime', formatTicketTime)
    Vue.filter('formatTicketAddressAlias', formatTicketAddressAlias)
}

export default {
    install,
}