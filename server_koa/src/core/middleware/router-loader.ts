import { forEach } from 'lodash';
import { Context } from 'koa';
import * as Router from 'koa-router';
import Application = require('koa');
import * as controllers from '../../controller';
import {GET, IRoute, POST, ROUTES} from '../decorator/path-decorator';
import {PATH} from '../decorator/controller-decorator';

/**
 * Load a route of a controller in koa-router
 * @param {IRoute} route route to load
 * @param controller controller which hold the route
 * @param {Router} router koa-router
 */
const loadRoute = (route: IRoute, controller:any, router: Router) => {
    // to access the this from the current controller inside its extracted methods
    route.action = route.action.bind(controller);
    // register the controller method on koa router
    switch(route.verb){
        case GET:
        case POST:
            router[route.verb](route.path, route.action);
            break;
        default: throw new Error(`Unknown http verb ${route.verb}`);
    }
};

/**
 * Load a controller in app and register all its routes
 * @param {Function} controller controller to instanciate and register
 * @param {Application} app app instance
 */
const loadController = (controller: Function, app:Application) => {
    // defines controller prefix
    const router = new Router({
        prefix: Reflect.getMetadata(PATH, controller)
    });
    let routes = Reflect.getMetadata(ROUTES, controller);
    forEach(routes, route => loadRoute(route, controller, router));
    app.use(router.routes()).use(router.allowedMethods());
};

/**
 * Middleware to register all routers
 * @returns {(ctx: Application.Context, next: Function) => Promise<any>} Middleware
 */
export function RouterLoader(){
    return async (ctx: Context, next:Function) => {
        let app: Application = ctx.app;
        forEach(controllers, instanceConstructor => loadController(new instanceConstructor(), app));
        await next();
    }
}


