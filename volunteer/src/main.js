// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store/store'
import 'vuetify/dist/vuetify.css' // Ensure you are using css-loader
import 'font-awesome/css/font-awesome.css'
import { provider as apolloProvider, install as apolloInit } from 'shared/providers/apolloProvider'
import momentSetup from 'shared/providers/moment'
import 'shared/initializers/facebookRedirectHashFixer'
import vueResourceSetup from 'shared/providers/vueResource'
import authPlugin from 'shared/providers/authProvider'
import './filters'
Vue.config.productionTip = false
Vue.use(vueResourceSetup)
Vue.use(apolloInit)
Vue.use(Vuetify)
Vue.use(authPlugin)
Vue.use(momentSetup)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>',
  use: Vuetify
})
