import {Context} from 'koa';
import {FunctionalError, Middleware} from '../core';
import {LOGGER} from '../../config/logger';
import {GenesisMiddleware} from './interface/middleware';

const chalk = require('chalk');

/**
 * Global handler error
 */
@Middleware
export class ErrorHandler implements GenesisMiddleware{
    async execute(ctx: Context, next: () => Promise<any>) {
        try {
            await next();
        } catch(err){
            // TODO error handling : {code : number, message: string, detail?: object}
            if(err instanceof FunctionalError){
                ctx.status = err.status;
                ctx.body = err.message;
            } else {
                ctx.status = 500;
                ctx.body = 'Oops something somewhere went terribly wrong';
            }
            LOGGER.error(err.message, err);
        }
    }
}