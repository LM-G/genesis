import { User } from '../../../shared/model/user';
import { SetUserAction, USER_ACTION, UserAction } from '../action/user.actions';

export function USER_REDUCER (state: User , action: UserAction) {
    switch (action.type) {
        case USER_ACTION.CMD_SET_USER:
            return (action as SetUserAction).user;
        case USER_ACTION.CMD_RESET_USER:
            return null;
        default:
            return state;
    }
}
