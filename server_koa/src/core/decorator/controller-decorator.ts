import { BaseController } from '../../controller/base-controller';

/**
 * Decorator to enable a controller which extends BaseController to be given a base path
 * @param path path to give to the controller
 * @returns {Function}
 */
export function Controller(path: string): Function{
  return function(target: typeof BaseController){
    target.prototype.path = path;
    return target;
  }
}