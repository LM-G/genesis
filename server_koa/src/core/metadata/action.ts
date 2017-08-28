import {ControllerMetadata} from './controller';
import {ParamMetadata} from './param';
import {ActionType} from './type/action-type';

/**
 * Controller Action params
 */
export interface ActionMetadataArgs {
    route: string;
    target: Function;
    method: string;
    type: ActionType;
}

/**
 * Controller action metadata
 */
export class ActionMetadata {
    /**
     * Controller attached to the action
     */
    controller: ControllerMetadata;
    /**
     * Action parameters
     */
    params: ParamMetadata[];
    /**
     * Action's class
     */
    target: Function;
    /**
     * Http action type GET, POST, etc ...
     */
    type: ActionType;
    /**
     * Route path
     */
    route: string;

    method: string;

    /**
     * Autorization required to use the route
     */
    roles: string[];

    constructor(opts: ActionMetadataArgs){
        this.target = opts.target;
        this.route = opts.route;
        this.type = opts.type;
        this.method = opts.method;
    }

}