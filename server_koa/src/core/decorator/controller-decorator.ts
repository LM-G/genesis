import {Injector, ControllerType} from '../injector/injector-container';
/** Controller path metadata identifier */
export const PATH = 'path';
export const TYPE = 'type';

export function NotProtected(target: Function){
    // marks the controller as not protected
    Reflect.defineMetadata(TYPE, ControllerType.NOT_PROTECTED, target.prototype);
}
/**
 *  Decorator to enable a controller which extends BaseController to be given a base path
 * @param {string} path path to give to the controller
 * @returns {(target: Function) => any}
 */
export function Controller(path: string) {
    return (target: Function) => {
        let proto = target.prototype;
        Reflect.defineMetadata(PATH, path, proto);
        const type = Reflect.getMetadata(TYPE, proto) || ControllerType.PROTECTED;
        Injector.registerController(type, target);
    }
}
