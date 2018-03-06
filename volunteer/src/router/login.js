import Login from '@/components/Login'
import LoginUpdate from '@/components/LoginUpdate'
import LoginVerify from '@/components/LoginVerify'

const paths = {
  login: '/login',
  update: '/login/update',
  verify: '/login/verify'
}

const routes = [{
  path: paths.login,
  component: Login
},
{
  path: paths.update,
  component: LoginUpdate
},
{
  path: paths.verify,
  component: LoginVerify
}]

export {
  paths,
  routes
}
