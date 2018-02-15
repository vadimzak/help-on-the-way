import Vue from 'vue'
import Router from 'vue-router'
// index.js or main.js
import Welcome from '@/components/Welcome'
import Ticket from '@/components/Ticket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/ticket/:id',
      name: 'Ticket',
      component: Ticket
    }
  ]
})
