import { forEach } from 'lodash';
import * as Application from 'koa';
import { Context } from 'koa';
import * as Router from 'koa-router';
import {GET, IRoute, POST, ROUTES} from '../decorator/path-decorator';
import {PATH} from '../decorator/controller-decorator';
import { config } from '../../../config/environment';
import {ControllerType, Injector} from '../injector/injector-container';

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
    // construct controller path
    let url = config.restApiRoot + Reflect.getMetadata(PATH, controller);
    // defines controller prefix
    const router = new Router({
        prefix: url
    });
    let routes = Reflect.getMetadata(ROUTES, controller);
    // register each route on current router
    forEach(routes, route => loadRoute(route, controller, router));
    // register the router in app's middlewares cascade
    app.use(router.routes()).use(router.allowedMethods());
};

const loadControllers  = (controllers: any[], app:Application) => {
    // Instanciate each controller and load it in app
    forEach(controllers, controller => loadController(new controller(), app));
};

/**
 * Middleware to register all routers
 * @returns {(ctx: Application.Context, next: Function) => Middleware} Middleware
 */
export function RouterLoader(){
    return async (ctx: Context, next: () => Promise<any>) => {
        const app: Application = ctx.app;
        const notProtectedControllers = Injector.getControllers(ControllerType.NOT_PROTECTED);
        const protectedControllers = Injector.getControllers(ControllerType.PROTECTED);
        // load and enable public routers to be hit without authentication
        loadControllers(notProtectedControllers, app);
        await next();



        // load and protect behind authentication other routers
        loadControllers(protectedControllers, app);
        if(ctx.isAuthenticated()){
            next();
        } else {
            ctx.status = 401;
        }
    }
}


