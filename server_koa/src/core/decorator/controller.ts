import { registerControllerMetadata } from '../';
import { ControllerMetadata } from '../metadata/controller';

/**
 *  Decorator to enable a controller which extends BaseController to be given a base path
 * @param {string} path path to give to the controller
 * @returns {(target: Function) => any}
 */
export function Controller(path: string) {
    return (target: Function) => {
        const meta = new ControllerMetadata({
            target: target,
            route: path
        });
        registerControllerMetadata(meta)
    }
}
