import { User } from '../../shared/model/user';
import { USER_REDUCER } from './reducer/user.reducers';

export interface AppState {
    /**
     * current user
     */
    user: User;
}

export const APP_REDUCERS = {
    USER_REDUCER
};

export const APP_EFFECTS = [

];

