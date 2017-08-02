import {Injector} from '../injector/injector-container';
/** Controller path metadata identifier */
export const PATH = 'path';
export const TYPE = 'type';

/**
 *  Decorator to enable a controller which extends BaseController to be given a base path
 * @param {string} path path to give to the controller
 * @returns {(target: Function) => any}
 */
export function Controller(path: string) {
    return (target: Function) => {
        Reflect.defineMetadata(PATH, path, target.prototype);
        Injector.registerController(target);
    }
}
