import { Observable } from 'rxjs';
import { User } from '../app/_shared/models/user.model';

/**
 * Heart of Genesis App
 */
export class GenesisStub {
    // current logged user
    private user : User;

    constructor(){}

    /**
     * Inits Genesis app logic, get all vital data
     */
    init(){
        return Observable.empty();
    }

    // getters and setters

    setUser(user : User){
        this.user = user;
    }

    getUser(){
        return this.user;
    }
}