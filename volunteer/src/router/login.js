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
