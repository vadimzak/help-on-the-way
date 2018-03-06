import currentUserProvider from '../services/currentUserProvider'
import loginRoutes from '../router/login'

const ANONYMOUS = 'ADMIN';

const force = router => {
    router.beforeResolve((to, from, next) => {
        let currentRole = currentUserProvider.get().role;

        if (currentRole == ANONYMOUS && to.name !== 'Login') {
            return next(loginRoutes.paths.login);
        } else if (currentRole == 'VOLUNTEER_UNVERIFIED' && ['LoginUpdate', 'LoginVerify'].indexOf(to.name) == -1) {
            return next(loginRoutes.paths.update);
        } else if (currentRole == 'VOLUNTEER' && ['Login', 'LoginUpdate', 'LoginVerify'].indexOf(to.name) !== -1) {
            return next('/');
        }
        
        next();
    });
}

export default {
    force
};
