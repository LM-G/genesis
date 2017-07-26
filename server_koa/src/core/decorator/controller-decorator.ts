/** Controller path metadata identifier */
export const PATH = 'path';
export const PUBLIC = 'public';

interface ControllerOptions {
    /** Indicates if the controller is public or is behind authentication */
    isPublic: boolean;
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
        let isPublic = opts != null && opts.isPublic === true;
        Reflect.defineMetadata(PUBLIC, isPublic, target.prototype);
    }
}
