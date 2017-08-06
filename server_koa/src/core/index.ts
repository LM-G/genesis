import * as Koa from 'koa';
import { ControllerMetadata } from './metadata/controller-metadata';
import { ActionMetadata } from './metadata/action-metadata';
import { ParamMetadata } from './metadata/param-metadata';
import { GenesisCore } from './genesis-core';
import { Injector } from './injector/injector-container';
import { MetadataStore } from './metadata/metadata-store';
export { Body, Param } from './decorator/param-decorator';



export type GenesisCoreOptions = {
    routePrefix: string,
    controllers : string
}

let core : GenesisCore;
const STORE_TOKEN = MetadataStore.name;

export function createApp(opts : GenesisCoreOptions): Koa{
    core = new GenesisCore(opts);
    core.initialize().createRouters();
    return core.app;
}

export function registerControllerMetadata(meta: ControllerMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    store.controllers.push(meta);
    let actions = store.actions.filter((action: ActionMetadata) => {
        return action.target.name === meta.target.name;
    });
    meta.actions = actions;
    actions.forEach((action: ActionMetadata) => {
        action.controller = meta;
    });
}

export function registerActionMetadata(meta: ActionMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    store.actions.push(meta);
    let params = store.params.filter((param: ParamMetadata) => {
        return param.methodName === meta.method;
    });
    meta.params = params;
    params.forEach((param: ParamMetadata) => {
        param.action = meta;
    });
}

export function registerParamMetadata(meta: ParamMetadata){
    let store = Injector.resolve(STORE_TOKEN);
    store.params.push(meta);
}