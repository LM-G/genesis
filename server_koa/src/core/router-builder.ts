import * as Router from 'koa-router';
import { ControllerMetadata } from './metadata/controller-metadata';
import { MetadataStore } from './metadata/metadata-store';
import { Inject } from './decorator/inject-decorator';
import { ActionMetadata } from './metadata/action-metadata';
import { ActionType } from './metadata/type/action-type';
import { ParamMetadata } from './metadata/param-metadata';
import { Context } from 'koa';
import { ParamType } from './metadata/type/param-type';

export class RouterBuilder{
    @Inject
    private store : MetadataStore;

    private router: Router;

    private controllerMetadata: ControllerMetadata;

    private controller: Function;

    constructor(prefix: string, controllerMetadata : ControllerMetadata){
        this.router = new Router({
            prefix: prefix + controllerMetadata.route
        });
        this.controllerMetadata = controllerMetadata;
    }

    build(){
        this.controller = new this.controllerMetadata.target();
        this.controllerMetadata.actions
            .forEach((actionMeta : ActionMetadata) => {
                this.loadAction(this.router, actionMeta);
            });

        return this.router;
    }

    protected loadAction(router: Router, meta: ActionMetadata){
        let callback = async (ctx: Context) => {
            let args = meta.params
                .sort((param1, param2) => param1.index - param2.index)
                .map((paramMeta : ParamMetadata) => {
                    return this.loadParam(ctx, paramMeta);
                });

            let result = await meta.target.prototype[meta.method].call(this.controller, ...args);
            if(result){
                ctx.body = result;
            } else {
                ctx.status = 204;
            }
        };

        (<any>router)[ActionType.getHttpVerb(meta.type)](meta.route, callback);
    }

    protected loadParam(ctx: Context, paramMeta : ParamMetadata){
        let arg = null;
        switch(paramMeta.type){
            case ParamType.PATH_PARAM:
                arg = ctx.params[paramMeta.name];
                break;
            case ParamType.BODY:
                arg = ctx.request.body;
                break;
            default: throw Error('Unknown parameter type');
        }
        if(paramMeta.required && arg == null){
            throw new Error(`Missing parameter : ${paramMeta.name}`);
        }

        return arg;
    }
}

