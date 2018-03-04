// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import Vuetify from 'vuetify'
import store from './store/store'
import currentUserProvider from './services/currentUserProvider'
import('vuetify/dist/vuetify.css') // Ensure you are using css-loader

Vue.use(Vuetify)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});
Vue.http.headers.common['Access-Control-Allow-Credentials'] = 'include'

const init = async () => {
  await currentUserProvider.init();

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    use: Vuetify
  })
}

init();