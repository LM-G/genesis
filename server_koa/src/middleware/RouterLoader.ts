import { forEach } from 'lodash';
import { Context } from 'koa';
import * as Router from 'koa-router';
import Application = require('koa');
import * as controllers from '../controller';

/**
 * Loads and register all application controller with their respective route
 * @returns async middleware which register all controller behaviors
 */
export function RouterLoader() {
  return async (ctx: Context, next:Function) => {
    let app: Application = ctx.app;

    forEach(controllers, (controllerClass) => {
      // register the controller in Koa
      let router:Router = new controllerClass().build();
      app.use(router.routes()).use(router.allowedMethods());
    });

    // proceed app bootstraping with next middleware
    await next();
  }
}
