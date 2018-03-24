import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
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
    component: Ticket
  },
  ...loginRoutes
  ]
})

authenticationForcer.force(router)

export default router
