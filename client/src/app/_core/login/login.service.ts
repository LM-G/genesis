import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Handles the login component's whether it is shown or hidden.
 */
@Injectable()
export class LoginService {
    private loginStateSubject = new BehaviorSubject<boolean>(false);

    // observable for current login state on wich subcribers can listen
    stateObservable = this.loginStateSubject.asObservable();

    /**
     * Tells the login to be shown
     */
    show(){
        this.loginStateSubject.next(true);
    }

    /**
     * Tells the login to be hidden
     */
    hide(){
        this.loginStateSubject.next(false);
    }

    /**
     * Tells the login login to be hidden or shown depending on his previous state
     */
    toggle(){
        const state = this.loginStateSubject.getValue();
        this.loginStateSubject.next(!state);
    }
}