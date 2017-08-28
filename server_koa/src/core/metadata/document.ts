/**
 * Document params
 */
import { FieldMetadata } from './field';

export interface DocumentMetadataArgs {
    target: Function;
    name: string;
    options: any;
}
export class DocumentMetadata{
    fields: FieldMetadata[];
    target: Function;
    name: string;
    options: any;
    constructor(opts : DocumentMetadataArgs){
        this.fields = [];
        this.target =  opts.target;
        this.name =  opts.name;
        this.options = opts.options;
    }
}