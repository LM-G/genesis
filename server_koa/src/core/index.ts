import * as Koa from 'koa';
import {isEmpty} from 'lodash';
import {ControllerMetadata} from './metadata/controller';
import {ActionMetadata} from './metadata/action';
import {ParamMetadata} from './metadata/param';
import {GenesisCore, GenesisCoreOptions} from './genesis-core';
import {Injector} from './injector/injector-container';
import {MetadataStore} from './metadata/metadata-store';
import {MiddlewareMetadata} from './metadata/middleware';
import {DocumentMetadata} from './metadata/document';
import {FieldMetadata} from './metadata/field';
import {ResponseMetadata} from './metadata/response';

export { Body, Param } from './decorator/param';
export { Get, Post } from './decorator/action';
export { Before, After, Middleware } from './decorator/middleware';
export {Controller} from './decorator/controller';
export {Inject } from './decorator/inject';
export {Injectable } from './decorator/injectable';
export {DataNotFoundError, FunctionalError, UnauthorizedError} from './error';

/** metadata store name */
const STORE_TOKEN = MetadataStore.name;
/** Core application */
let core : GenesisCore;

/**
 * Creates the server application
 * @param {GenesisCoreOptions} opts server options
 * @returns {"koa"} koa instance describing the application
 */
export function createApp(opts : GenesisCoreOptions): Koa{
    core = new GenesisCore(opts);
    try {
        core
            .initDocuments().registerDocuments()
            .initMiddlewares().registerMiddlewares()
            .initRouters().registerRouters()
            .registerRouters()
            .clean();
    } catch (err){
        console.error('Failed to start application', err);
        process.exit(1);
    }


    return core.app;
}

/**
 * Registers a controller metadata
 * @param {ControllerMetadata} meta controller metadata
 */
export function registerControllerMetadata(meta: ControllerMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.controllers.push(meta);
    // retrieves all controller actions and links them to it
    let actions = store.actions.filter((action: ActionMetadata) => {
        return action.target.name === meta.target.name;
    });
    meta.actions = actions;
    // Each action will be pointing to its parent controller
    actions.forEach((action: ActionMetadata) => {
        action.controller = meta;
        // retrieves all current response handlers meta and links them to the current action
        action.responseHandlers = store.responseHandlers.filter((responseHandler: ResponseMetadata) => {
            return responseHandler.methodName === action.method;
        });
    });
    // handles possible missing middlewares
    if(isEmpty(meta.middlewares)){
        let middlewares = store.middlewares.filter((middleware: MiddlewareMetadata) => {
            return middleware.target === meta.target;
        });
        meta.middlewares.push(middlewares);
    }
}

/**
 * Registers a controller action metadata
 * @param {ActionMetadata} meta controller action metadata to store
 */
export function registerActionMetadata(meta: ActionMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.actions.push(meta);
    // retrieves all current action params meta and links them
    let params = store.params.filter((param: ParamMetadata) => {
        return param.methodName === meta.method;
    });
    meta.params = params;
    // Each param will be pointing to its parent action
    params.forEach((param: ParamMetadata) => {
        param.action = meta;
    });
}

/**
 * Registers an action param metadata
 * @param {ParamMetadata} meta action param to store
 */
export function registerParamMetadata(meta: ParamMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.params.push(meta);
}

/**
 * Registers a middleware metadata
 * @param {MiddlewareMetadata} meta middleware metadata
 */
export function registerMiddleMetadata(meta: MiddlewareMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.middlewares.push(meta);
    // retrieve corresponding controller
    let controller = store.controllers.find((controllerMeta: ControllerMetadata) => {
        return controllerMeta.target === meta.target;
    });
    if(controller){
        controller.middlewares.push(meta);
    }
}

/**
 * Registers a document metadata
 * @param {DocumentMetadata} meta document metadata
 */
export function registerDocumentMetadata(meta: DocumentMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.documents.push(meta);
    // retrieve fields
    meta.fields = store.fields.filter((fieldMeta: FieldMetadata) => {
        return fieldMeta.target === meta.target;
    });
}

/**
 * Registers a document field metadata
 * @param {FieldMetadata} meta field metadata
 */
export function registerFieldMetadata(meta: FieldMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.fields.push(meta);
}

/**
 * Registers an action response handler metadata
 * @param {ResponseMetadata} meta field metadata
 */
export function registerResponseMetadata(meta: ResponseMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    // insert meta in store
    store.responseHandlers.push(meta);
}