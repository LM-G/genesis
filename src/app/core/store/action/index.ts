import { Action } from '@ngrx/store';
import { USER_ACTIONS } from './user';

export interface ActionWithPayload extends Action {
    payload?: any;
}

export const ALL_ACTIONS = {
    ...USER_ACTIONS
};
