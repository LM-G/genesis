import { ControllerMetadata } from './controller-metadata';
import { ActionMetadata } from './action-metadata';
import { ParamMetadata } from './param-metadata';
import { Injectable } from '../decorator/injectable-decorator';

/**
 * Singleton storing all application metadata
 */
@Injectable
export class MetadataStore{
    /**
     * Controllers metadata
     */
    controllers: ControllerMetadata[];
    /**
     * Controller's actions metadata
     */
    actions: ActionMetadata[];
    /**
     * Action's parameters metadata
     */
    params: ParamMetadata[];

    constructor(){
        this.controllers = [];
        this.actions = [];
        this.params = [];
    }
}