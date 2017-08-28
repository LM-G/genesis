import { MiddlewareMetadata } from '../metadata/middleware';
import { MiddlewareType } from '../metadata/type/middleware-type';
import { registerMiddleMetadata } from '../index';

export function Middleware(target: any) {
    if(!target.prototype['execute']){
        throw new TypeError(`${target.name} must have an execute method`);
    }
    const meta = new MiddlewareMetadata({
        target: target,
        type: MiddlewareType.GLOBAL,
        index: 0,
        middleware: target.prototype.execute
    });

    registerMiddleMetadata(meta);
}

export function Before(...middlewares: Function[]) {
    return registerMiddlewares(MiddlewareType.BEFORE, middlewares);
}

export function After(...middlewares: Function[]) {
    return registerMiddlewares(MiddlewareType.AFTER, middlewares);
}

function registerMiddlewares(type: MiddlewareType, middlewares: Function[]){
    return (target: Function) => {
        middlewares.forEach((middleware, index) => {
            const meta = new MiddlewareMetadata({
                target: target,
                type: type,
                index: index,
                middleware: middleware
            });

            registerMiddleMetadata(meta);
        });
    }
}