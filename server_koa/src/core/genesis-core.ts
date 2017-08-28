import * as Koa from 'koa';
import { Middleware } from 'koa';
import * as BodyParser from 'koa-bodyparser';
import { isFunction } from 'lodash';
import { MetadataStore } from './metadata/metadata-store';
import { ControllerMetadata } from './metadata/controller';
import { RouterBuilder } from './router-builder';
import { Inject } from './decorator/inject';
import { MiddlewareMetadata } from './metadata/middleware';
import { MiddlewareType } from './metadata/type/middleware-type';
import { DocumentMetadata } from './metadata/document';
import { SchemaBuilder } from './schema-builder';
import { Schema } from 'mongoose';
import { SchemasStore } from "./odm/schemas-store";
import { RequestLogger } from '../middleware/request-logger';

/**
 * Server core initialization options
 */
export interface GenesisCoreOptions {
    apiPath: string;
    controllers : string;
    middlewares: string;
    models: string;
}

/**
 * Server's core
 */
export class GenesisCore {
    /** metadata storage */
    @Inject
    private metadataStore: MetadataStore;
    /** schemas */
    @Inject
    private schemasStore: SchemasStore;

    /** controllers dir location */
    private controllerDirPath: string;
    /** controllers dir location */
    private middlewareDirPath: string;
    /** controllers dir location */
    private modelDirPath: string;
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
        this.middlewareDirPath = opts.middlewares;
        this.modelDirPath = opts.models;
        this.apiPath = opts.apiPath;
        this.app = new Koa();
        /** generic middlewares */
        this.app
            .use(RequestLogger())
            .use(BodyParser());
    }

    /**
     * Initializes documents metadata
     * @returns {GenesisCore}
     */
    initDocuments(){
        // require all documents to init their decorators
        this.requireMetadata(this.modelDirPath, /.js$/);
        return this;
    }

    /**
     * Metadata will load in this order when a controller is read :
     * 1 - params for current action
     * 2 - actions for current controller
     * 3 - controller itself
     * @returns {GenesisCore}
     */
    initRouters(){
        // require all controllers to init their decorators
        this.requireMetadata(this.controllerDirPath, /(.+-controller)\.js$/);
        return this;
    }

    /**
     * Initialize app global middlewares metadata
     */
    initMiddlewares(){
        // require all middlewares to init their decorators
        this.requireMetadata(this.middlewareDirPath, /.js$/);
        return this;
    }

    /**
     * Clean metadata store
     */
    clean(){
        this.metadataStore.reset();
    }

    /**
     * Creates app routers thanks to stored metadata
     * @returns {GenesisCore}
     */
    registerRouters(){
        this.metadataStore.controllers
            .forEach((meta: ControllerMetadata) => {
                // converts a controller metadata to proper router
                const router = new RouterBuilder(this.apiPath, meta).build();

                // registers it in application
                this.app.use(router.routes()).use(router.allowedMethods());
            });
        return this;
    }

    /**
     * Register global middlewares
     * @returns {GenesisCore}
     */
    registerMiddlewares(){
        this.metadataStore.middlewares
            .filter((meta: MiddlewareMetadata) => {
                return meta.type === MiddlewareType.GLOBAL && isFunction((<any>meta.middleware));
            })
            .sort((m1, m2) => m1.index - m2.index)
            .forEach((meta: MiddlewareMetadata) => {
                // registers it in application
                this.app.use(<Middleware>meta.middleware);
            });
        return this;
    }

    /**
     * Register documents
     * @returns {GenesisCore}
     */
    registerDocuments(){
        this.metadataStore.documents
            .forEach((meta: DocumentMetadata) => {
                const schema = new SchemaBuilder(meta).build();
                this.schemasStore.schemas.push({
                    document: meta.target,
                    name: meta.name,
                    schema: new Schema(schema.definition, schema.options)
                });
            });
        return this;
    }

    private requireMetadata(location: string, filter: RegExp){
        require('require-all')({
            dirname     :  location,
            filter      :  filter
        });
    }
}