import { Action } from '@ngrx/store';

const CMD_START_LOADING = 'CMD_START_LOADING';
const CMD_STOP_LOADING = 'CMD_STOP_LOADING';

export const LOADING_ACTION = {
    CMD_START_LOADING,
    CMD_STOP_LOADING
};

export class StartLoadingAction implements Action {
    type = CMD_START_LOADING;
}

export class StopLoadingAction implements Action {
    type = CMD_STOP_LOADING;
}

export type LoadingAction = StartLoadingAction | StopLoadingAction;





