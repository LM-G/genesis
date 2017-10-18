import { Action } from '@ngrx/store';
import { User } from '../../../shared/model/user';

const CMD_FETCH_USER = 'CMD_FETCH_USER';
const EVT_USER_FETCHED = 'EVT_USER_FETCHED';
const CMD_SET_USER = 'CMD_SET_USER';
const CMD_RESET_USER = 'CMD_RESET_USER';

export class FetchUserAction implements Action {
    type = CMD_FETCH_USER;
}

export class UserFetchedAction implements Action {
    type = EVT_USER_FETCHED;
    constructor(public user: User) {}
}

export class SetUserAction implements Action {
    type = CMD_SET_USER;
    constructor(public user: User) {}
}

export class ResetUserAction implements Action {
    type = CMD_RESET_USER;
}

export type UserAction = FetchUserAction
    | UserFetchedAction
    | SetUserAction
    | ResetUserAction;

export const USER_ACTION = {
    CMD_FETCH_USER,
    EVT_USER_FETCHED,
    CMD_SET_USER,
    CMD_RESET_USER
};



