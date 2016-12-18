import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subjectParams = new BehaviorSubject(this.testParams);
    params = this.subjectParams.asObservable();
    // ActivatedRoute.queryParams is Observable
    private subjectQueryParams = new BehaviorSubject(this.testQueryParams);
    queryParams = this.subjectQueryParams.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subjectParams.next(params);
    }

    // Test query parameters
    private _testQueryParams: {};
    get testQueryParams() { return this._testQueryParams; }
    set testQueryParams(queryParams: {}) {
        this._testQueryParams = queryParams;
        this.subjectQueryParams.next(queryParams);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams, queryParams: this.testQueryParams };
    }
}