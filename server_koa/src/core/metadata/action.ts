import {ControllerMetadata} from './controller';
import {ParamMetadata} from './param';
import {ActionType} from './type/action-type';
import {ResponseMetadata} from './response';

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
     * Reponse handlers
     */
    responseHandlers: ResponseMetadata[];
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

    /**
     * method's name
     */
    method: string;

    /**
     * Autorization required to use the route
     */
    roles: string[];

    constructor(opts: ActionMetadataArgs){
        this.params = [];
        this.responseHandlers = [];
        this.target = opts.target;
        this.route = opts.route;
        this.type = opts.type;
        this.method = opts.method;
    }

}