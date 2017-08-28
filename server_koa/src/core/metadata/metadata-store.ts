import { ControllerMetadata } from './controller';
import { ActionMetadata } from './action';
import { ParamMetadata } from './param';
import { Injectable } from '../decorator/injectable';
import { MiddlewareMetadata } from './middleware';
import { FieldMetadata } from './field';
import { DocumentMetadata } from './document';

/**
 * Singleton storing all application metadata
 */
@Injectable
export class MetadataStore{
    /**
     * Document metadata
     */
    documents: DocumentMetadata[];
    /**
     * Document fields metadata
     */
    fields: FieldMetadata[];
    /**
     * Middlewares metadata
     */
    middlewares: MiddlewareMetadata[];
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
        this.reset();
    }

    reset(){
        this.documents = [];
        this.fields = [];
        this.middlewares = [];
        this.controllers = [];
        this.actions = [];
        this.params = [];
    }
}