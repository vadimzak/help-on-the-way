import store from '../store/store'
import { paths as routes } from '../router/login'
const ANONYMOUS = process.env.ANONYMOUS_ROLE

const force = router => {
  router.beforeEach(async (to, from, next) => {
    if (!store.state.user) {
      const user = await router.app.$authContext.getUser()
      store.commit('login', user)
    }
    let currentRole = store.state.user.role

    if (currentRole === ANONYMOUS && to.path !== routes.login) {
      return next(routes.login)
    } else if (currentRole === 'VOLUNTEER_UNVERIFIED' && [routes.update, routes.verify].indexOf(to.path) === -1) {
      return next(routes.update)
    } else if (currentRole === 'VOLUNTEER' && [routes.login, routes.update, routes.verify].indexOf(to.path) !== -1) {
      return next()
    }
    next()
  })
}

export default {
  force
}
