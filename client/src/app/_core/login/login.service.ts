import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Handles the login component's behavior and make it available to control through app module which will import it.
 */
@Injectable()
export class LoginService {
    /** Display state  */
    private displayState = new BehaviorSubject<boolean>(false);

    /** Observable for login display state on which subscribers can listen */
    stateObservable = this.displayState.asObservable();

    /**
     * Tells the login state to be shown
     */
    show(){
        this.displayState.next(true);
    }

    /**
     * Tells the login state to be hidden
     */
    hide(){
        this.displayState.next(false);
    }

    /**
     * Tells the login state to be hidden or shown depending on his previous state
     */
    toggle(){
        const state = this.displayState.getValue();
        this.displayState.next(!state);
    }
}