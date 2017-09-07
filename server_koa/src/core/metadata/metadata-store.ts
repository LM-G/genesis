import {ControllerMetadata} from './controller';
import {ActionMetadata} from './action';
import {ParamMetadata} from './param';
import {Injectable} from '../decorator/injectable';
import {MiddlewareMetadata} from './middleware';
import {FieldMetadata} from './field';
import {DocumentMetadata} from './document';
import {ResponseMetadata} from './response';
import {VirtualFieldMetadata} from './virtual-field';

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
     * Document virtuak fields metadata
     */
    virtualFields: VirtualFieldMetadata[];
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
    /**
     * Response metadata handlers
     */
    responseHandlers: ResponseMetadata[];

    constructor(){
        this.reset();
    }

    reset(){
        this.documents = [];
        this.fields = [];
        this.virtualFields = [];
        this.middlewares = [];
        this.controllers = [];
        this.actions = [];
        this.params = [];
        this.responseHandlers = [];
    }
}