import store from '../store/'

const ANONYMOUS = process.env.ANONYMOUS_ROLE

const force = router => {
    router.beforeResolve(async (to, from, next) => {
      if (!store.state.auth.user) {
      const user = await router.app.$authContext.getUser()
      store.commit('auth/setUser', user)
    }
    const currentRole = store.state.auth.user.role
      if (currentRole === ANONYMOUS && to.name !== 'login') {
          return next({ path: '/login' })
      } else if (currentRole !== 'SPECIALIST' && currentRole !== ANONYMOUS && to.name !== 'unauthorized') {
        return next({
            path: '/unauthorized'
          })
      } else if (currentRole === 'SPECIALIST' && ['login', 'unauthorized'].indexOf(to.name) !== -1) {
      return next('/')
    }
    next()
  })
}

export default {
  force
}
