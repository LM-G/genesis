import { Directive, DoCheck, forwardRef, HostBinding, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { toArray } from '@genesis/util/to-array';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ErrorOptions } from './errors';
import { ErrorsDirective } from './errors.directive';

@Directive({
    selector: '[appError]'
})
export class ErrorDirective implements OnInit, OnDestroy, DoCheck {
    @HostBinding('hidden')
    hidden: boolean = true;
    rules: string[] = [];
    errorNames: string[] = [];
    subscription: Subscription;
    _states: Subject<string[]>;
    states: Observable<string[]>;

    constructor(@Inject(forwardRef(() => ErrorsDirective)) private appErrors: ErrorsDirective) { }

    @Input()
    set appError(value: ErrorOptions) {
        this.errorNames = toArray(value);
    }

    @Input()
    set when(value: ErrorOptions) {
        this.rules = toArray(value);
    }

    ngOnInit() {

        this._states = new Subject<string[]>();
        this.states = this._states.asObservable().distinctUntilChanged();

        const errors = this.appErrors.errorDetails$
            .filter(Boolean)
            .filter(obj => !!~this.errorNames.indexOf(obj.errorName));

        const states = this.states
            .map(states => this.rules.every(rule => !!~states.indexOf(rule)));

        this.subscription = Observable.combineLatest(states, errors)
            .subscribe(([ states, errors ]) => {
                this.hidden = !(states && errors.control.hasError(errors.errorName));
            });

    }

    ngDoCheck() {
        this._states.next(this.rules.filter((rule) => (this.appErrors.control as any)[ rule ]));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
