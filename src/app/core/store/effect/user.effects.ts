import { Store } from '@ngrx/store';
import { AppState } from '../store';

export class UserEffects {
    /*@Effet() connectUser = ... */
    constructor(
        private store: Store<AppState>
    ) {}
}
