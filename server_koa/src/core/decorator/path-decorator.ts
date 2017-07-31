import {IMiddleware} from 'koa-router';
import {Context} from 'koa';

export const POST = 'post';
export const GET = 'get';
/** Routes metadata identifier */
export const ROUTES = 'routes';

/**
 * Route metadata
 */
export interface IRoute{
    verb: string,
    path: string,
    action: IMiddleware
}

/**
 * Defines a route metadata
 * @param {string} verb route http verb
 * @param {string} path route path
 * @param {Router.IMiddleware} action route action to execute on path activated
 * @returns {IRoute} route metadata
 */
const defineRouteMetaData = (verb: string, path: string, action: IMiddleware) : IRoute => {
    return {
        verb: verb,
        path: path,
        action: action
    }
};

/**
 * Get routes metadata if exists or return an empty array
 * @param target prototype to inspect
 * @returns {IRoute[]} routes
 */
const getRoutes = (target: any) : IRoute[] => {
    return Reflect.getMetadata(ROUTES, target) || new Array();
};

/**
 * Set route metadata to configurate a router later on
 * @param {string} path route path
 * @param {string} verb route http verb
 * @returns effective decorator function
 */
const decorateRoute = (path: string, verb: string) => {
    // get the decorator function
    return (target: any, key: string, descriptor: TypedPropertyDescriptor<(ctx: Context) => Promise<any>>) => {
        //
        let routes = getRoutes(target);
        let route = defineRouteMetaData(verb, path, target[key]);
        routes.push(route);
        Reflect.defineMetadata(ROUTES, routes, target);
    }
};

/**
 * POST route annotation factory
 * @param {string} path
 * @returns post decorator function
 */
export const Post = (path: string) => {
    return decorateRoute(path, POST);
};


/**
 * GET route annotation factory
 * @param {string} path
 * @returns post decorator function
 */
export const Get = (path: string) => {
    return decorateRoute(path, GET);
};


