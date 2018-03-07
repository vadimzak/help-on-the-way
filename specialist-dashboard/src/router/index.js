import Vue from 'vue'
import Router from 'vue-router'
import TicketsView from '@/components/TicketsView'
import TagManager from '@/components/TagManager'
import VolunteersView from '@/components/VolunteersView'
import KitchenSink from '@/components/KitchenSink'
import FontsDemo from '@/components/base/FontsDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    {
      path: '/fonts-demo',
      name: 'fontsDemo',
      component: FontsDemo
    },
  ]
})
