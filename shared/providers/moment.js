import moment from 'moment'

function install(Vue) {
    moment.locale('he');
    Object.defineProperty(Vue.prototype, '$moment', {
        value: moment
    })
}

export default {
    install,
}