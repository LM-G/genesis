import * as Koa from 'koa';
import { ControllerMetadata } from './metadata/controller-metadata';
import { ActionMetadata } from './metadata/action-metadata';
import { ParamMetadata } from './metadata/param-metadata';
import { GenesisCore, GenesisCoreOptions } from './genesis-core';
import { Injector } from './injector/injector-container';
import { MetadataStore } from './metadata/metadata-store';
export { Body, Param } from './decorator/param-decorator';
export { Get, Post } from './decorator/action-decorator';
export {Controller} from './decorator/controller-decorator';
export {Inject } from './decorator/inject-decorator';
export {Injectable } from './decorator/injectable-decorator';

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
    core.initialize().createRouters();
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
    });
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
    // Each param will be poitong to its parent action
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