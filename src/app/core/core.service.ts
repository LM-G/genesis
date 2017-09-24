import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/toPromise';
/**
 * Main logic service
 */
@Injectable()
export class CoreService {
    /**
     * CoreService's constructor
     * @param userService user handling service
     */
    constructor() {}

    initialize () {
        const initSequence: Observable<any>[] = [];
        initSequence.push(Observable.timer(1));
        return Observable.forkJoin(initSequence).toPromise();
    }
}