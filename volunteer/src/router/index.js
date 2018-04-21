import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import MyTickets from '@/components/MyTickets'
import Ticket from '@/components/features/ticket/Ticket'
import authenticationForcer from '../services/authenticationForcer'
import { routes as loginRoutes } from './login'
Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/ticket/:id',
    name: 'Ticket',
    component: Ticket,
    beforeEnter: async (to, from, next) => {
      const app = router.app
      const ticket = await app.$store.dispatch('getTicketById', to.params.id)
      app.$store.commit('setActiveTicket', ticket)
      next()
    }
  },
  {
    path: '/mine',
    name: 'myTickets',
    component: MyTickets
  },
  ...loginRoutes
  ]
})

authenticationForcer.force(router)
router.beforeEach((to, from, next) => {
  router.app.$store.commit('updateLayoutDisplay', { footer: true, greeting: true })
  next()
})

export default router
