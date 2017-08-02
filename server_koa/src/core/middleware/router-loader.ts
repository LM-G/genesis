import {forEach, includes} from 'lodash';
import * as Application from 'koa';
import {Context} from 'koa';
import * as Router from 'koa-router';
import {GET, IRoute, POST, ROUTES} from '../decorator/path-decorator';
import {PATH} from '../decorator/controller-decorator';
import {config} from '../../../config/environment';
import {Injector} from '../injector/injector-container';
import {AuthGuard} from './auth-guard';

const KNOW_ACTIONS = [GET, POST];

/**
 * Load a route of a controller in koa-router
 * @param {IRoute} route route to load
 * @param controller controller which hold the route
 * @param {Router} router koa-router
 */
const loadRoute = (route: IRoute, controller:any, router: Router) => {
    // to access the this from the current controller inside its extracted methods
    route.action = route.action.bind(controller);
    if(includes(KNOW_ACTIONS, route.verb)){
        if(route.protected){
            (<any>router)[route.verb](route.path, AuthGuard, route.action);
        } else {
            (<any>router)[route.verb](route.path, route.action);
        }
    } else {
        throw new Error(`Unknown http verb ${route.verb}`);
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
        // load controllers
        loadControllers(Injector.getControllers(), app);
        await next();
    }
}


