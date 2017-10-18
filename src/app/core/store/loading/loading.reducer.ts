import { LOADING_ACTION, LoadingAction } from './loading.action';

export function loadingReducer (state: boolean = false, action: LoadingAction) {
    switch (action.type) {
        case LOADING_ACTION.CMD_START_LOADING:
            return true;
        case LOADING_ACTION.CMD_STOP_LOADING:
            return false;
        default:
            return state;
    }
}
