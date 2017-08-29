/**
 * Set the successful http status of a router action response
 */
import {registerResponseMetadata} from '../index';
import {ResponseMetadata} from '../metadata/response';
import {ResponseType} from '../metadata/type/response-type';

export function HttpStatus(code: number){
    return (target: Object, method: string) => {
        const meta = new ResponseMetadata({
            target: target.constructor,
            methodName: method,
            type: ResponseType.SUCCESS,
            code: code
        });
        registerResponseMetadata(meta);
    }
}