import { forEach } from 'lodash';
import { Context } from 'koa';
import * as Router from 'koa-router';
import Application = require('koa');
import * as controllers from '../../controller';
import {AppIocContainer} from '../app-ioc-container';
import {BaseController} from '../../controller/base-controller';
import {Container} from 'inversify';

/**
 * Loads and register all application controller with their respective route
 * @returns async middleware which register all controller behaviors
 */
export function RouterLoader(container: AppIocContainer) {
    return async (ctx: Context, next:Function) => {
        let app: Application = ctx.app;
        let test: Container = container.getContainer();

        forEach(controllers, (controllerClass) => {
            // register the controller in Koa

            let ctrl: BaseController  = test.get(controllerClass.name);
            let router:Router = new controllerClass().build();
            app.use(router.routes()).use(router.allowedMethods());
        });

        // proceed app bootstraping with next middleware
        await next();
    }
}
