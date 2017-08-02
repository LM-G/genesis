import {Context, Middleware} from 'koa';
import {FunctionalException} from '../exception/functional.exception';

/**
 * Global handler error
 * @returns Middleware error handling middleware
 */
export function ErrorHandler(): Middleware{
    return async (ctx: Context, next: () => Promise<any>) => {
        try {
            await next();
        } catch(err){
            if(err instanceof FunctionalException){
                ctx.status = err.status;
                ctx.body = err.message;
            } else {
                ctx.status = 500;
                ctx.body = 'Oops';
            }
            console.error(err);
        }
    }
}