import {ActionMetadata} from './action-metadata';

/**
 * Controller params
 */
export interface ControllerMetadataArgs {
    route: string;
    target: any;
}

export class ControllerMetadata {
    /**
     * Actions.
     */
    actions: ActionMetadata[];
    /**
     * Controller target prototype.
     */
    target: any;
    /**
     * Base route for all actions registered in this controller.
     */
    route: string;

    constructor(args: ControllerMetadataArgs) {
        this.target = args.target;
        this.route = args.route;
    }
}