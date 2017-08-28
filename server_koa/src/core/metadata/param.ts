import {ActionMetadata} from './action';
import {ActionParamType} from './type/param-type';

export interface ParamMetadataArgs {
    target: any;
    methodName: string;
    index: number;
    type: ActionParamType;
    name: string;
    required: boolean;
    paramType: any;
    isObject?: boolean;
}

export class ParamMetadata {
    /**
     * Action which hold this param
     */
    action: ActionMetadata;
    /**
     * Object on which's method's parameter this parameter is attached.
     */
    target: any;
    /**
     * Method on which's parameter is attached.
     */
    methodName: string;

    /**
     * Parameter's index in the method signature.
     */
    index: number;

    /**
     * Parameter's type
     */
    paramType: any;

    /**
     * Action Parameter type.
     */
    type: ActionParamType;

    /**
     * Parameter's name.
     */
    name: string;

    /**
     * Indicates if this parameter is required or not
     */
    required: boolean;

    /**
     * Indicates if this parameter holds an object
     */
    isObject: boolean;

    constructor(opts: ParamMetadataArgs){
        this.target = opts.target;
        this.methodName = opts.methodName;
        this.name = opts.name;
        this.index = opts.index;
        this.type = opts.type;
        this.required = opts.required;
        this.paramType = opts.paramType;
        this.isObject = opts.isObject || opts.paramType instanceof Function || opts.paramType.toLowerCase() === "object";
    }

}