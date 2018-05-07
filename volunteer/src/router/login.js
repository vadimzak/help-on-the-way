import Login from '@/components/features/auth/Login'
import LoginUpdate from '@/components/features/auth/LoginUpdate'
import LoginVerify from '@/components/features/auth/LoginVerify'

const paths = {
  login: '/login',
  update: '/login/update',
  verify: '/login/verify'
}

const routes = [{
  path: paths.login,
  component: Login,
  meta: { noScroll: true }
},
{
  path: paths.update,
  component: LoginUpdate,
  meta: { noScroll: true }
},
{
  path: paths.verify,
  component: LoginVerify,
  meta: { noScroll: true }
}]

export {
  paths,
  routes
}
