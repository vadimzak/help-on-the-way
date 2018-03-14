// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import store from './store/store'
import 'vuetify/dist/vuetify.css' // Ensure you are using css-loader
import 'font-awesome/css/font-awesome.css'
import { apolloProvider } from '@/graphql/apolloClient'
import moment from 'moment'
import './services/facebookRedirectHashFixer'
Vue.use(Vuetify)
Vue.use(VueResource)
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})
Vue.http.headers.common['Access-Control-Allow-Credentials'] = 'include'
Vue.http.headers.common['Access-Control-Allow-Origin'] = process.env.SERVER_BASE_URL
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  components: { App },
  template: '<App/>',
  use: Vuetify
})
