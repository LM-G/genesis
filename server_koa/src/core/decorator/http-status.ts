/**
 * Set the successful http status of a router action response
 */
import {registerResponseMetadata} from '../index';
import {ResponseMetadata} from '../metadata/response';
import {ResponseType} from '../metadata/type/response-type';
import {Context} from 'koa';

export function HttpStatus(code: number){
    return (target: Object, method: string) => {
        const meta = new ResponseMetadata({
            target: target.constructor,
            methodName: method,
            type: ResponseType.SUCCESS,
            behavior: behavior
        });

        registerResponseMetadata(meta);
    };

    function behavior(ctx: Context){
        ctx.status = code;
    }
}