import * as Router from 'koa-router';
import { Context } from 'koa';
import { ControllerMetadata } from './metadata/controller-metadata';
import { ActionMetadata } from './metadata/action-metadata';
import { ActionType } from './metadata/type/action-type';
import { ParamMetadata } from './metadata/param-metadata';
import { ParamType } from './metadata/type/param-type';

/**
 * Build a router from a controller metadata
 */
export class RouterBuilder{
    /** Router instance */
    private router: Router;
    /** Metadata holding all informations */
    private controllerMetadata: ControllerMetadata;
    /** controller instance */
    private controller: Function;

    /**
     * RouterBuilder's contructor
     * @param {string} prefix base application path to append before all router path
     * @param {ControllerMetadata} controllerMetadata metadata to convert
     */
    constructor(prefix: string, controllerMetadata : ControllerMetadata){
        // inits router instance with its own path
        this.router = new Router({
            prefix: prefix + controllerMetadata.route
        });
        // stores the metadata
        this.controllerMetadata = controllerMetadata;
    }

    /**
     * Converts the metadata to a router with all its actions
     * @returns {Router} router
     */
    build(){
        // instanciate the referenced controller to activate dependency injection
        this.controller = new this.controllerMetadata.target();
        // retrives all controller actions
        this.controllerMetadata.actions
            .forEach((actionMeta : ActionMetadata) => {
                this.loadAction(actionMeta);
            });

        return this.router;
    }

    /**
     * Register an action on a router with its verb, path and method to execute
     * @param {ActionMetadata} meta
     */
    protected loadAction(meta: ActionMetadata){
        /**
         * Wrap controller original method with ko
         * @param {Application.Context} ctx
         * @returns {Promise<void>}
         */
        let wrapper = async (ctx: Context) => {
            // retrives all current action parameters
            let args = meta.params
                .sort((param1, param2) => param1.index - param2.index)
                .map((paramMeta : ParamMetadata) => {
                    return this.loadParam(ctx, paramMeta);
                });
            // calls the controller method with parameters loaded from original koa context
            let result = await meta.target.prototype[meta.method].call(this.controller, ...args);
            // if a result is present
            if(result){
                // returns it on the context body
                ctx.body = result;
            } else {
                // else defines status 204 for all no content responses
                ctx.status = 204;
            }
        };

        // add action on the router
        (<any>this.router)[ActionType.getHttpVerb(meta.type)](meta.route, wrapper);
    }

    /**
     * TODO type checking and type convertion
     * Match an action parameter metadata with the real context. Extract the context informations when needed
     * and saves them in the arguments list which will be send to the controller being called method.
     * @param {Application.Context} ctx koa context
     * @param {ParamMetadata} paramMeta metadata describing an argument to provide to a controller method
     * @returns {any}
     */
    protected loadParam(ctx: Context, paramMeta : ParamMetadata){
        let arg : any;
        switch(paramMeta.type){
            // if the param is a path param
            case ParamType.PATH_PARAM:
                // extracts it from the context params
                arg = ctx.params[paramMeta.name];
                break;
            // if the param is a body
            case ParamType.BODY:
                // extracts it from the context request
                arg = ctx.request.body;
                break;
            default: throw Error('Unknown parameter type');
        }
        // if the parameter is required and missing
        if(paramMeta.required && arg == null){
            // TODO validation error handling
            throw new Error(`Missing parameter : ${paramMeta.name}`);
        }

        return arg;
    }
}
