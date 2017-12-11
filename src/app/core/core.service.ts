import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

/**
 * Main logic api
 */
@Injectable()
export class CoreService {
    /**
     * CoreService's constructor
     * @param userService user handling api
     */
    constructor() {}

    initialize() {
        const initSequence: Observable<any>[] = [];
        initSequence.push(Observable.timer(1));
        return Observable.forkJoin(initSequence).toPromise();
    }
}