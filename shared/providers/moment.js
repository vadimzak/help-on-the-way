import moment from 'moment'

function install(Vue) {
    moment.locale('he-IL');
    Object.defineProperty(Vue.prototype, '$moment', {
        value: moment
    })
}

export default {
    install,
}