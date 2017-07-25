/** Controller path metadata identifier */
export const PATH = 'path';
/**
 * Decorator to enable a controller which extends BaseController to be given a base path
 * @param path path to give to the controller
 * @returns {Function}
 */
export function controller(path: string) {
    return (target: Function) => {
        Reflect.defineMetadata(PATH, path, target.prototype);
    }
}
