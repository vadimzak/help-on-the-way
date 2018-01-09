import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import NewTicketForm from '@/components/NewTicketForm'
import TicketsView from '@/components/TicketsView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/tickets',
      name: 'TicketsView',
      component: TicketsView
    },
    {
      path: '/new-ticket',
      name: 'NewTicketForm',
      component: NewTicketForm
    }
  ]
})