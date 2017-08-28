import { Schema } from 'mongoose';
import { find } from 'lodash';
import { Injectable } from '../decorator/injectable';


/**
 * Singleton storing all application metadata
 */
@Injectable
export class SchemasStore{
    /** schemas */
    public schemas: {
        document: any,
        name: string,
        schema: Schema
    }[];

    constructor(){
        this.schemas = [];
    }

    find<T>(target: { new (): T }){
        return find(this.schemas, schema => target === schema.document);
    }
}