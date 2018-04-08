import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '@/AppLayout'
import TicketsView from '@/components/TicketsView'
import { FullScreenTicketEditor } from '@/components/features/ticket'
import VolunteersView from '@/components/VolunteersView'
import KitchenSink from '@/components/KitchenSink'
import { Login, Unauthorized, PageNotFound } from '@/components/features/auth/'
import authenticationForcer from '../services/authEnforce'
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'TicketsView',
          component: TicketsView
        },
        {
          path: '/ticket/:id',
          name: 'Ticket',
          component: FullScreenTicketEditor,
          beforeEnter: async (to, from, next) => {
            const app = router.app
            try {
              const ticket = await app.$store.dispatch('createTicket/getTicketById', to.params.id)
              app.$store.commit('createTicket/setActiveTicket', ticket)
              app.$store.commit('createTicket/setStep', 1)
              next()
            } catch (error) {
              console.error(error);
              next('notfound')
            }

          }
        },
        {
          path: '/volunteers',
          name: 'VolunteerView',
          component: VolunteersView
        },
        {
          path: '/kitchenSink',
          name: 'KitchenSink',
          component: KitchenSink
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    },
    {
      path: '*',
      component: PageNotFound,
    }
  ]
  
})
authenticationForcer.force(router)
export default router;
