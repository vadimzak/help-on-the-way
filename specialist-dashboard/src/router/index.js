import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import TicketsView from '@/components/TicketsView'
import TagManager from '@/components/TagManager'
import VolunteersView from '@/components/VolunteersView'
import KitchenSink from '@/components/KitchenSink'

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
      path: '/volunteers',
      name: 'VolunteerView',
      component: VolunteersView
    },
    {
      path: '/tags',
      name: 'TagManager',
      component: TagManager
    },
    {
      path: '/kitchenSink',
      name: 'KitchenSink',
      component: KitchenSink
    },
  ]
})
