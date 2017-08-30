import {ResponseType} from './type/response-type';

export interface ResponseMetadataArgs {
    target: any;
    methodName: string;
    type: ResponseType;
    behavior: Function;
}

export class ResponseMetadata {
    target: any;
    methodName: string;
    type: ResponseType;
    behavior: Function;
    constructor(opts: ResponseMetadataArgs){
        this.target = opts.target;
        this.methodName =  opts.methodName;
        this.type = opts.type;
        this.behavior = opts.behavior;
    }
}