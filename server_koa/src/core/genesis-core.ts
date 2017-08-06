import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Logger from 'koa-logger';
import { MetadataStore } from './metadata/metadata-store';
import { ControllerMetadata } from './metadata/controller-metadata';
import { RouterBuilder } from './router-builder';
import { Inject } from './decorator/inject-decorator';
import { ErrorHandler } from './middleware/error-handler';

/**
 * Server core initialization options
 */
export interface GenesisCoreOptions {
    apiPath: string;
    controllers : string;
}

/**
 * Server's core
 */
export class GenesisCore {
    /** metadata storage */
    @Inject
    private metadataStore: MetadataStore;
    /** controllers dir location */
    private controllerDirPath: string;
    /** server base api url */
    private apiPath: string;
    /** actual server instance */
    public app: Koa;

    /**
     * Core constructor
     * @param {GenesisCoreOptions} opts server options
     */
    constructor(opts: GenesisCoreOptions){
        this.controllerDirPath = opts.controllers;
        this.apiPath = opts.apiPath;
        this.app = new Koa();
        /** registers middlewares */
        this.app
            .use(Logger())
            .use(BodyParser())
            .use(ErrorHandler());
    }

    /**
     * Initializes controller linked decorators
     * Metadata will load in this order when a controller is read :
     * 1 - params for current action
     * 2 - actions for current controller
     * 3 - controller itself
     * @returns {GenesisCore}
     */
    initialize(){
        // require all controllers to init their decorators
        require('require-all')({
            dirname     :  this.controllerDirPath,
            filter      :  /(.+-controller)\.js$/
        });
        return this;
    }

    /**
     * Creates app routers thanks to stored metadata
     * @returns {GenesisCore}
     */
    createRouters(){
        this.metadataStore.controllers
            .forEach((meta: ControllerMetadata) => {
                // converts a controller metadata to proper router
                const router = new RouterBuilder(this.apiPath, meta).build();
                // registers it in application
                this.app.use(router.routes()).use(router.allowedMethods());
            });
        return this;
    }
}