import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Logger from 'koa-logger';
import { MetadataStore } from './metadata/metadata-store';
import { ControllerMetadata } from './metadata/controller-metadata';
import { RouterBuilder } from './router-builder';
import { Inject } from './decorator/inject-decorator';
import { ErrorHandler } from './middleware/error-handler';

type GenesisCoreOptions = {
    routePrefix: string,
    controllers : string
}

export class GenesisCore {
    @Inject
    private metadataStore: MetadataStore;
    private controllerDirPath: string;
    private routerBasePath: string;

    // actual server instance
    public app: Koa;

    constructor(opts: GenesisCoreOptions){
        this.controllerDirPath = opts.controllers;
        this.routerBasePath = opts.routePrefix;
        this.app = new Koa();
        this.app
            .use(Logger())
            .use(BodyParser())
            .use(ErrorHandler());
    }

    initialize(){
        // require all controllers to init their decorators
        require('require-all')({
            dirname     :  this.controllerDirPath,
            filter      :  /(.+-controller)\.js$/
        });
        return this;
    }

    createRouters(){
        this.metadataStore.controllers
            .forEach((meta: ControllerMetadata) => {
                const router = new RouterBuilder(this.routerBasePath, meta).build();
                this.app.use(router.routes()).use(router.allowedMethods());
                new meta.target();
            });
        return this;
    }
}