import { Injectable } from '@angular/core';
import { UserService } from '@genesis/$core/api/user/user.service';
import { User } from '@genesis/$shared/model/user';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

/**
 * Core service, initialize app important stuff first before launching it
 */
@Injectable()
export class CoreService {
  constructor(private _userService: UserService) {}

  initialize(): Promise<any[]> {
    return forkJoin([
      this.retrieveUser()
    ]).toPromise();
  }

  private retrieveUser(): Observable<User> {
    return this._userService.me();
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
