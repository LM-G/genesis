import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
        initSequence.push(Observable.timer(1000));
        return Observable.forkJoin(initSequence).toPromise();
    }
}