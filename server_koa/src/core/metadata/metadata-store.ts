import { ControllerMetadata } from './controller-metadata';
import { ActionMetadata } from './action-metadata';
import { ParamMetadata } from './param-metadata';
import { Injectable } from '../decorator/injectable-decorator';

/**
 * Contient toutes les metadatas de l'application
 */
@Injectable
export class MetadataStore{
    controllers: ControllerMetadata[];
    actions: ActionMetadata[];
    params: ParamMetadata[];

    constructor(){
        this.controllers = [];
        this.actions = [];
        this.params = [];
    }
}