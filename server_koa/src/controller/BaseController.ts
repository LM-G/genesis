import * as Router from 'koa-router';

/**
 * Abstract base controller which is extended by all other Controller.
 */
abstract class BaseController {
  path: string;
  constructor(){}

  abstract register(router:Router): void;

  build(): Router{
    const router = new Router({
      prefix: this.path
    });

    this.register(router);

    return router;
  }
}

export { BaseController };