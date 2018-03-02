// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
require('../static/fonts.css')

import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'font-awesome/css/font-awesome.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueVirtualScroller from 'vue-virtual-scroller'
import store from './store'
require('vue-virtual-scroller/dist/vue-virtual-scroller.css')
import { apolloProvider } from "./graphql/apolloClient";
import { directive as onClickOutside } from 'vue-on-click-outside'

Vue.config.productionTip = false



Vue.use(BootstrapVue);
Vue.use(VueVirtualScroller);
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: 'AIzaSyCI8i6KIO3fqbvT35LTQVsGAN4Je1mJTa0',
    libraries: 'places'
  }
});
Vue.directive('on-click-outside', onClickOutside);
Vue.filter('formatDate', function(value) {
  if (value) {
    let date = new Date(value);
    return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
  }
});

Vue.filter('formatAddress', function(address) {
  if (address) {
    return address.street + ' ' + address.houseNumber + ', ' + address.city;
  }
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  store,
  template: '<App/>',
  components: { App }
})


