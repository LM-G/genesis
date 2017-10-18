import { User } from '../../shared/model/user';
import { userReducer } from './user/user.reducers';
import { loadingReducer } from './loading/loading.reducer';

export interface AppState {
    /** connected user */
    user: User;
    /** loading state */
    loading: boolean
}

export const APP_REDUCERS = {
    userReducer,
    loadingReducer
};

export const APP_EFFECTS = [

];

