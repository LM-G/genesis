import { Action } from '@ngrx/store';

export class Connect implements Action {
    public type = 'CONNECT';
}


export const USER_ACTIONS = {
    CONNECT: Connect
};
