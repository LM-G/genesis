import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../_shared/models/user.model';
import { Observable } from 'rxjs';

/**
 * Heart of GenesisCore App
 */
@Injectable()
export class GenesisCore {
    // current logged user
    private user : User;

    constructor(private userService : UserService) {}

    /**
     * Inits GenesisCore app logic, get all vital data
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

        return Observable.forkJoin(initSequence);
    }

    // getters and setters

    setUser(user : User){
        this.user = user;
    }

    getUser(){
        return this.user;
    }
}