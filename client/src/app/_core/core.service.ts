import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../_shared/models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Heart of GenesisCore App
 */
@Injectable()
export class GenesisCore {
    // current logged user
    public user$ = new BehaviorSubject<User>(null);

    /**
     * GenesisCore's constructor
     * @param userService to retrieve last stored user state
     */
    constructor(private userService : UserService) {}

    /**
     * Init GenesisCore app logic, get all vital data before launching other mechanics
     */
    init(){
        // sequence to complete before launching app
        const initSequence = [];
        // get the token stored in local storage
        const token = localStorage.getItem('access_token');
        const jwtHelper = new JwtHelper();

        //  if token is present in local storage then try to get user informations if token is valid
        if(_.isString(token) && !jwtHelper.isTokenExpired(token) ){
            // user stream
            let userOservable = this.userService.getUser();
            // user observable is added to init sequence
            initSequence.push(userOservable);

            userOservable.first().subscribe((user : User) => {
                this.setUser(user);
            });
        }

        // when all stuff is loaded, return a "merged" init sequence to resume app bootstrap
        return Observable.forkJoin(initSequence);
    }

    // getters and setters

    /**
     * Sets the user
     * @param user user to set
     */
    setUser(user : User){
        this.user$.next(user);
    }

    /**
     * Gets the user
     * @returns {User} current user
     */
    getUser(){
        return this.user$.getValue();
    }
}