import {Injector, ControllerType} from '../injector/injector-container';
/** Controller path metadata identifier */
export const PATH = 'path';

interface ControllerOptions {
    /** Indicates if the controller is public or is behind authentication */
    authenticated: boolean;
}

/**
 *  Decorator to enable a controller which extends BaseController to be given a base path
 * @param {string} path path to give to the controller
 * @param {ControllerOptions} opts custom options
 * @returns {(target: Function) => any}
 */
export function controller(path: string, opts? : ControllerOptions) {
    return (target: Function) => {
        Reflect.defineMetadata(PATH, path, target.prototype);
        // marks the controller as public or not
        let type = opts != null && opts.authenticated === false ?
            ControllerType.UNAUTHENTICATED : ControllerType.AUTHENTICATED;
        Injector.registerController(type, target);
    }
}
