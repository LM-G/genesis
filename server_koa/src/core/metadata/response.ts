import {ResponseType} from './type/response-type';

export interface ResponseMetadataArgs {
    target: any;
    methodName: string;
    type: ResponseType;
    code: number;
}

export class ResponseMetadata {
    target: any;
    methodName: string;
    type: ResponseType;
    code: number;
    constructor(opts: ResponseMetadataArgs){
        this.target = opts.target;
        this.methodName =  opts.methodName;
        this.type = opts.type;
        this.code = opts.code;
    }
}