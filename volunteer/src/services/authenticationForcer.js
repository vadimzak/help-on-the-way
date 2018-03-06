import currentUserProvider from '../services/currentUserProvider'
import { paths as routes } from '../router/login'
console.log(routes);

const ANONYMOUS = 'ADMIN';

const force = router => {
    router.beforeResolve((to, from, next) => {
        let currentRole = currentUserProvider.get().role;

        if (currentRole == ANONYMOUS && to.path !== routes.login) {
            return next(routes.login);
        } else if (currentRole == 'VOLUNTEER_UNVERIFIED' && [routes.update, routes.verify].indexOf(to.path) == -1) {
            return next(routes.update);
        } else if (currentRole == 'VOLUNTEER' && [routes.login, routes.update, routes.verify].indexOf(to.path) !== -1) {
            return next('/');
        }

        next();
    });
}

export default {
    force
};
