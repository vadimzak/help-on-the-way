import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '@/AppLayout'
import TicketsView from '@/components/TicketsView'
import VolunteersView from '@/components/VolunteersView'
import KitchenSink from '@/components/KitchenSink'
import FontsDemo from '@/components/base/FontsDemo'
import { Login, Unauthorized } from '@/components/features/auth/'
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
  ]
  
})
authenticationForcer.force(router)
export default router;
