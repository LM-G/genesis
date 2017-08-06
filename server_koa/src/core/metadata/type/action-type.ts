/**
 * Action's type
 */
export enum ActionType {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}

export type ActionHttpVerb = 'get' | 'delete' | 'post' | 'put' | 'patch';

export namespace ActionType {
    export function getHttpVerb(type: ActionType){
        let verb: ActionHttpVerb;
        switch(type){
            case ActionType.GET: verb = 'get'; break;
            case ActionType.POST: verb = 'post'; break;
            case ActionType.PUT: verb = 'put'; break;
            case ActionType.PATCH: verb = 'patch'; break;
            case ActionType.DELETE: verb = 'delete'; break;
            default: throw new TypeError('Unknown http verb');
        }
        return verb;
    }
}