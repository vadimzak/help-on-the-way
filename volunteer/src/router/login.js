import Login from '@/components/Login'
import LoginUpdate from '@/components/LoginUpdate'
import LoginVerify from '@/components/LoginVerify'

const paths = {
    login: '/login',
    update: '/login/update',
    verify: '/login/verify'
};

export default {
    paths,
    routes: [{
        path: paths.login,
        name: 'Login',
        component: Login
    },
    {
        path: paths.update,
        name: 'LoginUpdate',
        component: LoginUpdate
    },
    {
        path: paths.verify,
        name: 'LoginVerify',
        component: LoginVerify
    }]
}