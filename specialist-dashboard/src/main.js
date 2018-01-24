// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import 'font-awesome/css/font-awesome.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import { directive as onClickOutside } from 'vue-on-click-outside'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

Vue.use(VueApollo);
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: 'AIzaSyCI8i6KIO3fqbvT35LTQVsGAN4Je1mJTa0',
    libraries: 'places'
  }
});
Vue.directive('on-click-outside', onClickOutside);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})


