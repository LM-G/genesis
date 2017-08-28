import { ActionType } from '../metadata/type/action-type';
import { registerActionMetadata } from '../';
import { ActionMetadata } from '../metadata/action';

/**
 * POST route annotation factory
 * @param {string} path
 * @returns post decorator function
 */
export const Post = (path: string) => {
    return registerAction(path, ActionType.POST);
};


/**
 * GET route annotation factory
 * @param {string} path
 * @returns post decorator function
 */
export const Get = (path: string) => {
    return registerAction(path, ActionType.GET);
};

/**
 * Set route metadata to configure a router later on
 * @param {string} path route path
 * @param {string} type route http verb
 * @returns effective decorator function
 */
function registerAction(path: string, type: ActionType) {
    // get the decorator function
    return function(target: Object, method: string) {
        let meta = new ActionMetadata({
            target: target.constructor,
            route: path,
            method: method,
            type: type
        });
        registerActionMetadata(meta);
    }
}


