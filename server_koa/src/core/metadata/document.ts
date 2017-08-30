/**
 * Document params
 */
import {SchemaOptions} from 'mongoose';
import { FieldMetadata } from './field';


export interface DocumentMetadataArgs {
    target: Function;
    name: string;
    options: SchemaOptions;
}
export class DocumentMetadata{
    fields: FieldMetadata[];
    target: Function;
    name: string;
    options: SchemaOptions;
    constructor(opts : DocumentMetadataArgs){
        this.fields = [];
        this.target =  opts.target;
        this.name =  opts.name;
        this.options = opts.options;
    }
}