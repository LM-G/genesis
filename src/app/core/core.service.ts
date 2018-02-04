import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

/**
 * Core service, initialize app important stuff first before launching it
 */
@Injectable()
export class CoreService {
  constructor() {
  }

  initialize(): Promise<any[]> {
    const initSequence: Observable<any>[] = [];
    initSequence.push(Observable.timer(1));
    return Observable.forkJoin(initSequence).toPromise();
  }
}

/**
 * Factory for initializing the coreService
 * @param {CoreService} coreService
 * @returns core service initialization promises
 */
export function coreInitializerFactory(coreService: CoreService) {
  return () => coreService.initialize();
}
