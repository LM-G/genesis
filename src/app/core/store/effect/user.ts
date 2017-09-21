import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { AuthenticationService } from '../../component/authentication/authentication.service';

export class UserEffects {
    /*@Effet() connectUser = ... */
    constructor(
        private store: Store<AppState>,
        private authService: AuthenticationService
    ) {}
}