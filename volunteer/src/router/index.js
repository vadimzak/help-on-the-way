import Vue from 'vue'
import Router from 'vue-router'
// index.js or main.js
import Welcome from '@/components/Welcome'
import TicketPreview from '@/components/TicketPreview'
import authenticationForcer from '../services/authenticationForcer'
import login from './login'

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/ticket/:id',
            name: 'TicketPreview',
            component: TicketPreview
        },
        ...login.routes
    ]
})

authenticationForcer.force(router);

export default router;