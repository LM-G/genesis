/**
 * Controller Action params
 */
import { MiddlewareType } from './type/middleware-type';

export interface MiddlewareMetadataArgs {
    target: Function;
    type: MiddlewareType;
    middleware: Function;
    index: number;
}

/**
 * Controller action metadata
 */
export class MiddlewareMetadata {
    /** class targeted */
    target: Function;
    /** Runs middleware before or after routing */
    type: MiddlewareType;
    /** middleware */
    middleware: Function;
    /** middleware position in list */
    index: number;

    constructor(opts : MiddlewareMetadataArgs){
        this.target = opts.target;
        this.type = opts.type;
        this.middleware = opts.middleware;
        this.index = opts.index;
    }
}